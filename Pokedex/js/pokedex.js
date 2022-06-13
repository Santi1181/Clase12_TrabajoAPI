const contenedorPokemon = document.querySelector('.contenedor-pokemon')
const contenedorBusqueda = document.querySelector('.contenedor-busqueda')
const anterior = document.querySelector('#anterior')
const siguiente = document.querySelector('#siguiente')
const todos = document.querySelector('#todos')
const particular = document.querySelector('#particular')
const buscar = document.querySelector('#buscar')
const paginador = document.querySelector('#paginador')

let offset = 1
let limit = 11

anterior.addEventListener('click',() => {
    if (offset != 1) {
        offset -= 12
        actulizarPantalla(contenedorPokemon)
        fetchPokemons(offset,limit)
    }
})


siguiente.addEventListener('click',() => {
    if (offset != 889) {
        offset += 12
        actulizarPantalla(contenedorPokemon)
        fetchPokemons(offset,limit)
    }
})

todos.addEventListener('click',() => {
    fetchPokemons(offset,limit);
    paginador.style.display = 'block'
    todos.disabled = 'true'
    particular.disabled = ''
    actulizarPantalla(contenedorBusqueda)
    actulizarPantalla(contenedorPokemon)
    contenedorPokemon.classList.remove('contenedor-particular')
})

particular.addEventListener('click',() => {
    paginador.style.display = 'none'
    actulizarPantalla(contenedorPokemon)
    todos.disabled = ''
    particular.disabled = 'true'

    const contenedorParametrosBusqueda = document.createElement("div");
    contenedorParametrosBusqueda.classList.add("contenedor-parametros")
    
    // const etiquetaNombre = document.createElement('label');
    // etiquetaNombre.textContent = 'Nombre';
    // const nombre = document.createElement('input');
    // nombre.type = 'text';
    // nombre.id = 'nombre'
    // nombre.classList.add("form-control")

    const etiquetaId = document.createElement('label');
    etiquetaId.textContent = 'Número Pokemon';
    const Id = document.createElement('input');
    Id.type = 'number';
    Id.id = 'id'
    Id.classList.add("form-control")
    Id.min = '1'
    Id.max = '898'

    buscar.type = 'button'
    buscar.textContent = 'Buscar'
    buscar.classList.add('btn')
    buscar.classList.add('btn-primary')
    buscar.style.display = 'block'
    buscar.style.align = 'center'
    
    // contenedorParametrosBusqueda.appendChild(etiquetaNombre)
    // contenedorParametrosBusqueda.appendChild(nombre)
    contenedorParametrosBusqueda.appendChild(etiquetaId)
    contenedorParametrosBusqueda.appendChild(Id)
    contenedorParametrosBusqueda.appendChild(buscar)
    
    contenedorBusqueda.appendChild(contenedorParametrosBusqueda)

})

function fetchPokemon(id){
    fetch (`https://pokeapi.co/api/v2/pokemon/${id}/`)
    .then((resultado) => resultado.json())
    .then((datos) =>  {
        crearTarjetaPokemon(datos);
        console.log(datos)
    })
}

function fetchPokemons(offset,limit){
    for (let i=offset;i<=offset + limit;i++){
        fetchPokemon(i);
    }
}

function crearTarjetaPokemon(pokemon){

    const flipCard = document.createElement("div");
    flipCard.classList.add("flip-card");

    const contenedorTarjeta = document.createElement("div");
    contenedorTarjeta.classList.add("contenedor-tarjeta");

    flipCard.appendChild(contenedorTarjeta);

    const tarjeta = document.createElement("div");
    tarjeta.classList.add("pokemon-frente");

    const fotoContainer = document.createElement("div");
    const foto = document.createElement("img");
    foto.src = pokemon.sprites.front_default;
    fotoContainer.appendChild(foto);

    const numero = document.createElement("p");
    numero.textContent = `#${pokemon.id.toString().padStart(3,0)}`;

    const nombre = document.createElement("p");
    nombre.classList.add("nombre")
    nombre.textContent = pokemon.name

    tarjeta.appendChild(fotoContainer);
    tarjeta.appendChild(numero);
    tarjeta.appendChild(nombre);

    const tarjetaAtras = document.createElement("div");
    tarjetaAtras.classList.add("pokemon-atras");
    tarjetaAtras.textContent = "Estadisticas"
    tarjetaAtras.appendChild(mostrarEstadisticas(pokemon.stats))
        
    contenedorTarjeta.appendChild(tarjeta);
    contenedorTarjeta.appendChild(tarjetaAtras);

    contenedorPokemon.appendChild(flipCard);

}

function mostrarEstadisticas (estadisticasPokemon) {
    const estadisticas = estadisticasPokemon;
    const contenedorEstadisticas = document.createElement("div");
    contenedorEstadisticas.classList.add("contenedor-estadisticas")

    estadisticas.forEach(function(elemento){
        
        const nombreEstadistica = document.createElement("div");
        nombreEstadistica.textContent = elemento.stat.name

        const valorEstadistica = document.createElement("div");
        valorEstadistica.textContent = elemento.base_stat

        contenedorEstadisticas.appendChild(nombreEstadistica);
        contenedorEstadisticas.appendChild(valorEstadistica);

    })

    return contenedorEstadisticas
}

function actulizarPantalla (padre){
    while (padre.firstChild){
        padre.removeChild(padre.firstChild)
    }
}


document.querySelector('#buscar').onclick = function(event) {
    actulizarPantalla(contenedorPokemon)
    const valorId = document.querySelector('#id').value

    if (valorId > 0 && valorId < 899) {
        contenedorPokemon.classList.add('contenedor-particular')
        fetchPokemon(valorId)
        valorId.value = ''
    } else {
        alert('Debe ingresar un valor entre 1 y 898, que corresponde a los Pokemon existentes')
    }
};


