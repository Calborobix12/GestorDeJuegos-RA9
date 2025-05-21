import express from 'express';
import cors from 'cors';
import path from 'path';
import { connectDB } from './config/db.js';
import apiRoutes from './routes/api.js';
import { fileURLToPath } from 'url';

const app = express();
connectDB();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors());
app.use(express.json());

// Serveix imatges pujades
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Serveix el frontend
app.use(express.static(path.join(__dirname, '../frontend')));
app.get('*', (req, res, next) => {
  if (req.path.startsWith('/api') || req.path.startsWith('/uploads')) return next();
  res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

// Rutes API
app.use('/api', apiRoutes);

const PORT = 3002;
app.listen(PORT, () => console.log(`🖥️ Servidor backend escoltant a http://localhost:${PORT}`));
