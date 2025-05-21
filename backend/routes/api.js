import express from 'express';
import multer from 'multer';
import * as controller from '../controllers/gameController.js';

const router = express.Router();
const upload = multer({ dest: 'backend/uploads/' });

router.post('/games', upload.single('image'), controller.create);
router.get('/games', controller.readAll);
router.get('/games/:id', controller.readOne);
router.put('/games/:id', upload.single('image'), controller.update);
router.delete('/games/:id', controller.remove);

export default router;
