// https://v6.exchangerate-api.com/v6/475615bb6d77e2ed59770143/latest/USD   --- Obtener Ultimo
// https://v6.exchangerate-api.com/v6/475615bb6d77e2ed59770143/history/USD/2020/05/01  --- Historico - Plan pago


function fetchExchange(moneda = 'ARS'){
    fetch (`https://v6.exchangerate-api.com/v6/475615bb6d77e2ed59770143/latest/${moneda}`)
    .then((resultado) => resultado.json())
    .then((datos) =>  {
        Object.keys(datos.conversion_rates).forEach( moneda => {
            agregarRegistrosEnTabla(moneda, datos.conversion_rates[moneda])
            agregarOpcionesMoneda(moneda)
        })
        console.log(datos)
    })
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


  
