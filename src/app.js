// src/app.js
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import 'dotenv/config';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
// IMPORTANTE: no usar mongoSanitize global
// import mongoSanitize from 'express-mongo-sanitize';
import {
  sanitize
} from 'express-mongo-sanitize';

// Routers...
import authRoutes from './routes/authRoutes.js';
import directoryRoutes from './routes/directoryRoutes.js';
import eventRoutes from './routes/eventRoutes.js';
import adminDirectoryRoutes from './routes/adminDirectoryRoutes.js';
import adminEventRoutes from './routes/adminEventRoutes.js';
import forumRoutes from './routes/forumRoutes.js';
import adRoutes from './routes/adRoutes.js';
import adAdminRoutes from './routes/adAdminRoutes.js';

const app = express();

// CORS y seguridad
app.use(cors({
  origin: process.env.CORS_ORIGIN,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(helmet());

// Logs
app.use(morgan('dev'));

// Parsers
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

// Sanitización manual: solo body y params; NO tocar req.query
app.use((req, res, next) => {
  try {
    if (req.body) sanitize(req.body);
    if (req.params) sanitize(req.params);
    next();
  } catch (e) {
    // Si algo sale mal aquí, responder 400 claro
    return res.status(400).json({
      message: 'Entrada inválida',
      error: e.message
    });
  }
});

// Health y raíz
app.get('/health', (req, res) =>
  res.status(200).json({
    status: 'UP',
    message: 'El servidor está funcionando correctamente'
  })
);
app.get('/', (req, res) => res.status(200).json({
  name: 'Ecocloset API',
  version: '1.0.0'
}));

// Rate limiters (desarrollo)
const authLimiterLogin = rateLimit({
  windowMs: 2 * 60 * 1000, // 2 minutos
  max: 30, // 30 intentos
  standardHeaders: true,
  legacyHeaders: false,
  message: 'Demasiados intentos, inténtalo más tarde'
});
const generalLimiter = rateLimit({
  windowMs: 2 * 60 * 1000,
  max: 300
});

// Aplica solo a login; deja register libre durante integración
app.use('/api/auth/login', authLimiterLogin);
app.use('/api', generalLimiter);

// Routers
app.use('/api/auth', authRoutes);
app.use('/api/directory', directoryRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/admin/directory', adminDirectoryRoutes);
app.use('/api/admin/events', adminEventRoutes);
app.use('/api/forum', forumRoutes);
app.use('/api/ads', adRoutes);
app.use('/api/admin/ads', adAdminRoutes);

// 404
app.use((req, res) => res.status(404).json({
  message: 'Ruta no encontrada'
}));

// JSON inválido
app.use((err, req, res, next) => {
  if (err?.type === 'entity.parse.failed') {
    return res.status(400).json({
      message: 'JSON inválido en el cuerpo de la petición'
    });
  }
  return next(err);
});

// Error global
app.use((err, req, res, next) => {
  console.error(err?.stack || err);
  res.status(500).json({
    message: 'Ha ocurrido un error en el servidor',
    error: err.message
  });
});

export default app;