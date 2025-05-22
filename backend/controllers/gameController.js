import Game from '../models/Game.js';
import { unlinkSync } from 'fs';
import path from 'path';

export async function create(req, res) {
  try {
    const { title, platform, year } = req.body;
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : '';

    const game = await Game.create({ title, platform, year, imageUrl });
    res.status(201).json(game);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

export async function readAll(req, res) {
  try {
    const games = await Game.find().sort({ createdAt: 1 });
    res.json(games.map(g => g.toJSON()));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function readOne(req, res) {
  try {
    const game = await Game.findById(req.params.gameId);
    if (!game) return res.status(404).json({ error: 'Joc no trobat' });
    res.json(game.toJSON());
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function update(req, res) {
  try {
    const updateData = {
      title: req.body.title,
      platform: req.body.platform,
      year: req.body.year
    };
    if (req.file) updateData.imageUrl = `/uploads/${req.file.filename}`;

    const game = await Game.findByIdAndUpdate(req.params.gameId, updateData, { new: true });
    if (!game) return res.status(404).json({ error: 'Joc no trobat' });
    res.json(game.toJSON());
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

export async function remove(req, res) {
  try {
    const game = await Game.findByIdAndDelete(req.params.gameId);
    if (!game) return res.status(404).json({ error: 'Joc no trobat' });

    if (game.imageUrl) {
      try {
        unlinkSync(path.join('backend', game.imageUrl));
      } catch (e) {
        console.error('No s’ha pogut esborrar la imatge:', e.message);
      }
    }
    res.json({ message: 'Joc esborrat correctament' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
