
const container = document.getElementById('cards-container');
const filterSelect = document.getElementById('characterFilter');
let characters = [];

async function fetchCharacters() {
  try {
    const res = await fetch('https://rickandmortyapi.com/api/character?page=3');
    const data = await res.json();
    characters = data.results.slice(0, 16); // Solo los primeros 16

    populateFilterOptions();
    renderCards(characters);
  } catch (err) {
    console.error('Error al cargar los personajes:', err);
  }
}

function populateFilterOptions() {
  characters.forEach(character => {
    const option = document.createElement('option');
    option.value = character.id;
    option.textContent = character.name;
    filterSelect.appendChild(option);
  });
}

function traducirStatus(status) {
  switch(status) {
    case 'Alive': return 'Vivo';
    case 'Dead': return 'Muerto';
    default: return 'Desconocido';
  }
}

function traducirSpecies(species) {
  switch(species) {
    case 'Human': return 'Humano';
    case 'Alien': return 'Alienígena';
    default: return species;
  }
}

function renderCards(characterList) {
  if (characterList.length === 1) {
    container.classList.add('single-card-view');
  } else {
    container.classList.remove('single-card-view');
  }

  container.innerHTML = '';
  characterList.forEach(character => {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
      <img src="${character.image}" alt="${character.name}" />
      <div class="card-content">
        <h3>${character.name}</h3>
        <p>${traducirStatus(character.status)} - ${traducirSpecies(character.species)}</p>
      </div>
    `;
    container.appendChild(card);
  });
}

filterSelect.addEventListener('change', () => {
  const selectedId = filterSelect.value;
  if (selectedId === 'all') {
    renderCards(characters);
  } else {
    const filtered = characters.filter(c => c.id == selectedId);
    renderCards(filtered);
  }
});

fetchCharacters();

