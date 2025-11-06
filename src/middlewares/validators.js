// src/middlewares/validators.js
import { body, validationResult } from 'express-validator';

export const validateRegister = [
  body('nombre').trim().notEmpty().withMessage('Nombre requerido'),
  body('email').isEmail().normalizeEmail().withMessage('Email inválido'),
  body('password').isLength({ min: 6 }).withMessage('Contraseña mínimo 6 caracteres'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

export const validateLogin = [
  body('email').isEmail().normalizeEmail(),
  body('password').notEmpty(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];
