class Almacenamiento {

  constructor(){
    this.ubicacion;
    this.ubicacionDefault = "Buenos Aires,ar";
  }
  
/**
 * esta funcion revisa si ya existe algo dentro del almacenamiento local.
 * si ya hay un valor, lo devuelve, si no lo hay, le asigna un valor por default
 */
  traerUbicacion() {
    if (localStorage.getItem("ubicacion") === null){
        this.ubicacion = this.ubicacionDefault;
    }
    else{
      this.ubicacion = localStorage.getItem("ubicacion");
    }
    return {ubicacion: this.ubicacion};
    
  }

  

  //guarda en almacenamiento local el valor asociado a la key.  
  guardarEnAlm(key, value) {
    localStorage.setItem(key, value);
  }
}
