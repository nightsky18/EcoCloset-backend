import bcrypt from 'bcryptjs';
import User from '../models/User.js';
import { signToken } from '../utils/jwtHelper.js';
import { isEmail, required } from '../utils/validators.js';

export const register = async (req, res) => {
  try {
    const { nombre, email, password } = req.body;
    if (!required(nombre) || !isEmail(email) || !required(password)) {
      return res.status(400).json({ message: 'Datos inválidos' });
    }
    const exists = await User.findOne({ email });
    if (exists) return res.status(409).json({ message: 'Email ya registrado' });
    const passwordHash = await bcrypt.hash(password, 10);
    const user = await User.create({ nombre, email, passwordHash });
    const token = signToken({ id: user._id, rol: user.rol });
    return res.status(201).json({
      user: { id: user._id, nombre: user.nombre, email: user.email, rol: user.rol },
      token
    });
  } catch (e) {
    return res.status(500).json({ message: 'Error al registrar', error: e.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!isEmail(email) || !required(password)) {
      return res.status(400).json({ message: 'Credenciales inválidas' });
    }
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: 'Credenciales incorrectas' });
    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok) return res.status(401).json({ message: 'Credenciales incorrectas' });
    const token = signToken({ id: user._id, rol: user.rol });
    return res.status(200).json({
      user: { id: user._id, nombre: user.nombre, email: user.email, rol: user.rol },
      token
    });
  } catch (e) {
    return res.status(500).json({ message: 'Error de autenticación', error: e.message });
  }
};

export const profile = async (req, res) => {
  return res.status(200).json({ user: req.user });
};
