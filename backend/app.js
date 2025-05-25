import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

import apiRoutes from './routes/api.js';
import { connectDB } from './config/db.js';

// Per a poder usar __dirname en ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3002;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Servir imatges des de 'uploads' (carpeta absoluta correcta)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Servir frontend
app.use(express.static(path.join(__dirname, '../frontend')));

// Rutes de l'API
app.use('/api', apiRoutes);

// Connectar a MongoDB i iniciar servidor
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`🖥️ Servidor backend escoltant a http://localhost:${PORT}`);
  });
}).catch(err => {
  console.error('❌ Error de connexió a MongoDB:', err.message);
});
