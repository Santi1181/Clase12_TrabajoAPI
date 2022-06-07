// https://v6.exchangerate-api.com/v6/475615bb6d77e2ed59770143/latest/USD   --- Obtener Ultimo
// https://v6.exchangerate-api.com/v6/475615bb6d77e2ed59770143/history/USD/2020/05/01  --- Historico - Plan pago


function fetchExchange(moneda = 'ARS') {
    fetch(`https://v6.exchangerate-api.com/v6/475615bb6d77e2ed59770143/latest/${moneda}`)
        .then((resultado) => resultado.json())
        .then((datos) => {
            refrescarPantalla()
            Object.keys(datos.conversion_rates).forEach(moneda => {
                agregarRegistrosEnTabla(moneda, datos.conversion_rates[moneda])
                agregarOpcionesMoneda(moneda)
            })
            console.log(datos)
            agregarFechaUltimaActualizacion(datos.time_last_update_utc)
        })
}


function fetchCargarMonedaConversion(moneda = 'ARS') {
    fetch(`https://v6.exchangerate-api.com/v6/475615bb6d77e2ed59770143/latest/${moneda}`)
        .then( resultado => resultado.json())   
        .then( datos => {
            Object.keys(datos.conversion_rates).forEach(moneda => {
                agregarOpcionesMonedaConversion(moneda,1)
                agregarOpcionesMonedaConversion(moneda,2)
                
            })

        })
            
}

 async function fetchCotizacionMoneda(moneda1,moneda2) {
    let cotizacion = ''
    await fetch(`https://v6.exchangerate-api.com/v6/475615bb6d77e2ed59770143/latest/${moneda1}`)
        .then( resultado => resultado.json())   
        .then( datos => {

                cotizacion = datos.conversion_rates[moneda2]
            })
            
    let monedaConversion = document.querySelector('#moneda-a-convertir').value
    
    document.querySelector('#resultado').value = (monedaConversion * cotizacion).toFixed(2)    
    document.querySelector('#resultado-moneda-conversion').textContent = moneda2
    
}
        

function agregarOpcionesMonedaConversion(moneda,campo) {
    const selectorMoneda = document.querySelector('#moneda-' + campo + '-conversion');
    const opcionMoneda = document.createElement('option');

    opcionMoneda.setAttribute('value', `${moneda}`);
    opcionMoneda.textContent = `${moneda}`;

    selectorMoneda.appendChild(opcionMoneda);
}

fetchExchange()


function agregarRegistrosEnTabla(moneda, valor) {

    const tablaContenido = document.querySelector('#tabla-contenido');

    const registroTabla = document.createElement('tr');

    const columnaMoneda = document.createElement('th');
    const columnaCotizacion = document.createElement('th');

    columnaMoneda.textContent = `${moneda}`;
    columnaCotizacion.textContent = `$${valor}`

    registroTabla.append(columnaMoneda, columnaCotizacion);
    tablaContenido.appendChild(registroTabla);
}


function agregarOpcionesMoneda(moneda) {
    const selectorMoneda = document.querySelector('#monedas');
    const opcionMoneda = document.createElement('option');

    opcionMoneda.setAttribute('value', `${moneda}`);
    opcionMoneda.textContent = `${moneda}`;

    selectorMoneda.appendChild(opcionMoneda);
}


function refrescarPantalla() {
    let tabla = document.querySelector('#tabla-contenido')
    limpiar(tabla)
    
    let monedas = document.querySelector('#monedas')
    limpiar(monedas)
    
    document.querySelector('#ultima-actualizacion').textContent = ''
}

function agregarFechaUltimaActualizacion(fechaActualizacion) {
    document.querySelector('#ultima-actualizacion').textContent = fechaActualizacion.substring(0,16)
}

function limpiar (padre){
    while (padre.firstChild){
        padre.removeChild(padre.firstChild)
    }
}

document.querySelector('#cotizaciones').addEventListener('click',() =>{

    mostrar('contenedor-opciones-busqueda')
    mostrar('contenedor-tabla')
    ocultar('contenedor-conversion')
    ocultar('contenedor-resultado')

})

document.querySelector('#conversion').addEventListener('click',() =>{

    ocultar('contenedor-opciones-busqueda')
    ocultar('contenedor-tabla')
    mostrar('contenedor-conversion')
    mostrar('contenedor-resultado')

    fetchCargarMonedaConversion()

})

document.querySelector('#convertir').addEventListener('click',() => {

    let moneda1 = document.querySelector('#moneda-1-conversion').value
    let moneda2 = document.querySelector('#moneda-2-conversion').value
    
   fetchCotizacionMoneda(moneda1,moneda2)

})

document.querySelector('#actualizar').addEventListener('click', () => {
    let monedaSeleccionada = document.querySelector('#monedas').value
    fetchExchange(monedaSeleccionada)
})


function ocultar (elemento) {
    document.querySelector('.' + elemento).classList.add('oculto')
}

function mostrar (elemento) {
    document.querySelector('.' + elemento).classList.remove('oculto')
}


