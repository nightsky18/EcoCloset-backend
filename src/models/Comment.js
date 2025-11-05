
import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const CommentSchema = new Schema(
  {
    post: { type: Schema.Types.ObjectId, ref: 'Post', required: true, index: true },
    autor: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    contenido: { type: String, required: true, maxlength: 1000 },
    parent: { type: Schema.Types.ObjectId, ref: 'Comment' }
  },
  { timestamps: true }
);

export default model('Comment', CommentSchema);
