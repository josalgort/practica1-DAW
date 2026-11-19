
# Práctica 1 – Despliegue de Aplicaciones Web

## 1. Objetivo

Desarrollar y desplegar una API REST para gestionar eventos, recintos y entradas, utilizando Node.js, Express, Mongoose y MongoDB Atlas.

## 2. Tecnologías utilizadas

- Debian 12
- Node.js 24.22.2
- npm 11.19.1
- Express
- Mongoose
- MongoDB Atlas
- Nodemon
- Visual Studio Code
- Git y GitHub
- Render (despliegue)

## 3. Preparación del entorno

Se comprueba la instalación de las herramientas necesarias:

| Herramienta | Versión |
|---|---|
| Node.js | 24.22.2 |
| npm | 11.19.1 |
| Git | 2.39.5 |
| Visual Studio Code | 1.145.0 |

## 4. Estructura del proyecto

```text
Practica 1/
├── models/
│   ├── evento.js
│   └── recinto.js
├── routes/
│   ├── eventos.js
│   └── recintos.js
├── index.js
├── .env
├── .gitignore
├── package.json
└── package-lock.json
```

## 5. Dependencias

Se inicializa el proyecto Node.js y se instalan las dependencias:

- express: gestión del servidor y rutas REST.
- mongoose: conexión y gestión de modelos MongoDB.
- dotenv: lectura de variables de entorno.
- nodemon: reinicio automático del servidor durante el desarrollo.

## 6. Base de datos MongoDB Atlas

Se crea un clúster gratuito en MongoDB Atlas.

- Clúster: Cluster0
- Región: AWS, París (eu-west-3).
- Base de datos: eventos.

La conexión se configura mediante la variable MONGODB_URI en el fichero .env.

Las credenciales no se incluyen en el repositorio.

## 7. Implementación

Se crean los siguientes componentes:

- Modelo de eventos y subdocumentos de entradas.
- Modelo de recintos.
- Enrutador de eventos y entradas.
- Enrutador de recintos.
- Servidor principal Express.

## 8. Configuración del servidor

El servidor utiliza el puerto 3000 durante el desarrollo.

Se configura la conexión con MongoDB Atlas y el middleware para procesar peticiones JSON.

## 9. Comprobación inicial

Se ejecuta el servidor mediante:

```bash
npm run dev
```

Resultado obtenido:

- Conexión con MongoDB establecida correctamente.
- Servidor escuchando en el puerto 3000.

## 10. Pruebas y despliegue

Pendiente:

- Pruebas de los 13 endpoints.
- Verificación de respuestas HTTP y JSON.
- Publicación del repositorio en GitHub.
- Despliegue de la API en Render.
- Comprobación de los endpoints en remoto.

