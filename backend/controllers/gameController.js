import Game from '../models/Game.js';
import { unlinkSync } from 'fs';
import path from 'path';

export async function create(req, res) {
  try {
    const { title, platform, year } = req.body;
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : '';

    const game = await Game.create({
      title,
      platform,
      year,
      imageUrl
    });

    res.status(201).json(game.toJSON());
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

export async function readAll(req, res) {
  try {
    const games = await Game.find().sort({ createdAt: 1 }).lean();
    res.json(games);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function readOne(req, res) {
  try {
    const game = await Game.findById(req.params.id).lean();
    if (!game) return res.status(404).json({ error: 'Joc no trobat' });
    res.json(game);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function update(req, res) {
  try {
    const { title, platform, year } = req.body;
    const updateData = { title, platform, year };
    if (req.file) updateData.imageUrl = `/uploads/${req.file.filename}`;

    const game = await Game.findByIdAndUpdate(req.params.id, updateData, { new: true }).lean();
    if (!game) return res.status(404).json({ error: 'Joc no trobat' });
    res.json(game);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

export async function remove(req, res) {
  try {
    const game = await Game.findByIdAndDelete(req.params.id).lean();
    if (!game) return res.status(404).json({ error: 'Joc no trobat' });

    if (game.imageUrl) {
      try {
        unlinkSync(path.resolve('backend', game.imageUrl));
      } catch (e) {
        console.error('No s’ha pogut esborrar la imatge:', e.message);
      }
    }
    res.json({ message: 'Joc esborrat correctament' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function removeAll(req, res) {
  try {
    await Game.deleteMany({});
    res.json({ message: 'Tots els jocs han estat esborrats' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
