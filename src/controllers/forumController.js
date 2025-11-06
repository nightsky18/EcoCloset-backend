
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
    const { contenido, parent } = req.body;
    const com = await Comment.create({ post: req.params.postId, autor: req.user._id, contenido, parent });
    return res.status(201).json(com);
  } catch (e) {
    return res.status(400).json({ message: 'Error al crear comentario', error: e.message });
  }
};
