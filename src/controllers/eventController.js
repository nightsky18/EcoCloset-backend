import Event from '../models/Event.js';

export const listEvents = async (req, res) => {
  try {
    const { desde, hasta, ciudad, categoria, estado, page = 1, limit = 20 } = req.query;
    const filter = {};
    if (ciudad) filter.ciudad = ciudad;
    if (categoria) filter.categorias = categoria;
    if (estado) filter.estado = estado;
    if (desde || hasta) {
      filter.fechaInicio = {};
      if (desde) filter.fechaInicio.$gte = new Date(desde);
      if (hasta) filter.fechaInicio.$lte = new Date(hasta);
    }
    const skip = (Number(page) - 1) * Number(limit);
    const [items, total] = await Promise.all([
      Event.find(filter).skip(skip).limit(Number(limit)).sort({ fechaInicio: 1 }),
      Event.countDocuments(filter)
    ]);
    return res.status(200).json({ items, total, page: Number(page), limit: Number(limit) });
  } catch (e) {
    return res.status(500).json({ message: 'Error al listar eventos', error: e.message });
  }
};
