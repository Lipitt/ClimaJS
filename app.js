//declaro variables, instancias de clases y eventos

const ow = new OpenWeather();
const ui = new UI();
const alm = new Almacenamiento();
const ciudad = document.getElementById("input-ciudad");
const pais = document.getElementById("input-pais");
const btnGuardar = document.getElementById("c-btnGuardar");
const ubicacion = alm.traerUbicacion().ubicacion;
btnGuardar.addEventListener("click", cambiarCiudad);
document.addEventListener("DOMContentLoaded", traerDatos);









/**
 * esta funcion trae los datos de la api y los muestra en la interfaz si la api no devuelve error.
 * tambien guarda la ubicacion en almacenamiento local
 * si devuelve error, muestra mensaje de alerta.
 */
function traerDatos(){
  ow.traerClima(ubicacion).then((data) => {
    if (data.respuestaDatos.cod === "404") {
      ui.mostrarAlerta("Ciudad no encontrada", "alert alert-danger");
    } else {
      ui.mostrarEnUI(data.respuestaDatos);
      alm.guardarEnAlm("ubicacion", ubicacion);
    }
  }).catch(err => console.log(err));
}


/**
 * esta funcion se ejecuta cuando se guarda una nueva ciudad
 * primero consulta si el input ciudad esta vacio (el input pais no es necesario)
 * si no esta vacio, asigna los valores de los inputs a ubicacion y se llama a 
 * la funcion traerDatos con ubicacion como parametro. 
 * si esta vacio, se muestra un mensaje de error
 */
function cambiarCiudad() {
 if (ciudad.value !== ""){
    ubicacion = `${ciudad.value},${pais.value}`;
    traerDatos(ubicacion);
 }else{
    ui.mostrarAlerta("Ingrese una ciudad", "alert alert-danger")
 }
}
