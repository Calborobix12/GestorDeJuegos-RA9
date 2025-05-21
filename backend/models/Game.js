import mongoose from 'mongoose';

const GameSchema = new mongoose.Schema({
  title:     { type: String, required: true },
  platform:  { type: String, required: true },
  year:      { type: Number, required: true },
  imageUrl:  { type: String }
}, { timestamps: true });

export default mongoose.model('Game', GameSchema);
