const API_URL = '/api/games';

export async function fetchGames() {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error('No s’han pogut carregar els jocs');
  return await res.json();
}

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

export async function deleteGame(id) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE'
  });
  if (!res.ok) throw new Error('Error al eliminar joc');
  return await res.json();
}
