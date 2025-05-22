// frontend/js/view.js

export function renderGames(games, onEdit, onDelete) {
  const list = document.getElementById('gamesList');
  list.innerHTML = '';

  games.forEach(game => {
    const li = document.createElement('li');
    li.dataset.id = game.id;  // Antes era game._id

    const imgHtml = game.imageUrl
      ? `<img src="${game.imageUrl}" alt="${game.title}" class="thumb">`
      : '';

    li.innerHTML = `
      ${imgHtml}
      <div class="info">
        <strong>${game.title}</strong><br>
        ${game.platform} (${game.year})
      </div>
      <div class="actions">
        <button class="editBtn">✏️</button>
        <button class="deleteBtn">🗑️</button>
      </div>
    `;

    li.querySelector('.editBtn')
      .addEventListener('click', () => onEdit(game));

    li.querySelector('.deleteBtn')
      .addEventListener('click', () => onDelete(game.id));  // Antes era game._id

    list.appendChild(li);
  });
}

export function populateForm(game) {
  document.getElementById('gameId').value = game.id;      // Antes game._id
  document.getElementById('title').value = game.title;
  document.getElementById('platform').value = game.platform;
  document.getElementById('year').value = game.year;
  document.getElementById('cancelBtn').classList.remove('hidden');
}

export function clearForm() {
  document.getElementById('gameForm').reset();
  document.getElementById('gameId').value = '';
  document.getElementById('cancelBtn').classList.add('hidden');
  document.getElementById('errorMsg').classList.add('hidden');
}
