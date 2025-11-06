// Configuración de middleware y rutas

import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import 'dotenv/config';
import authRoutes from './routes/authRoutes.js';
import directoryRoutes from './routes/directoryRoutes.js';
import eventRoutes from './routes/eventRoutes.js';
import adminDirectoryRoutes from './routes/adminDirectoryRoutes.js';
import adminEventRoutes from './routes/adminEventRoutes.js';
import forumRoutes from './routes/forumRoutes.js';
import adRoutes from './routes/adRoutes.js';
import adAdminRoutes from './routes/adAdminRoutes.js';

// Inicialización
const app = express();

// Middlewares básicos
app.use(cors({
  origin: process.env.CORS_ORIGIN,
  credentials: true,
}));
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware de logging ANTES de las rutas (para debuggear)
app.use((req, res, next) => {
  console.log('Hit:', req.method, req.originalUrl);
  next();
});

// Rutas de Health Check
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'UP', message: 'El servidor está funcionando correctamente' });
});

app.get('/', (req, res) => {
  res.status(200).json({ name: 'Ecocloset API', version: '1.0.0' });
});

// Rutas de la API
app.use('/api/auth', authRoutes);
app.use('/api/directory', directoryRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/admin/directory', adminDirectoryRoutes);
app.use('/api/admin/events', adminEventRoutes);
app.use('/api/forum', forumRoutes);
app.use('/api/ads', adRoutes);
app.use('/api/admin/ads', adAdminRoutes);

console.log('Rutas de la API cargadas.');

// Middleware para manejo de errores de parseo JSON
app.use((err, req, res, next) => {
  if (err?.type === 'entity.parse.failed') {
    return res.status(400).json({ message: 'JSON inválido en el cuerpo de la petición' });
  }
  next(err);
});

// Middleware para rutas no encontradas (404) - DEBE IR DESPUÉS de todas las rutas
app.use((req, res, next) => {
  res.status(404).json({ message: 'Ruta no encontrada' });
});

// Middleware para manejo de errores global - SIEMPRE AL FINAL
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Ha ocurrido un error en el servidor', error: err.message });
});

export default app;
