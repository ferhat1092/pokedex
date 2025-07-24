let currentOffset = 0;
let detailsAboutPokemonsArr = [];

function init() {
    getPokemons();
};

async function getPokemons() {
    document.getElementById('loader').classList.remove('d-none');
    let responsPokemons = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=20&offset=${currentOffset}`);
    let pokemonsObj = await responsPokemons.json();
    let detailPromises = pokemonsObj.results.map(async (pokemon) => (await fetch(pokemon.url)).json());
    detailsAboutPokemonsArr = await Promise.all(detailPromises);
    render(detailsAboutPokemonsArr);
    document.getElementById('loader').classList.add('d-none');
};

function getMorePokemons() {
    currentOffset += 20;
    getPokemons();
    document.getElementById('btn').classList.toggle('d-none');
};

function render() {
    let mainContainerContentRef = document.getElementById('main_container');
    mainContainerContentRef.innerHTML += detailsAboutPokemonsArr.map((pokemon) => pokeCardsTemplate(pokemon)).join('');    
};

console.log(detailsAboutPokemonsArr);


function pokeCardsTemplate(pokemon) {
    return `
               <div class="poke-card bg-${pokemon.types[0].type.name}" onclick="overlayPokemons()">
               <h3>${pokemon.name.toUpperCase()}</h3>
               <img class="poke-img"src="${pokemon.sprites.other.home.front_default}" alt="pokemon-pic">
               <p>${pokemon.types[0].type.name}</p>
               </div>
      `;
};

function overlayPokemons(detailsAboutPokemonsArr) {
    let overlayPokemonsContentRef = document.getElementById('overlay_pokemon');
    overlayPokemonsContentRef.innerHTML = detailsAboutPokemonsArr.map((pokemons) => pokeOverlayTemplate(pokemons)).join('');
};

function pokeOverlayTemplate(pokemons) {
    return `
                <div class="overlay">
                    <div class="poke-card-big bg-${pokemons.types[0].type.name}">
                    <h3>${pokemons.name.toUpperCase()}</h3>
                    <img class="poke-img"src="${pokemons.sprites.other.home.front_default}" alt="pokemon-pic">
                    <p>${pokemons.types[0].type.name}</p></div>
                </div>
    `;
};