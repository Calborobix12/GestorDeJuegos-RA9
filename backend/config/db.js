import mongoose from 'mongoose';

const uri = process.env.MONGO_URI || 'mongodb://localhost:27017/gestorvideojocs';

export function connectDB() {
  return mongoose.connect(uri)
    .then(() => console.log('🔌 MongoDB connectat!'))
    .catch(err => console.error('❌ Error MongoDB:', err));
}
