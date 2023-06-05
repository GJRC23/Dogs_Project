![HenryLogo](https://d31uz8lwfmyn8g.cloudfront.net/Assets/logo-henry-white-lg.png)

# **DOGS** | Proyecto Individual

## Objetivos del Proyecto

Crear una aplicación web donde se puedan encontrar diferentes razas de perros utilizando un API externa (https://api.thedogapi.com/v1/breeds/). Y a partir de ella poder:

-  Buscar perros.
-  Visualizar la información de los perros.
-  Filtrarlos.
-  Ordenarlos.
-  Crear nuevos perros.


## Tecnologías utilizadas

- Java Script
- Express
- Node.js
- React
- Redux
- PostgreSQL
- CSS
## Requisitos para ejecutarla localmente

1. Instalar PostgreSQL
2. Crear una base de datos con el nombre "dogs"
3. Dentro de ./api cree un archivo .env con sus credenciales, como se muestra a continuación:

   ```env
       DB_USER=usuariodepostgres
       DB_PASSWORD=passwordDePostgres
       DB_HOST=localhost
   ```
Reemplazar  **`usuariodepostgres`** y **`passwordDePostgres`** con tus propias credenciales para conectarte a postegres.

## Instalación

Utilice el administrador de paquetes npm para instalar. (Recuerde usar este comando dentro de /client y de /api)

```bash
npm install
```
## Ejecutar local
- FrontEnd: Dentro /client

```bash
npm start
```

- BackEnd: Dentro /api

```bash
npm start
```
<img src="./dogs.jpg" alt="" width="1000px" />
