const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')

const maxRecords = 151
const limit = 10
let offset = 0;

function convertPokemonToLi(pokemon) {
    return `
        <li class="pokemon ${pokemon.type}">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>

            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>

                <img src="${pokemon.photo}"
                     alt="${pokemon.name}">
            </div>

            <div class="abilitiesList">
                <button type="button">Abilities</button>
            </div>

            <div class="abilityList">
                <ol class="ability">
                    ${pokemon.abilities.map((ability)=> `<li class="abilitie ${ability}">${ability}</li>`).join('')}                    
                </ol>
            </div>

            <div class="statsList">
                <button type="button">Stats</button>
            </div>

            <div class="statList">
                <ol class="stats">
                    <li class="stat">XP: ${pokemon.baseExperience}</li>
                    <li class="stat">Height: ${pokemon.height}</li>
                    <li class="stat">Weight: ${pokemon.weight}</li>
                    ${pokemon.stats.map((stats) => `<li class="stat">${stats.stat.name}: ${stats.base_stat}</li>`).join('')}
                </ol>
            </div>
    `
}

/* ${pokemon.stats.map((stats) => `<li class="abilitie">${stats.stat.name}: ${stats.base_stat}`).join('')} */

function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemonToLi).join('')
        pokemonList.innerHTML += newHtml
    }) 
}

loadPokemonItens(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit
    const qtdRecordsWithNexPage = offset + limit

    if (qtdRecordsWithNexPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItens(offset, limit)
    }
})


