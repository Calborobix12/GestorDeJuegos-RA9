// URL base per a les crides a l’API de videojocs
const API_URL = '/api/games';

// Obté la llista de jocs des del servidor
export async function fetchGames() {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error('No s’han pogut carregar els jocs');
  return await res.json();
}

// Envia un nou joc al servidor utilitzant FormData
export async function createGame(data) {
  const formData = new FormData();
  for (const key in data) {
    if (data[key] !== null) formData.append(key, data[key]);
  }
  const res = await fetch(API_URL, {
    method: 'POST',
    body: formData
  });
  if (!res.ok) throw new Error('Error al crear joc');
  return await res.json();
}

// Actualitza un joc existent al servidor amb les dades del formulari
export async function updateGame(id, data) {
  const formData = new FormData();
  for (const key in data) {
    if (data[key] !== null) formData.append(key, data[key]);
  }
  const res = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    body: formData
  });
  if (!res.ok) throw new Error('Error al actualitzar joc');
  return await res.json();
}

// Elimina un joc específic del servidor per ID
export async function deleteGame(id) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE'
  });
  if (!res.ok) throw new Error('Error al eliminar joc');
  return await res.json();
}
