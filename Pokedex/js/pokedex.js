const pokemonContainer = document.querySelector('.pokemon-container')

function fetchPokemon(id){
    fetch (`https://pokeapi.co/api/v2/pokemon/${id}/`)
    .then((resultado) => resultado.json())
    .then((datos) =>  console.log(datos));
}


function fetchPokemons(numero){
    for (let i=1;i<=numero;i++){
        fetchPokemon(i);
    }

}


fetchPokemons(8);