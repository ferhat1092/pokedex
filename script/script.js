function init(){
    getPokemons();
};

async function getPokemons() {
    let responsPokemons = await fetch('https://pokeapi.co/api/v2/pokemon?limit=20&offset=0');
    let pokemonsObj = await responsPokemons.json()
    let pokemonsNameArr  = pokemonsObj.results;
    render(pokemonsNameArr);
};

function render(pokemonsNameArr) {
    let mainContainerContentRef = document.getElementById('main_container');
    mainContainerContentRef.innerHTML = pokemonsNameArr.map((pokemon) => pokeCardsTemplate(pokemon)).join();
};

function pokeCardsTemplate(pokemon) {
      return `
               <div class="poke-card">${pokemon.name}</div>
      `;
};