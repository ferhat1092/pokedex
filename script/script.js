let currentOffset = 0;

function init() {
    getPokemons();
};

async function getPokemons() {
    document.getElementById('loader').classList.remove('d-none');
    let responsPokemons = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=20&offset=${currentOffset}`);
    let pokemonsObj = await responsPokemons.json();
    let detailPromises = pokemonsObj.results.map(async (pokemon) => (await fetch(pokemon.url)).json());
    let detailsAboutPokemons = await Promise.all(detailPromises);
    render(detailsAboutPokemons);
    document.getElementById('loader').classList.add('d-none');
};

function getMorePokemons() {
    currentOffset += 20;
    getPokemons();
    document.getElementById('btn').classList.toggle('d-none');
};

function render(detailsAboutPokemons) {
    let mainContainerContentRef = document.getElementById('main_container');
    mainContainerContentRef.innerHTML += detailsAboutPokemons.map((pokemon) => pokeCardsTemplate(pokemon)).join('');
};

function pokeCardsTemplate(pokemon) {
    return `
               <div class="poke-card bg-${pokemon.types[0].type.name}">
               <h3>${pokemon.name.toUpperCase()}</h3>
               <img class="poke-img"src="${pokemon.sprites.other.home.front_default}" alt="pokemon-pic">
               <p>${pokemon.types[0].type.name}</p>
               </div>
      `;
};