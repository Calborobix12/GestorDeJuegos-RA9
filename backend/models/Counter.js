import mongoose from 'mongoose';

// Model per gestionar comptadors seqüencials (p.ex. per generar IDs)
const CounterSchema = new mongoose.Schema({
  _id:   { type: String, required: true },
  seq:   { type: Number, default: 0 }
});

export default mongoose.model('Counter', CounterSchema);
