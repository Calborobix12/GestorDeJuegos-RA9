export function renderGames(games, onEdit, onDelete) {
  // Genera y muestra la lista de juegos con sus botones de editar y borrar
  const list = document.getElementById('gamesList');
  list.innerHTML = '';

  games.forEach(game => {
    const li = document.createElement('li');
    li.dataset.id = game.id;

    // Imagen centrada y sin recortes
    const imgHtml = game.imageUrl
      ? `<div class="image-container">
           <img src="${game.imageUrl}" alt="${game.title}">
         </div>`
      : `<div class="image-container"></div>`;

    li.innerHTML = `
      ${imgHtml}
      <div class="info">
        <strong>${game.title}</strong><br>
        ${game.platform} • ${game.year}
      </div>
      <div class="actions">
        <button class="editBtn">Editar</button>
        <button class="deleteBtn">Borrar</button>
      </div>
    `;

    li.querySelector('.editBtn')
      .addEventListener('click', () => onEdit(game));

    li.querySelector('.deleteBtn')
      .addEventListener('click', () => onDelete(game.id));

    list.appendChild(li);
  });
}

export function populateForm(game) {
  // Rellena el formulario con los datos de un juego para editarlo
  document.getElementById('gameId').value = game.id;
  document.getElementById('title').value = game.title;
  document.getElementById('platform').value = game.platform;
  document.getElementById('year').value = game.year;
  document.getElementById('cancelBtn').classList.remove('hidden');
}

export function clearForm() {
  // Limpia el formulario y oculta el botón de cancelar y mensajes de error
  document.getElementById('gameForm').reset();
  document.getElementById('gameId').value = '';
  document.getElementById('cancelBtn').classList.add('hidden');
  document.getElementById('errorMsg').classList.add('hidden');
}
