# Ecocloset Backend

API REST para la plataforma Ecocloset (directorio, eventos, foro y anuncios), construida con Node.js, Express y MongoDB.

## Características
- Autenticación JWT: registro, login y perfil autenticado con roles (USUARIO, ADMIN).
- Directorio: listado y detalle de tiendas/organizaciones con filtros y paginación. 
- Eventos: consulta paginada por fecha/ciudad/categoría/estado. 
- Foro: posts, búsqueda por texto/etiquetas, likes y comentarios.
- Anuncios: administración y listado público de banners activos por rango de fechas.
- Seguridad: rate limiting, Helmet, sanitización para Mongo y CORS configurable. 

## Stack técnico
- Node.js 18+, Express 5 y Mongoose 8.
- JWT + bcryptjs para autenticación. 
- Middlewares: Helmet, CORS, express-rate-limit, express-mongo-sanitize, morgan.
- Validación con express-validator.

## Estructura
- src/app.js: configuración de middlewares, healthcheck y registro de rutas. 
- src/server.js: arranque del servidor y manejo de conexión.
- src/config/db.js: conexión a MongoDB vía variables de entorno.
- src/controllers: lógica de negocio (auth, directory, events, forum, ads). 
- src/routes: endpoints por recurso y permisos. [attached_file:1]
- src/models: esquemas Mongoose (User, Store, Event, Post, Comment, Ad, Donation).
- src/middlewares: autenticación JWT y control de roles/validaciones. 

## Requisitos
- Node.js >= 18.18.0 y npm.
- MongoDB accesible y MONGODB_URI válido.
- Variables de entorno: MONGODB_URI, JWT_SECRET, CORS_ORIGIN, PORT.

## Instalación
1. Clonar el repo y entrar al directorio del backend
2. Ejecutar: npm install. 
3. Crear .env con MONGODB_URI, JWT_SECRET, CORS_ORIGIN y PORT (opcional).

## Ejecución
- Desarrollo: npm run dev (nodemon). 
- Producción: npm start.
- Healthcheck: GET /health → { status: 
- Root: GET / → { name: 'Ecocloset API', version: '1.0.0' }.

## Endpoints principales
Autenticación
- POST /api/auth/register: crear usuario.
- POST /api/auth/login: devuelve JWT y datos de usuario. 
- GET /api/auth/profile: requiere Bearer token.

Directorio
- GET /api/directory: filtros q, ciudad, categoria, tipo; page, limit.
- GET /api/directory/:id: detalle. 

Eventos
- GET /api/events: filtros desde, hasta, ciudad, categoria, estado; paginación.

Foro
- GET /api/forum/posts: lista/búsqueda/etiquetas, paginación.
- GET /api/forum/posts/:id: detalle y conteo de vistas. 
- POST /api/forum/posts: requiere auth. [attached_file:1]
- POST /api/forum/posts/:id/like: toggle de like, requiere auth.
- GET /api/forum/posts/:postId/comments: lista comentarios.
- POST /api/forum/posts/:postId/comments: crear comentario, requiere auth.

Administración (ADMIN)
- Directorio: POST/PUT/DELETE /api/admin/directory, PATCH /:id/feature.
- Eventos: POST/PUT/DELETE /api/admin/events, PATCH /:id/state. 
- Anuncios: POST/PUT/PATCH/DELETE /api/admin/ads.

Banners públicos
- GET /api/ads: anuncios activos por ventana de fechas.

## Modelos (resumen)
- User: nombre, email, passwordHash, rol, foto, biografia, intereses. 
- Store: tipo, nombre, categorias, ciudad, ubicación 2dsphere, destacado, propietario.
- Event: título, descripción, fechas, ciudad, categorías, estado, organizador. 
- Post: autor, título, contenido, likes, vistas, etiquetas, estado. 
- Comment: post, autor, contenido, parent opcional. 
- Ad: título, imagen, enlace, fechas, activo, creador.
- Donation: donaciones asociadas a Store.

## Seguridad
- Rate limiting dedicado para auth y general para otras rutas. 
- Helmet y sanitización anti inyección para Mongo. 
- Autorización por rol con requireAuth y requireRole(['ADMIN']).
- Índices Mongoose (texto y geoespacial).

## Integración con frontend
- Se encuentra en proceso de integración con frontend

## Variables .env (ejemplo)
PORT=3001
MONGODB_URI=mongodb://localhost:27017/ecocloset
JWT_SECRET=Admin123
CORS_ORIGIN=http://localhost:5173

## Scripts
- npm run dev: arranque con nodemon. [attached_file:1]
- npm start: ejecución estándar. [attached_file:1]

## Licencia
- ISC (package.json).
