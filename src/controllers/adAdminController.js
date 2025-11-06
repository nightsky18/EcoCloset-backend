
import Ad from '../models/Ad.js';

export const createAd = async (req, res) => {
  try {
    const item = await Ad.create(req.body);
    return res.status(201).json(item);
  } catch (e) {
    return res.status(400).json({ message: 'Error al crear banner', error: e.message });
  }
};

export const updateAd = async (req, res) => {
  try {
    const item = await Ad.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!item) return res.status(404).json({ message: 'No encontrado' });
    return res.status(200).json(item);
  } catch (e) {
    return res.status(400).json({ message: 'Error al actualizar banner', error: e.message });
  }
};

export const toggleAd = async (req, res) => {
  try {
    const { activo } = req.body;
    const item = await Ad.findByIdAndUpdate(req.params.id, { activo: !!activo }, { new: true });
    if (!item) return res.status(404).json({ message: 'No encontrado' });
    return res.status(200).json(item);
  } catch (e) {
    return res.status(400).json({ message: 'Error al activar/desactivar', error: e.message });
  }
};

export const deleteAd = async (req, res) => {
  try {
    const del = await Ad.findByIdAndDelete(req.params.id);
    if (!del) return res.status(404).json({ message: 'No encontrado' });
    return res.status(204).send();
  } catch (e) {
    return res.status(400).json({ message: 'Error al eliminar banner', error: e.message });
  }
};
