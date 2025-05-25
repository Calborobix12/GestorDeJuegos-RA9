// backend/models/Game.js
import mongoose from 'mongoose';

const GameSchema = new mongoose.Schema({
  title:     { type: String, required: true },
  platform:  { type: String, required: true },
  year:      { type: Number, required: true },
  imageUrl:  { type: String, default: '' }
}, { timestamps: true });

GameSchema.set('toJSON', {
  transform: (doc, ret) => {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
  }
});

export default mongoose.model('Game', GameSchema);
