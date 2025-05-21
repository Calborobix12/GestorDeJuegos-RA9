// backend/routes/api.js
import express from 'express';
import multer from 'multer';
import * as controller from '../controllers/gameController.js';
import Game from '../models/Game.js'; // útil para debug

const router = express.Router();
const upload = multer({ dest: 'backend/uploads/' });

// CRUD
router.post('/games', upload.single('image'), controller.create);
router.get('/games', controller.readAll);
router.get('/games/:id', controller.readOne);
router.put('/games/:id', upload.single('image'), controller.update);
router.delete('/games/:id', controller.remove);

// Extra
router.delete('/games', controller.removeAll);

// Debug: eliminar juegos por título
router.delete('/debug/delete-zelda', async (req, res) => {
  try {
    const result = await Game.deleteMany({ title: "Zelda" });
    res.json({ message: `'Zelda' eliminats`, deletedCount: result.deletedCount });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
