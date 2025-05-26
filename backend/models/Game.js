import mongoose from 'mongoose';

// Defineix l’esquema de videojocs amb camps bàsics i timestamps automàtics
const GameSchema = new mongoose.Schema({
  title:     { type: String, required: true },
  platform:  { type: String, required: true },
  year:      { type: Number, required: true },
  imageUrl:  { type: String, default: '' }
}, { timestamps: true });

// Converteix automàticament _id a id i elimina camps innecessaris al fer toJSON
GameSchema.set('toJSON', {
  transform: (doc, ret) => {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
  }
});

// Exporta el model per ser utilitzat en el controlador
export default mongoose.model('Game', GameSchema);
