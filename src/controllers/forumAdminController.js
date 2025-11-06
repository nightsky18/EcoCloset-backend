import Post from '../models/Post.js';
import Comment from '../models/Comment.js';

export const closePost = async (req, res) => {
  try {
    const post = await Post.findByIdAndUpdate(req.params.id, { estado: 'CERRADO' }, { new: true });
    if (!post) return res.status(404).json({ message: 'No encontrado' });
    return res.status(200).json(post);
  } catch (e) {
    return res.status(400).json({ message: 'Error al cerrar post', error: e.message });
  }
};

export const deletePost = async (req, res) => {
  try {
    const del = await Post.findByIdAndDelete(req.params.id);
    if (!del) return res.status(404).json({ message: 'No encontrado' });
    await Comment.deleteMany({ post: req.params.id });
    return res.status(204).send();
  } catch (e) {
    return res.status(400).json({ message: 'Error al eliminar post', error: e.message });
  }
};

export const deleteComment = async (req, res) => {
  try {
    const del = await Comment.findByIdAndDelete(req.params.id);
    if (!del) return res.status(404).json({ message: 'No encontrado' });
    return res.status(204).send();
  } catch (e) {
    return res.status(400).json({ message: 'Error al eliminar comentario', error: e.message });
  }
};
