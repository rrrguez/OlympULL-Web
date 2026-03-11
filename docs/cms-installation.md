# Guía de instalación y configuración de CMS
Para poder evaluar los ejercicios enchufados, es necesario configurar correctamente una instancia de CMS.

A continuación, se detallan los pasos para instalar esta herramienta:

1. Instala las dependencias base de CMS
```bash
sudo apt update
sudo apt install build-essential openjdk-11-jdk-headless fp-compiler \
    postgresql postgresql-client \
    python3.12 python3.12-dev python3-pip python3-venv \
    libpq-dev libcups2-dev libyaml-dev libffi-dev \
    shared-mime-info cppreference-doc-en-html zip curl
```
2. Instala Isolate
```bash
echo 'deb [arch=amd64 signed-by=/etc/apt/keyrings/isolate.asc] http://www.ucw.cz/isolate/debian/ noble-isolate main' | sudo tee /etc/apt/sources.list.d/isolate.list
curl https://www.ucw.cz/isolate/debian/signing-key.asc | sudo tee /etc/apt/keyrings/isolate.asc
apt update && apt install isolate
```
> [!INFO]
> Isolate es una herramienta de aislamiento de procesos (*sandbox*) cuyo objetivo es ejecutar programas no confiables de forma segura y controlada, limitando los recursos que pueden usar y evitando que afecten al sistema anfitrión.
>
> CMS utiliza Isolate para ejecutar las soluciones enviadas por los participantes dentro de entornos seguros y aislados, durante la fase de compilación y evaluación de los problemas.

> [!NOTE]
> A continuación de este paso, la guía oficial recomienda crear un usuario específico en la máquina para CMS. Sin embargo, en mi caso no lo he considerado necesario, dado que el propósito de la máquina virtual donde he instalado CMS es exclusivamente el uso de CMS. Para consultar la configuración recomendada, véase la sección [*Preparation steps*](https://cms.readthedocs.io/en/latest/Installation.html#preparation-steps) de la guía de CMS.
>
> Los siguientes pasos deberían realizarse como `cmsuser` en caso de haberlo creado.

3. Crea un usuario y la base de datos PostgreSQL
```bash
sudo -u postgres createuser cmsuser
sudo -u postgres createdb cmsdb -O cmsuser
sudo -u postgres psql
```

Dentro de PostgreSQL:

```sql
ALTER USER cmsuser WITH PASSWORD 'cmspassword';
\q
```

4. Instala CMS y sus dependencias
```bash
# 1. Crea un entorno virtual
python3 -m venv ~/cms-venv
source ~/cms-venv/bin/activate

# 2. Clona el repositorio de GitHub
git clone https://github.com/cms-dev/cms.git
cd cms

# 3. Instala las dependencias
pip install --upgrade pip
pip install -r requirements.txt
```

Este entorno virtual creado es donde CMS va a almacenar sus datos, logs y cachés.

> [!TIP]
> En mi caso, he añadido un alias en `.bashrc` para poder activar el entorno virtual más rápidamente:
> ```bash
> echo 'alias cmsenv="source ~/cms-venv/bin/activate"' >> ~/.bashrc
> cmsenv
> ```

5. Copia la instalación base al entorno virtual
```bash
cp ./config/cms.sample.toml ~/cms-venv/etc/cms.toml
cp ./config/cms_ranking.sample.toml ~/cms-venv/etc/cms_ranking.toml
```

6. Edita el archivo de configuración base para que el usuario, contraseña y el nombre de la base de datos coincidan con los establecidos en el paso 3
```bash
vi ~/cms-venv/etc/cms.toml

# Dentro del editor VIM
[database]
url = "postgresql+psycopg2://cmsuser:cmspasswd@localhost:5432/cmsdb"
```

7. Inicializa la base de datos de CMS
```bash
cmsInitDB
```

> [!NOTE]
> De acuerdo con la guía oficial, a medida que CMS se desarrolla, el *schema* de la base de datos puede sufrir variaciones, y una nueva versión de CMS puede introducir cambios en su estructura que son incompatibles con la versión anterior. Por ello, antes de actualizar CMS es recomendable verter los datos de la base de datos en el sistema de archivos, ejecutando:
> ```bash
> cmsDumpExporter
> ```
>
> Posteriormente, tras actualizar CMS se puede resetear el *schema* de la base de datos se la siguiente manera:
> ```bash
> cmsDropDB
> cmsInitDB
>
> # Para cargar los datos previos en la nueva base de datos:
> cmsDumpImporter
> ```

8. Ejecuta CMS
```bash
# Mostrar los logs de los demás servicios:
cmsLogService 0

# Ejecutar todos los servicios de CMS rápidamente:
cmsResourceService -a
```

9. Crea una cuenta de administrador para poder acceder a la interfaz de administrador de CMS
```bash
cmsAddAdmin admin
[...] Login with username admin and password [contraseña]
```
> [!NOTE]
> Con OlympULL Web, no es necesario acceder como administrador a CMS, pero es recomendable realizar este paso por si pudiera ser necesario en algún caso.
