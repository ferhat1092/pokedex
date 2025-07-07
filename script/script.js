function init(){
    getPokemons();
};

async function getPokemons() {
    let responsPokemons = await fetch('https://pokeapi.co/api/v2/pokemon?limit=20&offset=0');
    let pokemonsObj = await responsPokemons.json();
    let detailPromises = pokemonsObj.results.map(async (pokemon) => (await fetch(pokemon.url)).json());
    let detailsAboutPokemons = await Promise.all(detailPromises);
    render(detailsAboutPokemons);
};

function render(detailsAboutPokemons) {
    let mainContainerContentRef = document.getElementById('main_container');
    mainContainerContentRef.innerHTML = detailsAboutPokemons.map((pokemon) => pokeCardsTemplate(pokemon)).join('');
};

function pokeCardsTemplate(pokemon) {
      return `
               <div class="poke-card bg-${pokemon.types[0].type.name}">
               <h3>${pokemon.name.toUpperCase()}</h3>
               <img src="${pokemon.sprites.front_default}" alt="pokemon-pic">
               <p>${pokemon.types[0].type.name}</p>
               </div>
      `;
};
