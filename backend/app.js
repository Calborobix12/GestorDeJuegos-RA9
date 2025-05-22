import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import path from 'path';
import { fileURLToPath } from 'url';

import apiRoutes from './routes/api.js';

// Para usar __dirname en ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3002;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Servir imágenes y archivos estáticos
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Servir frontend
app.use(express.static(path.join(__dirname, '../frontend')));

// Rutas API
app.use('/api', apiRoutes);

// Conexión MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/gestorvideojocs')
  .then(() => {
    console.log('🔌 MongoDB connectat!');
    app.listen(PORT, () => {
      console.log(`🖥️ Servidor backend escoltant a http://localhost:${PORT}`);
    });
  })
  .catch(err => {
    console.error('❌ Error de connexió a MongoDB:', err.message);
  });
