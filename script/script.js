let currentLimit = 20;
let currentPokeIndex = 0;
let pokemonList = [];
let detailsAboutPokemonsArr = [];
let filterPokemon = [];

function init() {
    getPokemons();
};

async function getPokemons() {
    openLoader();
    await fetchPokemons();
    render(detailsAboutPokemonsArr);
    closeLoader();
};

async function fetchPokemons() {
    let responsPokemons = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${currentLimit}&offset=0`);
    let pokemonsObj = await responsPokemons.json();
    let detailPromises = pokemonsObj.results.map(async (pokemon) => (await fetch(pokemon.url)).json());
    detailsAboutPokemonsArr = await Promise.all(detailPromises);
};

function openLoader() {
    document.getElementById('loader').classList.remove('d-none');
};

function closeLoader() {
    document.getElementById('loader').classList.add('d-none');
};

function getMorePokemons() {
    currentLimit += 20;
    getPokemons();
};

function render(arr) {
    pokemonList = arr;
    let mainContainerContentRef = document.getElementById('main_container');
    mainContainerContentRef.innerHTML = '';
    mainContainerContentRef.innerHTML += pokemonList.map((pokemon, pokeIndex) => pokeCardsTemplate(pokemon, pokeIndex)).join('');
};

function overlayPokemons(pokeIndex) {
    currentPokeIndex = pokeIndex;
    let overlayPokemonsContentRef = document.getElementById('overlay_pokemon');
    if (filterPokemon.length < 3) {
        let pokemon = detailsAboutPokemonsArr[pokeIndex];
        overlayPokemonsContentRef.innerHTML = pokeOverlayTemplate(pokemon);
    } else {
        let pokemon = filterPokemon[pokeIndex];
        overlayPokemonsContentRef.innerHTML = pokeOverlayTemplate(pokemon);
    };
};

function openOverlay(pokeIndex) {
    document.getElementById('overlay_pokemon').classList.remove('d-none');
    document.body.classList.add('stop-scroll');
    overlayPokemons(pokeIndex);
};

function nextPokemon() {
    if (currentPokeIndex < pokemonList.length - 1) {
        currentPokeIndex++;
    };
    overlayPokemons(currentPokeIndex);
};

function previousPokemon() {
    if (currentPokeIndex > 0) {
        currentPokeIndex--;
    };
    overlayPokemons(currentPokeIndex);
};

function closeOverlay() {
    document.getElementById('overlay_pokemon').classList.add('d-none');
    document.body.classList.remove('stop-scroll');
};

function searchBar(event) {
    event.preventDefault();
    let searchPokemon = document.getElementById('search_pokemon').value.toLowerCase();
    if (searchPokemon.length < 3) {
        filterPokemon = [];
        render(detailsAboutPokemonsArr);
        return;
    } else {
        filterPokemon = detailsAboutPokemonsArr.filter((pokemon) =>
            pokemon.name.toLowerCase().includes(searchPokemon)
        );
        render(filterPokemon);
    };
};