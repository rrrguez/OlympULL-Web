![Logo OlympULL Web](/frontend/public/olympull-web_logo.png)

# [🇪🇸] OlympULL Web: Herramienta para la integración de torneos en la enseñanza-aprendizaje del pensamiento computacional

## Introducción

### ¿Qué es OlympULL?
OlympULL Web es una aplicación web desarrollada para la gestión de la Olimpiada de Pensamiento Computacional, un evento organizado por la Universidad de La Laguna por el Día de los Estudios de Ingeniería Informática cuyo objetivo es fomentar el pensamiento computacional y las vocaciones científicas entre estudiantes de Educación Primaria y Secundaria.

La plataforma permite organizar y gestionar torneos por puntos, en los que los participantes resuelven diferentes ejercicios y obtienen puntuaciones según su desempeño, sin enfrentamientos directos entre equipos.

OlympULL Web nace como evolución de la herramienta original [OlympULL](https://github.com/Computational-Thinking/OlympULL/), adaptándola a una arquitectura web moderna y permitiendo además la integración con [CMS (Contest Management System)](https://cms-dev.github.io), un sistema automático para la evaluación de ejercicios.

### ¿Qué puedo hacer con OlympULL?
Los torneos de la Olimpiada de Pensamiento Computacional se organizan en **itinerarios**, que son conjuntos o circuitos de **ejercicios** que los **equipos** o **participantes** deben completar.

Los ejercicios pueden ser de dos tipos:
 - **Ejercicios desenchufados**. No requieren de un ordenador para ser resueltos y son evaluados manualmente, siguiendo una determinada **rúbrica**, por los monitores a través de la interfaz de OlympULL Web.
 - **Ejercicios enchufados**. Se resuelven mediante un ordenador y son puntuados automáticamente por CMS.

Con OlympULL Web, la gestión de estos elementos, así como las relaciones entre ellos, se convierte en una tarea sencilla y e intuitiva.

Además, en OlympULL Web se pueden consultar los rankings de cada itinerario en tiempo real.

---

### Tipos de usuarios

En OlympULL Web, se distinguen diferentes tipos de usuarios con diferentes responsabilidades.

#### Administradores
Son los usuarios con mayor nivel de permisos dentro de la aplicación y quienes más funcionalidades pueden realizar dentro de la aplicación. Estas funcionalidades se agrupan en:

* **Gestión de olimpiadas.** Funcionalidades relacionadas con la gestión de los elementos de las olimpiadas (p. ej., itinerarios o ejercicios), así como las relaciones entre ellos.
* **Gestión de usuarios.** Funcionalidades relacionadas con la gestión de los usuarios de la aplicación y sus relaciones con determinados elementos de las olimpiadas.
* **Otras gestiones.** En este grupo se encuentra la conexión con CMS, de forma que, una vez se haya definido debidamente una olimpiada, esta puede ser importada a la herramienta.

#### Organizadores
Son los usuarios encargados de uno o varios itinerarios. Solo tienen permiso para añadir ejercicios existentes a sus itinerarios.

#### Monitores
Son los usuarios encargados de uno o varios ejercicios. Solo tienen permiso para evaluar a los equipos que participen en sus ejercicios.

#### Participantes


---

# [🇬🇧] OlympULL Web: Tool for the Integration of Tournaments in the Teaching–Learning of Computational Thinking
