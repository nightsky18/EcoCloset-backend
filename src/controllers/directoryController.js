import Store from '../models/Store.js';

export const listDirectory = async (req, res) => {
  try {
    const { q, ciudad, categoria, tipo, page = 1, limit = 12 } = req.query;
    const filter = {};
    if (tipo) filter.tipo = tipo;
    if (ciudad) filter.ciudad = ciudad;
    if (categoria) filter.categorias = categoria;
    if (q) filter.$text = { $search: q };
    const skip = (Number(page) - 1) * Number(limit);
    const [items, total] = await Promise.all([
      Store.find(filter).skip(skip).limit(Number(limit)).sort({ destacado: -1, createdAt: -1 }),
      Store.countDocuments(filter)
    ]);
    return res.status(200).json({ items, total, page: Number(page), limit: Number(limit) });
  } catch (e) {
    return res.status(500).json({ message: 'Error al listar directorio', error: e.message });
  }
};

export const getStore = async (req, res) => {
  try {
    const item = await Store.findById(req.params.id);
    if (!item) return res.status(404).json({ message: 'No encontrado' });
    return res.status(200).json(item);
  } catch (e) {
    return res.status(500).json({ message: 'Error al obtener', error: e.message });
  }
};
