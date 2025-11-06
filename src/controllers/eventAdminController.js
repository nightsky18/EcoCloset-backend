import Event from '../models/Event.js';

export const createEvent = async (req, res) => {
  try {
    const item = await Event.create(req.body);
    return res.status(201).json(item);
  } catch (e) {
    return res.status(400).json({ message: 'Error al crear evento', error: e.message });
  }
};

export const updateEvent = async (req, res) => {
  try {
    const item = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!item) return res.status(404).json({ message: 'No encontrado' });
    return res.status(200).json(item);
  } catch (e) {
    return res.status(400).json({ message: 'Error al actualizar evento', error: e.message });
  }
};

export const deleteEvent = async (req, res) => {
  try {
    const del = await Event.findByIdAndDelete(req.params.id);
    if (!del) return res.status(404).json({ message: 'No encontrado' });
    return res.status(204).send();
  } catch (e) {
    return res.status(400).json({ message: 'Error al eliminar evento', error: e.message });
  }
};

export const changeEventState = async (req, res) => {
  try {
    const { estado } = req.body; // PROGRAMADO|CANCELADO|FINALIZADO
    const item = await Event.findByIdAndUpdate(req.params.id, { estado }, { new: true });
    if (!item) return res.status(404).json({ message: 'No encontrado' });
    return res.status(200).json(item);
  } catch (e) {
    return res.status(400).json({ message: 'Error al cambiar estado', error: e.message });
  }
};
