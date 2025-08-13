function pokeCardsTemplate(pokemon, pokeIndex) {
    return `
               <div class="poke-card bg-${pokemon.types[0].type.name}" onclick="openOverlay(${pokeIndex})">
                 <h3 class="poke-name">${pokemon.name}</h3>
                 <div class="poke-img-type">
                   <p class="poke-type">${pokemon.types[0].type.name}</p>
                   <img class="poke-img"src="${pokemon.sprites.other.home.front_default}" alt="pokemon-pic">
                 </div>
               </div>
      `;
};

function pokeOverlayTemplate(pokemon) {
    return `
                <div class="overlay" onclick="closeOverlay()">
                    <div class="poke-card-big bg-${pokemon.types[0].type.name}" onclick="event.stopPropagation()">
                      <h3 class="big-poke-name">${pokemon.name}</h3>
                      <img class="big-poke-img"src="${pokemon.sprites.other.home.front_default}" alt="pokemon-pic">
                      <div class="big-stats">
                        <p class="big-poke-type"><strong>Type:</strong> ${pokemon.types[0].type.name}</p>
                        <p><strong>HP:</strong> ${pokemon.stats[0].base_stat}</p>
                        <p><strong>Attack:</strong> ${pokemon.stats[1].base_stat}</p>
                        <p><strong>Defense:</strong> ${pokemon.stats[2].base_stat}</p>
                      </div>
                      <div class="btn-next-prv">
                        <button class="btn" onclick="previousPokemon()">-</button>
                        <button class="btn" onclick="nextPokemon()">+</button>
                      </div>  
                    </div>
                </div>
    `;
};