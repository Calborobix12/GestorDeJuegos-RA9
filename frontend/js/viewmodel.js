import * as model from './model.js';
import * as view from './view.js';

// Inicialitza l’app: carrega i mostra jocs, i configura esdeveniments
export async function init() {
  try {
    const games = await model.fetchGames();
    view.renderGames(games, handleEdit, handleDelete);
  } catch (err) {
    console.error(err);
    document.getElementById('errorMsg').textContent = err.message;
    document.getElementById('errorMsg').classList.remove('hidden');
  }

  document.getElementById('gameForm').addEventListener('submit', handleSubmit);
  document.getElementById('cancelBtn').addEventListener('click', view.clearForm);
}

// Gestiona l’enviament del formulari per crear o editar un joc
async function handleSubmit(e) {
  e.preventDefault();
  const id = document.getElementById('gameId').value;
  const data = {
    title: document.getElementById('title').value,
    platform: document.getElementById('platform').value,
    year: document.getElementById('year').value,
    image: document.getElementById('image').files[0] || null
  };

  try {
    if (id) await model.updateGame(id, data);
    else await model.createGame(data);

    view.clearForm();
    const games = await model.fetchGames();
    view.renderGames(games, handleEdit, handleDelete);
  } catch (err) {
    document.getElementById('errorMsg').textContent = err.message;
    document.getElementById('errorMsg').classList.remove('hidden');
  }
}

// Omple el formulari amb les dades d’un joc per editar-lo
function handleEdit(game) {
  view.populateForm(game);
}

// Elimina un joc prèvia confirmació i recarrega la llista
async function handleDelete(id) {
  if (confirm('Vols esborrar aquest joc?')) {
    try {
      await model.deleteGame(id);
      const games = await model.fetchGames();
      view.renderGames(games, handleEdit, handleDelete);
    } catch {
      alert('Error eliminant el joc');
    }
  }
}
