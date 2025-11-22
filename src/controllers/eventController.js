import Event from '../models/Event.js';

export const listEvents = async (req, res) => {
  try {
    const { city, category, fromDate, toDate, page = 1, limit = 12 } = req.query;
    
    console.log('[listEvents] Filtros:', { city, category, fromDate, toDate, page, limit });
    
    // Construir query dinámicamente
    let query = {};
    
    // Filtrar por ciudad
    if (city && city !== 'Todas las ciudades') {
      query.ciudad = city;
    }
    
    // Filtrar por categoría
    if (category && category !== 'Todas las categorías') {
      query.categoria = category;
    }
    
    // Filtrar por rango de fechas
    if (fromDate || toDate) {
      query.fecha = {};
      if (fromDate) {
        query.fecha.$gte = new Date(fromDate);
      }
      if (toDate) {
        query.fecha.$lte = new Date(toDate + 'T23:59:59');
      }
    }
    
    console.log('[listEvents] Query MongoDB:', query);
    
    // Contar total con filtros
    const total = await Event.countDocuments(query);
    
    // Paginar
    const skip = (parseInt(page) - 1) * parseInt(limit);
    
    // Obtener eventos
    const events = await Event.find(query)
      .sort({ fecha: 1 })
      .skip(skip)
      .limit(parseInt(limit));
    
    console.log('[listEvents] Eventos encontrados:', events.length, 'de', total);
    
    return res.status(200).json({
      items: events,
      total,
      page: parseInt(page),
      limit: parseInt(limit),
      pages: Math.ceil(total / parseInt(limit))
    });
  } catch (e) {
    console.error('[listEvents] Error:', e);
    return res.status(500).json({ message: 'Error al obtener eventos', error: e.message });
  }
};


export const getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ message: 'Evento no encontrado' });
    }
    return res.status(200).json(event);
  } catch (e) {
    return res.status(500).json({ message: 'Error', error: e.message });
  }
};
