
import Ad from '../models/Ad.js';

export const listActiveAds = async (req, res) => {
  try {
    const now = new Date();
    const items = await Ad.find({ activo: true, fechaInicio: { $lte: now }, fechaFin: { $gte: now } })
      .sort({ createdAt: -1 });
    return res.status(200).json(items);
  } catch (e) {
    return res.status(500).json({ message: 'Error al listar banners', error: e.message });
  }
};
