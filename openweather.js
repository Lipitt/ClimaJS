class OpenWeather {

  constructor(){
    /*
    la api key queda vacia porque es imposible ocultarla sin que la app use algun framework de
    front end (angular, react, vue.js) y la intencion es que sea solo vanilla javascript.
    sin mencionar que incluso usando un framework, no estaria 100% oculta ya que es una aplicacion que 
    no tiene servidor.
     */
    this.apiKey = "";
  }

  //esta funcion fetchea los datos de la api y los devuelve despues de pasarlos a objetos.
  async traerClima(ubicacion) {
    const respuesta = await fetch(
      `http://api.openweathermap.org/data/2.5/weather?q=${ubicacion}&appid=${this.apiKey}&units=metric&lang=es`
    );
    const respuestaDatos = await respuesta.json();
    return {
      respuestaDatos
    };
  }
}
