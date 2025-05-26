import express from 'express';
import multer from 'multer';
import * as controller from '../controllers/gameController.js';

const router = express.Router();

// Configuració de multer per gestionar pujades d'imatges (màx. 5MB a /uploads)
const upload = multer({
  dest: 'uploads/',
  limits: { fileSize: 5e6 }
});

// Rutes CRUD per a videojocs amb suport d'imatge
router.post('/games', upload.single('image'), controller.create);
router.get('/games', controller.readAll);
router.get('/games/:gameId', controller.readOne);
router.put('/games/:gameId', upload.single('image'), controller.update);
router.delete('/games/:gameId', controller.remove);

export default router;
