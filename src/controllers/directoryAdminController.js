import Store from '../models/Store.js';

export const createStore = async (req, res) => {
  try {
    const payload = req.body;
    const item = await Store.create(payload);
    return res.status(201).json(item);
  } catch (e) {
    return res.status(400).json({ message: 'Error al crear tienda/organización', error: e.message });
  }
};

export const updateStore = async (req, res) => {
  try {
    const item = await Store.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!item) return res.status(404).json({ message: 'No encontrado' });
    return res.status(200).json(item);
  } catch (e) {
    return res.status(400).json({ message: 'Error al actualizar', error: e.message });
  }
};

export const deleteStore = async (req, res) => {
  try {
    const del = await Store.findByIdAndDelete(req.params.id);
    if (!del) return res.status(404).json({ message: 'No encontrado' });
    return res.status(204).send();
  } catch (e) {
    return res.status(400).json({ message: 'Error al eliminar', error: e.message });
  }
};

export const toggleFeatured = async (req, res) => {
  try {
    const { destacado } = req.body; // boolean
    const item = await Store.findByIdAndUpdate(req.params.id, { destacado: !!destacado }, { new: true });
    if (!item) return res.status(404).json({ message: 'No encontrado' });
    return res.status(200).json(item);
  } catch (e) {
    return res.status(400).json({ message: 'Error al cambiar destacado', error: e.message });
  }
};
