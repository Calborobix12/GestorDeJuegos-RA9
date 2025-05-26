import Game from '../models/Game.js';
import { unlinkSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Resolució de __dirname per a ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Crea un nou joc i retorna l’objecte creat
export async function create(req, res) {
  try {
    const { title, platform, year } = req.body;
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : '';
    const game = await Game.create({ title, platform, year, imageUrl });
    res.status(201).json(game.toJSON());
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

// Llegeix i retorna tots els jocs ordenats per data de creació
export async function readAll(req, res) {
  try {
    const games = await Game.find().sort({ createdAt: 1 });
    res.json(games.map(g => g.toJSON()));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// Llegeix i retorna un sol joc per ID
export async function readOne(req, res) {
  try {
    const game = await Game.findById(req.params.gameId);
    if (!game) return res.status(404).json({ error: 'Joc no trobat' });
    res.json(game.toJSON());
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// Actualitza un joc existent i retorna’l
export async function update(req, res) {
  try {
    const updateData = {
      title: req.body.title,
      platform: req.body.platform,
      year: req.body.year
    };
    if (req.file) updateData.imageUrl = `/uploads/${req.file.filename}`;

    const game = await Game.findByIdAndUpdate(
      req.params.gameId,
      updateData,
      { new: true }
    );
    if (!game) return res.status(404).json({ error: 'Joc no trobat' });
    res.json(game.toJSON());
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

// Elimina un joc per ID i esborra la imatge física si existeix
export async function remove(req, res) {
  try {
    const game = await Game.findByIdAndDelete(req.params.gameId);
    if (!game) return res.status(404).json({ error: 'Joc no trobat' });

    if (game.imageUrl) {
      try {
        const filePath = path.join(__dirname, '../uploads', path.basename(game.imageUrl));
        unlinkSync(filePath);
      } catch (e) {
        console.error('No s’ha pogut esborrar la imatge:', e.message);
      }
    }

    res.json({ message: 'Joc esborrat correctament' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
