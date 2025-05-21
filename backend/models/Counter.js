import mongoose from 'mongoose';

const CounterSchema = new mongoose.Schema({
  _id:   { type: String, required: true },  // nom de la sèrie, p.ex. 'gameId'
  seq:   { type: Number, default: 0 }
});

export default mongoose.model('Counter', CounterSchema);
