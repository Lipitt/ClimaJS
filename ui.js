class UI {
  //capturo elementos html en variables
  constructor() {
    this.ubicacion = document.getElementById("c-ubicacion");
    this.descripcion = document.getElementById("c-desc");
    this.temp = document.getElementById("c-temp");
    this.tempMin = document.getElementById("c-tempMin");
    this.tempMax = document.getElementById("c-tempMax");
    this.img = document.getElementById("c-img");
    this.senTermica = document.getElementById("c-senTermica");
    this.humedad = document.getElementById("c-humedad");
    this.presion = document.getElementById("c-presion");
    this.viento = document.getElementById("c-viento");
    this.visibilidad = document.getElementById("c-visibilidad");
  }
/*
esta funcion recibe los datos fetcheados por la api y los muestra en la UI
tomando los elementos html capturados y asignandole los valores recibidos.
varios de estos valores tienen que ser adaptados antes de mostrarse,
para esto uso varias funciones mas pequeñas
*/
  mostrarEnUI(datos) {
    this.ubicacion.innerHTML = `${datos.name}, ${datos.sys.country}`;
    this.descripcion.innerHTML = this.mayuscula(datos.weather[0].description);
    this.temp.innerHTML = `Temp: ${this.redondearTemp(datos.main.temp)}°`;
    this.tempMin.innerHTML = `Min: ${this.redondearTemp(datos.main.temp_min)}°`;
    this.tempMax.innerHTML = `Max: ${this.redondearTemp(datos.main.temp_max)}°`;
    this.img.setAttribute(
      "src",
      `http://openweathermap.org/img/w/${datos.weather[0].icon}.png`
    );
    this.senTermica.innerHTML = `Sensacion Termica: ${this.redondearTemp(
      datos.main.feels_like
    )}°`;
    this.humedad.innerHTML = `Humedad: ${datos.main.humidity}%`;
    this.presion.innerHTML = `Presion: ${datos.main.pressure} hPa`;
    this.viento.innerHTML = `Viento: ${this.convertirViento(
      datos.wind.speed
    )} KM/H`;
    this.visibilidad.innerHTML = `Visibilidad: ${this.redondearVis(
      datos.visibility
    )} KM`;
  }
  //Redondea temperatura y solo permite un decimal.
  redondearTemp(temp) {
    return Math.round(temp * 10) / 10;
  }
  //pasa el valor que recibe a KM
  redondearVis(vis) {
    return vis / 1000;
  }
  //Pasa a mayuscula la primera letra del string que recibe
  mayuscula(desc) {
    return desc.charAt(0).toUpperCase() + desc.slice(1);
  }
  //Convierte el valor que recibe(m/s) a KM/H
  convertirViento(viento) {
    return Math.round(viento * 3.6 * 10) / 10;
  }
  

  /*muestro mensaje de alerta. recibe el mensaje a mostrar y una clase de bootstrap.
    la alerta consiste de crear un div con el mensaje y clase recibidos y agregarlo
    a la interfaz. este div desaparece solo en 3 segundos.
    si ya hay una alerta, la borra para evitar duplicacion
  */
  mostrarAlerta(msj, clase) {
    this.removerAlerta();
    const divAlerta = document.createElement("div");
    divAlerta.className = clase;
    divAlerta.appendChild(document.createTextNode(msj));
    document.getElementById("c-detalles").prepend(divAlerta);

    
    setTimeout(() => {
      this.removerAlerta();
    }, 3000);
  }
  //funcion para quitar la alerta
  removerAlerta() {
    const msjAlerta = document.querySelector(".alert");
    if (msjAlerta) {
      msjAlerta.remove();
    }
  }
}
