// backend/models/Game.js
import mongoose from 'mongoose';

const gameSchema = new mongoose.Schema({
  title: { type: String, required: true },
  platform: { type: String, required: true },
  year: { type: Number, required: true },
  imageUrl: { type: String, default: '' },
}, { timestamps: true });

export default mongoose.model('Game', gameSchema);
