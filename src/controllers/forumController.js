
import Post from '../models/Post.js';
import Comment from '../models/Comment.js';

export const listPosts = async (req, res) => {
  try {
    const { q, etiqueta, page = 1, limit = 10 } = req.query;
    const filter = {};
    if (q) filter.$text = { $search: q };
    if (etiqueta) filter.etiquetas = etiqueta;
    const skip = (Number(page) - 1) * Number(limit);
    const [items, total] = await Promise.all([
      Post.find(filter).skip(skip).limit(Number(limit)).sort({ createdAt: -1 }),
      Post.countDocuments(filter)
    ]);
    return res.status(200).json({ items, total, page: Number(page), limit: Number(limit) });
  } catch (e) {
    return res.status(500).json({ message: 'Error al listar posts', error: e.message });
  }
};

export const createPost = async (req, res) => {
  try {
    const { titulo, contenido, imagen, etiquetas } = req.body;
    const post = await Post.create({ autor: req.user._id, titulo, contenido, imagen, etiquetas });
    return res.status(201).json(post);
  } catch (e) {
    return res.status(400).json({ message: 'Error al crear post', error: e.message });
  }
};

export const getPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'No encontrado' });
    post.vistas += 1;
    await post.save();
    return res.status(200).json(post);
  } catch (e) {
    return res.status(400).json({ message: 'Error al obtener post', error: e.message });
  }
};

export const toggleLike = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'No encontrado' });
    const uid = String(req.user._id);
    const i = post.usuariosLike.findIndex(u => String(u) === uid);
    if (i >= 0) {
      post.usuariosLike.splice(i, 1);
      post.likes = Math.max(0, post.likes - 1);
    } else {
      post.usuariosLike.push(req.user._id);
      post.likes += 1;
    }
    await post.save();
    return res.status(200).json(post);
  } catch (e) {
    return res.status(400).json({ message: 'Error al cambiar like', error: e.message });
  }
};

// Comentarios
export const listComments = async (req, res) => {
  try {
    const items = await Comment.find({ post: req.params.postId }).sort({ createdAt: 1 });
    return res.status(200).json(items);
  } catch (e) {
    return res.status(500).json({ message: 'Error al listar comentarios', error: e.message });
  }
};

export const createComment = async (req, res) => {
  try {
    const { postId } = req.params;
    const { contenido } = req.body;
    const userId = req.user._id;

    console.log('[createComment] Post ID:', postId);
    console.log('[createComment] Contenido:', contenido);
    console.log('[createComment] User:', userId);

    // Validar que postId es ObjectId válido
    if (!postId.match(/^[0-9a-fA-F]{24}$/)) {
      console.warn('[createComment] ID inválido:', postId);
      return res.status(400).json({ message: 'ID de post inválido' });
    }

    // Validar contenido
    if (!contenido || contenido.trim().length === 0) {
      return res.status(400).json({ message: 'El contenido no puede estar vacío' });
    }

    // Buscar post
    const post = await Post.findById(postId);
    if (!post) {
      console.warn('[createComment] Post no encontrado:', postId);
      return res.status(404).json({ message: 'Post no encontrado' });
    }

    console.log('[createComment] Post encontrado:', post._id);

    // Crear comentario
    const newComment = {
      contenido: contenido.trim(),
      autor: {
        _id: userId,
        nombre: req.user.nombre || 'Usuario',
        email: req.user.email
      },
      createdAt: new Date()
    };

    console.log('[createComment] Nuevo comentario:', newComment);

    // Inicializar array si no existe
    if (!post.comentarios) {
      post.comentarios = [];
    }

    // Agregar comentario
    post.comentarios.push(newComment);

    // Actualizar contador
    post.comentariosCount = post.comentarios.length;

    // Guardar post
    await post.save();

    console.log('[createComment] Post guardado:', post._id);
    console.log('[createComment] Total comentarios:', post.comentarios.length);
    console.log('[createComment] Post actualizado:', post);

    res.status(201).json({
      message: 'Comentario agregado exitosamente',
      post: post
    });

  } catch (err) {
    console.error('[createComment] Error:', err);
    console.error('[createComment] Stack:', err.stack);
    res.status(500).json({ 
      error: err.message,
      stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
    });
  }
};


