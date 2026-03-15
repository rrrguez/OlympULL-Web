![Logo OlympULL Web](/frontend/public/olympull-web_logo_purple.png)

# OlympULL Web: Herramienta para la integración de torneos en la enseñanza-aprendizaje del pensamiento computacional
![Node](https://img.shields.io/badge/node-20-green)
![React](https://img.shields.io/badge/react-19-blue)
![PostgreSQL](https://img.shields.io/badge/postgresql-16-blue)
![Docker](https://img.shields.io/badge/docker-28-blue)

OlympULL Web es una plataforma web para la gestión de torneos educativos de pensamiento computacional.

Permite organizar olimpiadas, gestionar participantes, evaluar ejercicios (tanto manualmente como de forma automática mediante CMS), y visualizar rankings en tiempo real.

Esta aplicación ha sido desarrollada para la Olimpiada de Pensamiento Computacional de la Universidad de La Laguna como Trabajo Fin de Máster.

---

## Introducción

### ¿Qué es OlympULL Web?
**OlympULL Web** es una aplicación web desarrollada para la gestión de la **Olimpiada de Pensamiento Computacional**, un evento organizado por la Universidad de La Laguna cuyo objetivo es fomentar el pensamiento computacional y las vocaciones científicas entre estudiantes de Educación Primaria y Secundaria.

Aunque fue creada específicamente para la Olimpiada de Pensamiento Computacional, la plataforma puede utilizarse para gestionar **torneos por puntos** de forma general.

OlympULL Web nace como evolución de la herramienta [**OlympULL**](https://github.com/Computational-Thinking/OlympULL/), una aplicación Java desarrollada como Trabajo Fin de Grado, adaptándola a una arquitectura web moderna y permitiendo además la integración con [**CMS (Contest Management System)**](https://cms-dev.github.io), un sistema para la evaluación automática de ejercicios.

### ¿Qué puedo hacer con OlympULL Web?
#### Estructura de la Olimpiada de Pensamiento Computacional
Los torneos de la Olimpiada de Pensamiento Computacional se componen de los siguientes elementos:

* **Itinerarios.** Son los **conjuntos o circuitos de ejercicios** que los equipos o participantes deben resolver.
* **Ejercicios.** Son los **puzles o pruebas** que los participantes deben resolver o superar para obtener **puntos**. Cada ejercicio pertenece a una **categoría** del pensamiento computacional (abstracción, bucles, composición, secuencias, ...).

  Se distinguen dos tipos de ejercicios:
  * **Ejercicios desenchufados.** Son aquellos que **no** requieren de un ordenador para ser resueltos, y que por lo tanto son evaluados **de forma manual** por el monitor correspondiente a través de la interfaz de OlympULL Web.
  * **Ejercicios enchufados.** Son aquellos que **sí** requieren de un ordenador. Normalmente, estos ejercicios son problemas a resolver mediante un script o programa escrito en un lenguaje de alto nivel, como Python o C++. En OlympULL Web, estos ejercicios son evaluados **automáticamente** por CMS, y los participantes deben entregar su solución mediante la interfaz de usuario de esta herramienta.

* **Rúbricas.** Son **guías** con criterios y niveles de desempeño que se utilizan para **evaluar** los ejercicios desenchufados.
* **Escuelas.** Como la Olimpiada de Pensamiento Computacional es un torneo educativo, se contemplan las escuelas de las que provienen los participantes.
* **Equipos.** Son los grupos reducidos de estudiantes que participan en los ejercicios **desenchufados**. Normalmente, se trata de grupos de estudiantes de Primaria.
* **Participantes.** Son los estudiantes individuales que resuelven los ejercicios **enchufados**. Normalmente, estos son estudiantes de Secundaria.
* **Organizadores.** Son las personas a cargo de un determinado **itinerario**.
* **Monitores.** Son las personas encargadas de un determinado **ejercicio desenchufado**, que explican el ejercicio a los equipos y les asisten en su resolución.

#### El papel de OlympULL Web en la Olimpiada de Pensamiento Computacional
La gestión de la Olimpiada, al ser una competición tan compleja a nivel estructural, puede resultar bastante dificultosa, ya que además es necesario el recuento de puntos al finalizar el torneo para determinar quiénes son los ganadores de cada itinerario y en cada categoría de ejercicio.

Es por ello que resalta la gran aportación de OlympULL Web como software de gestión, puesto que facilita la creación, modificación y eliminación de todos los elementos expuestos anteriormente, así como las relaciones entre ellos, y también la visualización del ranking en tiempo real donde se muestran los puntos obtenidos por cada equipo o participante en un determinado itinerario, todo ello a través de una interfaz amigable y fácil de utilizar.

### Tipos de usuarios

En OlympULL Web, se distinguen diferentes tipos de usuarios con distintas responsabilidades:

* **Administradores.** Son los usuarios con mayor nivel de permisos dentro de la aplicación y quienes más funcionalidades pueden realizar dentro de ella. Estas funcionalidades se agrupan en:
    * **Gestión de olimpiadas.** Funcionalidades relacionadas con la gestión de los elementos de las olimpiadas (p. ej., itinerarios o ejercicios), así como las relaciones entre ellos.
    * **Gestión de usuarios.** Funcionalidades relacionadas con la gestión de los usuarios de la aplicación y sus relaciones con determinados elementos de las olimpiadas (p. ej., asignaciones de ejercicios a monitores).
    * **Otras gestiones.** En este grupo se encuentra la conexión con CMS, de forma que, una vez se haya definido una olimpiada, esta puede ser importada a la herramienta para la posterior evaluación automática de los ejercicios enchufados durante el torneo.
* **Organizadores.** Son los usuarios encargados de uno o varios itinerarios. Solo tienen permiso para **añadir ejercicios** ya existentes a sus itinerarios.
* **Monitores.** Son los usuarios encargados de uno o varios ejercicios. Solo tienen permiso para **evaluar a los equipos** que participen en sus ejercicios.
* **Participantes.** Son los usuarios que resuelven en los **ejercicios enchufados**. Estos usuarios son los únicos que **no interactúan** directamente con OlympULL Web, puesto que se conectan a CMS para subir sus soluciones a los ejercicios desde allí para su evaluación automática.
* **Público general.** Cualquier persona, aun sin tener una cuenta en OlympULL Web, puede consultar los rankings de las olimpiadas y ver cómo va evolucionando la clasificación de los equipos y participantes **en tiempo real**.

## Estructura del repositorio
El presente repositorio se organiza, a grandes rasgos, de la siguiente manera:
```
OlympULL-Web
│
├── frontend/        # Aplicación React
├── backend/         # API Node.js
├── database/        # Script de la base de datos
├── nginx/           # Archivo de configuración de Nginx para despliegue en producción
└── README.md
```

## Arquitectura de OlympULL Web
OlympULL Web se compone de tres componentes principales:

```
Usuario
   │
   v
Frontend (React)
   │
   v
Backend (Node.js / API REST)
   │
   ├── Base de datos PostgreSQL
   │
   └── CMS (Contest Management System)
           │
           └── Evaluación automática de ejercicios
```

## Tecnologías utilizadas
Para desarrollar OlympULL Web, he utilizado las siguientes tecnologías:
* Docker (v28.2)
* Docker Compose (v1.29 o superior)
* Nginx (v1.29)
* NPM (v10.8)
* PostgreSQL (v16.11)
* Node.js (v20.20)
* React.js (v19.1)
* Una instancia funcional de [CMS](https://github.com/cms-dev/cms)

---

## Guía de inicio rápido
A continuación, se detallan los pasos necesarios para instalar y ejecutar la aplicación.

### **Instalación**
1. Clona el repositorio
```bash
git clone https://github.com/rrrguez/OlympULL-Web.git
cd OlympULL-Web
```
2. Instala las dependencias del proyecto
```bash
npm install
```

### **Configuración de OlympULL Web**
OlympULL Web se configura mediante variables de entorno, por lo que se recomienda crear un fichero `.env` en la raíz del proyecto como el que se ilustra a continuación:
```env
# Backend
DB_HOST=localhost
DB_PORT=5432
DB_USER=admin
DB_PASSWORD=admin
DB_NAME=olympull

JWT_SECRET=your-secret-key
JWT_EXPIRES_IN=1d

# Frontend
VITE_BACKEND_URL=http://localhost:3000
```

### **Configuración de CMS**
Consulta la guía completa: [**Configuración e instalación de CMS**](/docs/cms-installation.md)

### **Primeros pasos**
Una vez instalada y configurada la aplicación, se puede arrancar el servidor en modo desarrollo con el comando:

```bash
docker compose up --build
```

Una vez desplegada la aplicación, se puede acceder a ella desde el navegador e iniciar sesión con las credenciales creadas por defecto durante la inicialización de la base de datos:

> **Usuario:** `ADMIN1`
>
> **Contraseña:** `ADMIN`

**¡Ya puedes comenzar a usar OlympULL Web!**

## Capturas de pantalla

### Panel de administración
![Panel de administración de OlympULL Web](/img/panel-admin.png)

### Ranking
![Ranking](/img/ranking.png)

## Licencia
Este proyecto está licenciado bajo la [Licencia Creative Commons Atribución-NoComercial-SinDerivadas 4.0 Internacional](LICENSE.md).
