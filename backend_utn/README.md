# API Backend UTN

## Descripción general
Este proyecto corresponde al desarrollo de un **backend REST** realizado en **Node.js con TypeScript**, como parte de un trabajo práctico académico. La aplicación expone una API para la gestión de usuarios y productos, aplicando buenas prácticas de arquitectura, seguridad y validación de datos.

El backend fue pensado para ser consumido por un frontend externo y ejecutarse tanto en entorno local como en producción.

---

## Tecnologías utilizadas
- Node.js
- Express
- TypeScript
- MongoDB (Mongoose)
- JWT para autenticación
- Zod para validaciones
- Multer para carga de archivos
- Nodemailer para envío de correos
- Morgan como logger
- Express Rate Limit
- Dotenv

---

## Estructura del proyecto
La aplicación sigue una arquitectura **MVC**, separando responsabilidades:

- `controllers/`: manejo de requests y responses
- `routes/`: definición de endpoints
- `services/`: lógica de negocio
- `model/`: esquemas y modelos de base de datos
- `middleware/`: middlewares de autenticación, carga de archivos, rate limit
- `validators/`: validación de datos de entrada
- `config/`: configuraciones generales

---

## Instalación

1. Clonar el repositorio:
```bash
git clone https://github.com/nicole797/tp-backend-utn.git
```

2. Acceder al directorio del backend:
```bash
cd tp-backend-utn/backend_utn
```

3. Instalar dependencias:
```bash
npm install
```

4. Configurar variables de entorno:
Crear un archivo `.env` a partir de `.env.example` y completar los valores necesarios.

---

## Ejecución local

### Modo desarrollo
Ejecuta el servidor utilizando TypeScript y recarga automática:
```bash
npm run dev
```

### Compilación
Genera los archivos JavaScript para producción:
```bash
npm run build
```

### Modo producción
Ejecuta la aplicación compilada:
```bash
npm start
```

Por defecto, el servidor se inicia en:
```
http://localhost:3000
```

---

## Autenticación
La API implementa autenticación mediante **JSON Web Tokens (JWT)**.

Las rutas que modifican datos requieren un token válido enviado en el header:
```
Authorization: Bearer <token>
```

---

## Endpoints principales

### Autenticación
- POST `/auth/register`
- POST `/auth/login`

### Productos
- GET `/products`
- GET `/products/:id`
- POST `/products` *(requiere autenticación y permite imagen)*
- PATCH `/products/:id` *(requiere autenticación)*
- DELETE `/products/:id` *(requiere autenticación)*

---

## Filtros disponibles
El listado de productos admite filtros mediante query params, como por ejemplo:
- nombre
- categoría
- stock
- rango de precios

---

## Carga de archivos
La creación de productos permite subir imágenes utilizando **Multer**. Los archivos se almacenan en el servidor y se exponen como recursos estáticos.

---

## Envío de correos
Al registrarse un usuario, el sistema envía automáticamente un correo de bienvenida utilizando **Nodemailer**.

---

## Deploy
El backend se encuentra desplegado en **Render** y puede ser consumido mediante su URL pública.

---

## Evidencias y entrega
Para la entrega del trabajo práctico se incluyen capturas de pruebas realizadas con Postman/Bruno y un video demostrativo del funcionamiento general del sistema.

---

## Autora
Trabajo práctico realizado para la UTN.

