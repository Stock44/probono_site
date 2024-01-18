# Probono

## Guía de desarrollo local

Hola, bienvenido a GeoStats! Gracias por haber elegido apoyar a la causa en el area de desarrollo web 😊.

Estamos conscientes que todos están llegando con un nivel diferente de comodidad al manejar un proyecto en github con un equipo de este tamaño o con esta organización, por lo tanto creamos esta guía para facilitar el proceso al iniciar para que puedan ponerse al corriente con el proyecto y empezar a desarrollar lo antes posible. La tratamos de crear lo más completa posible, por lo que pueden saltar a las subsecciones que necesiten.

Esta guía fue elaborada para trabajar con Visual Studio Code (VSCode) y de la manera en que la persona escribiendo esto está acostumbrada de hacerlo, están bienvenidos de agregar otra maneras de hacer las acciones o con otras herramientas 🙂.

**Si tienen dudas con cualquier cosa** pueden contactar al dueño del proyecto o cualquier desarrollador con experiencia en el equipo y con gusto les ayudarán, recuerden que estamos aqui para apoyarlos a crear el mejor trabajo posible.

### Setup técnico

#### Git y Github

Para trabajar en este proyecto es esencial que [descarguen git](https://git-scm.com/downloads) y tengan una [cuenta en Github](https://github.com/). Git es un sistema de control de versiones que permite guardar todos los cambios que se realicen en un proyecto y regresar a puntos anteriores en cualquier emergencia, es considerada la mejor herramienta para colaborar porque ayuda a mantener un control entre los diferentes programadores y el proyecto, sea revisar que pasen pruebas o que otro programador verifique los cambios. Github es más reconocido, pero es una plataforma web que maneja git y ayuda a centralizar el proyecto de manera más visual, para este proyecto también ayudará como herramienta para administración de tareas en el proyecto.

#### VSCode

En caso de no tener un IDE para trabajar, personalmente recomiendo [instalar VSCode](https://code.visualstudio.com/download), es un editor de texto bastante versátil para trabajar con diferentes lenguajes de programación y proyectos, también tiene extensiones que pueden simplificar ciertos pasos en tu proceso.

#### Extensiones recomendadas

En VSCode se pueden instalar estas extensiones que añaden funcionalidades a la aplicación en casos de ciertos lenguajes de programación o prácticas y se pueden encontrar y descargar en el icono de cuadros en el menú de la izquierda. Unas extensiones que recomiendo y apoyan mucho con el proyecto son:

- Github Pull Requests and Issues
- ES7+ React/Redux/React-Native snippets
- Prettier - Code formatter
- Prettier ESLint

#### Clonar repositorio

Para copiar el proyecto en tu computadora se llama clonar, un par de formas para hacerlo son:

Opción 1: Dentro de VSCode buscar en la barra de búsqueda `> Git: clone` y buscar el proyecto Stock44/probono_site (se necesita la extensión Github Pull Requests and Issues)

Opción 2: Entrar en tu terminal a la carpeta donde quieres guardar tu proyecto y escribir

```CLI
git clone https://github.com/Stock44/probono_site.git
```

#### Descargar librerías

El proyecto tiene unas librerías necesarias para funcionar que están en el archivo `package.json`, para descargarlas ve a la terminal y escribe:

```CLI
npm install
```

Esto puede resultar en cambios para `package-lock.json`

#### Archivo .env - IMPORTANTE !!!

**Para correr el código necesitar un archivo .env.development, de lo contrario no correrá.**

Este archivo contiene las llaves privadas para acceder a APIs o a la base de datos, por lo que **en ninguna circunstancia se puede agregar al repositorio** o podrían ser robadas, es por eso que se agrega a un archivo .env que no se puede subir, para obtenerlo se tiene que pedir al dueño del proyecto. A veces se borra el punto inicial (.env -> env) al ser enviado, por lo que se recomienda checar.

### Setup actividades

Las tareas o puntos para trabajar están en [Plataforma web GeoStats Probono](https://github.com/users/Stock44/projects/5), que se encuentra en la pestaña de proyectos en el repositorio en Github, ahí se pueden seleccionar tareas y asignartelas a tu usuario.

Al seleccionarlas puedes ver una descripción y convertirlas en issue, esto permite agregar comentarios, entre otras cosas, como crear un branch y ligarlo con la tarea, para trabajar con el branch te da instrucciones al crearlo.

### Desarrollo

#### Correr proyecto

Para este punto ya deberías estar listo para correr la página, para eso sería escribir en la terminal:

```CLI
npm run dev
```

En lo que imprime en consola debería aparecer una liga localhost, si la agregas al navegador debería abrir la página inicial.

#### Actualizar proyecto

Dado cambios constantes por otros colaboradores, recomendamos actualizar el proyecto mínimo una vez a la semana, para eso, mientras estamos en nuestro branch, vamos a la terminal y escribimos:

```CLI
git pull origin dev
```

Si tu branch está creada sobre la branch dev (default), esto debería actualizar tu branch automáticamente, de lo contrario puedes también escribir:

```CLI
git rebase dev
```

#### Buscar errores

Para estandarizar el estilo del código y evitar errores, un pull request no te va a dejar subirlo sin cumplir ciertas restricciones, por lo tanto se recomienda antes de hacer un pull request correr en la terminal:

```CLI
npx xo
```

Esto no debería resultar en nada, de lo contrario corregir lo que te diga.

Para correr los tests,

```CLI
npm run test
```

Esto debería resultar en todos lo tests pasados.

### Enviar cambios

Ya completado el trabajo se tiene que [enviar los cambios y crear un pull request](https://youtu.be/eLmpKKaQL54?t=163) para ser verificado, si todo está correcto, será agregado a la rama de dev.
