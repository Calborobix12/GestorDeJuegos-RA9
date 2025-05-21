import Game from '../models/Game.js';
import { unlinkSync } from 'fs';
import path from 'path';

export async function create(req, res) {
  try {
    const { title, platform, year } = req.body;
    let imageUrl = '';
    if (req.file) {
      imageUrl = `/uploads/${req.file.filename}`;
    }
    const game = await Game.create({ title, platform, year, imageUrl });
    res.status(201).json(game);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

export async function readAll(req, res) {
  const games = await Game.find().sort('-createdAt');
  res.json(games);
}

export async function readOne(req, res) {
  const game = await Game.findById(req.params.id);
  if (!game) return res.status(404).json({ error: 'No trobat' });
  res.json(game);
}

export async function update(req, res) {
  const { title, platform, year } = req.body;
  const updateData = { title, platform, year };
  if (req.file) updateData.imageUrl = `/uploads/${req.file.filename}`;
  const game = await Game.findByIdAndUpdate(req.params.id, updateData, { new: true });
  if (!game) return res.status(404).json({ error: 'No trobat' });
  res.json(game);
}

export async function remove(req, res) {
  const game = await Game.findByIdAndDelete(req.params.id);
  if (!game) return res.status(404).json({ error: 'No trobat' });
  if (game.imageUrl) {
    const filePath = path.resolve('backend', game.imageUrl);
    try { unlinkSync(filePath); } catch (e) { console.error('No s\'ha pogut esborrar la imatge:', e.message); }
  }
  res.json({ message: 'Esborrat correctament' });
}
