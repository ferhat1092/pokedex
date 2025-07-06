function init(){
    getPokemons();
};

async function getPokemons() {
    let responsPokemons = await fetch('https://pokeapi.co/api/v2/pokemon?limit=20&offset=0');
    let pokemonsArr = await responsPokemons.json();
    render(pokemonsArr);
};

function render(pokemonsArr) {
    let mainContainerContentRef = document.getElementById('main_container');
    mainContainerContentRef.innerHTML = pokemonsArr.map((pokemon) => pokeCardsTemplate(pokemon)).join();
};

function pokeCardsTemplate(pokemon) {
      return `
               <div class="poke-card">${pokemon.name}</div>
      `;
};