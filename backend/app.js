// Inicia el servidor, configura middleware, serveix estàtics, rutes i connecta a MongoDB
import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

import apiRoutes from './routes/api.js';
import { connectDB } from './config/db.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3002;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(express.static(path.join(__dirname, '../frontend')));

app.use('/api', apiRoutes);

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`🖥️ Servidor backend escoltant a http://localhost:${PORT}`);
    });
  })
  .catch(err => {
    console.error('❌ Error de connexió a MongoDB:', err.message);
  });
