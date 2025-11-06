import { verifyToken } from '../utils/jwtHelper.js';
import User from '../models/User.js';

export const requireAuth = async (req, res, next) => {
  try {
    const header = req.headers.authorization || '';
    const token = header.startsWith('Bearer ') ? header.slice(7) : null;
    if (!token) return res.status(401).json({ message: 'No autenticado' });
    const payload = verifyToken(token);
    const user = await User.findById(payload.id).select('_id email rol nombre');
    if (!user) return res.status(401).json({ message: 'Token inválido' });
    req.user = user;
    next();
  } catch (e) {
    return res.status(401).json({ message: 'Token inválido', error: e.message });
  }
};

export const requireRole = (roles = []) => (req, res, next) => {
  if (!req.user) return res.status(401).json({ message: 'No autenticado' });
  if (!roles.includes(req.user.rol)) {
    return res.status(403).json({ message: 'No autorizado' });
  }
  next();
};
