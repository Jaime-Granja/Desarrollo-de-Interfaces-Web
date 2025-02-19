//Botón para volver a Índice
let retroceder = document.getElementById("goBack");
retroceder.addEventListener("click", function() {
  window.location.href = "carga.html?destino=index.html";
});
//Botón para reintentar
let reintentar = document.getElementById("retry");
reintentar.addEventListener("click", function() {
  window.location.href = "carga.html?destino=juegoRetry";
});
//Función para crear el tesoro de forma aleatoria y comprobar el juego.
document.addEventListener("DOMContentLoaded", function () {
    //Lo primero que hacemos es definir el grid y definir el boolean para encontrar el tesoro y el número de intentos.
  const grid = document.getElementById("grid");
  const filas = 21;
  const columnas = 17;
  let contadorErrores = 0;
  let tesoroEncontrado = false;

  const contadorErroresElem = document.getElementById("contadorErrores");
    //Con esta función mediremos cuánto ocupa cada fila y columna, para que así los elementos colocados estén bien ubicados.
  const rect = grid.getBoundingClientRect();
  const tamanoCeldaAncho = rect.width / columnas;
  const tamanoCeldaAlto = rect.height / filas;
    //Ahora establecemos dónde va a estar nuestro tesoro.
  let filaAleatoria = Math.floor(Math.random() * filas);
  let columnaAleatoria = Math.floor(Math.random() * columnas);
    //Y aquí creamos el componente web del tesoro, lo llamaremos mi-tesoro
    class Tesoro extends HTMLElement {
        constructor() {
          super(); 
          this.attachShadow({mode: 'open'}); 
        }
        connectedCallback() {
          this.shadowRoot.innerHTML = `
            <style>
              div {
                position: absolute;
                pointer-events: auto;
              }
            </style>
            <div>X</div>
          `;
        }
      }
      customElements.define('mi-tesoro', Tesoro);
      let elemento = document.createElement("mi-tesoro");
      elemento.classList.add("treasure");
      elemento.style.top = `${filaAleatoria * tamanoCeldaAlto}px`;
      elemento.style.left = `${columnaAleatoria * tamanoCeldaAncho}px`;
      elemento.style.width = `${tamanoCeldaAncho}px`;
      elemento.style.height = `${tamanoCeldaAlto}px`;
      elemento.style.zIndex = -2;
      
      // Añadimos el componente web al contenedor grid
      grid.appendChild(elemento);
      
      // Pasamos por consola la posición del tesoro para testearlo de forma más fácil.
      console.log("Columna: ", columnaAleatoria);
      console.log("Fila: ", filaAleatoria);
      
      function mostrarTesoro() {
        elemento.style.opacity = "1";
        elemento.style.zIndex = "10";
      }
  function verificarTesoro(filaClickada, columnaClickada) {
    return new Promise((resolve, reject) => {
      if (filaClickada === filaAleatoria && columnaClickada === columnaAleatoria) {
        resolve();
      } else {
        reject();
      }
    });
  }
    //Aquí tenemos lo que ocurre si se encuentra el tesoro.

    let anguloBrujula = 0;
    let animacionBrujula;
    let direccionTesoro = "";
    //Con esta función sabremos en qué dirección está el tesoro y giraremos la brújula.
    function actualizarDireccionTesoro(filaClickada, columnaClickada) {
        if (filaClickada !== filaAleatoria || columnaClickada !== columnaAleatoria) {
            if (filaClickada > filaAleatoria) {
                if (columnaClickada > columnaAleatoria) {
                    direccionTesoro = "NW";
                    anguloObjetivo = 315;
                } else if (columnaClickada < columnaAleatoria) {
                    direccionTesoro = "NE";
                    anguloObjetivo = 45;
                } else {
                    direccionTesoro = "N";
                    anguloObjetivo = 0;
                }
            } else if (filaClickada < filaAleatoria) {
                if (columnaClickada > columnaAleatoria) {
                    direccionTesoro = "SW";
                    anguloObjetivo = 225;
                } else if (columnaClickada < columnaAleatoria) {
                    direccionTesoro = "SE";
                    anguloObjetivo = 135;
                } else {
                    direccionTesoro = "S";
                    anguloObjetivo = 180;
                }
            } else if (filaClickada == filaAleatoria) {
                if (columnaClickada > columnaAleatoria) {
                    direccionTesoro = "W";
                    anguloObjetivo = 270;
                } else if (columnaClickada < columnaAleatoria) {
                    direccionTesoro = "E";
                    anguloObjetivo = 90;
                }
            }
        }
        girarBrujula(anguloObjetivo);
        return direccionTesoro;
    }
    // Función para animar el giro de la brújula
    function girarBrujula(anguloObjetivo) {
        if (animacionBrujula) {
            cancelAnimationFrame(animacionBrujula);
        }
        function animar() {
            let diferencia = (anguloObjetivo - anguloBrujula + 180) % 360 - 180;
            anguloBrujula += diferencia * 0.1;
            brujula.style.transform = `rotate(${anguloBrujula}deg)`;
            // Continuar la animación hasta que la brújula haya alcanzado el ángulo objetivo
            if (Math.abs(diferencia) > 1) {
                animacionBrujula = requestAnimationFrame(animar);
            }
        }
        // Iniciar la animación
        animacionBrujula = requestAnimationFrame(animar);
    }
    // Función que maneja los clicks en el mapa y ejecuta la promesa
    function manejarClic(e) {
        if (tesoroEncontrado) return;
        let x = e.offsetX;
        let y = e.offsetY;
        let columnaClickada = Math.floor(x / tamanoCeldaAncho);
        let filaClickada = Math.floor(y / tamanoCeldaAlto);
        let direccion = actualizarDireccionTesoro(filaClickada, columnaClickada); 
        verificarTesoro(filaClickada, columnaClickada)
        .then(()=> {
            mostrarTesoro();
            tesoroEncontrado = true;
            let cofre = document.getElementById("cofre")
            cofre.style.display = "block"
            let brujula = document.getElementById("brujula")
            brujula.style.display = "none"
            let titulo = document.getElementById("titulo")
            titulo.style.display = "none"
            let felicitacion = document.getElementById("felicitacion")
            felicitacion.style.display = "block"
        })
        .catch(() => {
            let fallo = document.createElement("div");
            fallo.classList.add("fallo");
            fallo.textContent = direccionTesoro;
            fallo.style.top = `${filaClickada * tamanoCeldaAlto}px`;
            fallo.style.left = `${columnaClickada * tamanoCeldaAncho}px`;
            grid.appendChild(fallo);
            contadorErrores++;
            contadorErroresElem.textContent = contadorErrores;
        });
    }
    //Llamada a la función manejarClic
    grid.addEventListener("click", manejarClic);
});
