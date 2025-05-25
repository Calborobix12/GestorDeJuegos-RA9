// backend/routes/api.js
import express from 'express';
import multer from 'multer';
import * as controller from '../controllers/gameController.js';

const router = express.Router();

// Configura multer: guarda siempre en backend/uploads, sin subcarpetas
const upload = multer({
  dest: 'uploads/',           // ruta relativa a app.use('/uploads', ..)
  limits: { fileSize: 5e6 }   // opcional: límite 5MB
});

// CRUD de juegos con soporte de imagen
router.post('/games', upload.single('image'), controller.create);
router.get('/games', controller.readAll);
router.get('/games/:gameId', controller.readOne);
router.put('/games/:gameId', upload.single('image'), controller.update);
router.delete('/games/:gameId', controller.remove);

export default router;
