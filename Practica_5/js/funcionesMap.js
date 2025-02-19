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
    //Y aquí creamos el tesoro, este sería un componente web una vez lo cambie.
  let elemento = document.createElement("div");
  elemento.classList.add("treasure");
  elemento.textContent = "X";

  elemento.style.position = "absolute";
  elemento.style.top = `${filaAleatoria * tamanoCeldaAlto}px`;
  elemento.style.left = `${columnaAleatoria * tamanoCeldaAncho}px`;
  elemento.style.width = `${tamanoCeldaAncho}px`;
  elemento.style.height = `${tamanoCeldaAlto}px`;

  elemento.style.opacity = "0";

  grid.appendChild(elemento);
  console.log("Columna: ", columnaAleatoria)
  console.log("Fila: ", filaAleatoria)

  function mostrarTesoro() {
    elemento.style.opacity = "1";
  }

  elemento.addEventListener("click", function () {
    if (!tesoroEncontrado) {
      alert("¡Has encontrado el tesoro! ¡Felicidades!");
      mostrarTesoro(); 
      tesoroEncontrado = true;
      let cofre = document.getElementById("cofre")
      cofre.style.display = "block"
      let brujula = document.getElementById("brujula")
      brujula.style.display = "none"  
    }
  });

  let anguloBrujula = 0; // Ángulo actual de la brújula
    let animacionBrujula; // Variable para almacenar la animación en curso

    // Dirección del tesoro
    let direccionTesoro = ""; // Inicialmente no sabemos la dirección del tesoro

    function actualizarDireccionTesoro(filaClickeada, columnaClickeada) {
    // Determinar la dirección con la lógica que ya tienes
    if (filaClickeada !== filaAleatoria || columnaClickeada !== columnaAleatoria) {
        if (filaClickeada > filaAleatoria) {
            if (columnaClickeada > columnaAleatoria) {
                direccionTesoro = "NW";
            } else if (columnaClickeada < columnaAleatoria) {
                direccionTesoro = "NE";
            } else {
                direccionTesoro = "N";
            }
        } else if (filaClickeada < filaAleatoria) {
            if (columnaClickeada > columnaAleatoria) {
                direccionTesoro = "SW";
            } else if (columnaClickeada < columnaAleatoria) {
                direccionTesoro = "SE";
            } else {
                direccionTesoro = "S";
            }
        } else if (filaClickeada == filaAleatoria) {
            if (columnaClickeada > columnaAleatoria) {
                direccionTesoro = "W";
            } else if (columnaClickeada < columnaAleatoria) {
                direccionTesoro = "E";
            }
        }
    }
}

// Función para actualizar el giro de la brújula en base a la dirección
function actualizarAnguloBrujula() {
    let anguloObjetivo = 0;

    // Mapeamos las direcciones a valores de rotación
    switch (direccionTesoro) {
        case "N":
            anguloObjetivo = 0; // Norte
            break;
        case "NE":
            anguloObjetivo = 45; // Noreste
            break;
        case "E":
            anguloObjetivo = 90; // Este
            break;
        case "SE":
            anguloObjetivo = 135; // Sureste
            break;
        case "S":
            anguloObjetivo = 180; // Sur
            break;
        case "SW":
            anguloObjetivo = 225; // Suroeste
            break;
        case "W":
            anguloObjetivo = 270; // Oeste
            break;
        case "NW":
            anguloObjetivo = 315; // Noroeste
            break;
        default:
            anguloObjetivo = 0; // Default (no hay dirección)
            break;
    }

    // Animar el giro de la brújula hacia el ángulo objetivo
    girarBrujula(anguloObjetivo);
}

// Función para animar el giro de la brújula
function girarBrujula(anguloObjetivo) {
    // Cancelar cualquier animación anterior
    if (animacionBrujula) {
        cancelAnimationFrame(animacionBrujula);
    }

    // Función para animar el giro suavemente
    function animar() {
        let diferencia = (anguloObjetivo - anguloBrujula + 180) % 360 - 180;

        // Suavizar la transición: hacer que el ángulo de la brújula se acerque al ángulo objetivo
        anguloBrujula += diferencia * 0.1; // Controlar la velocidad del giro

        // Actualizar la rotación de la brújula
        brujula.style.transform = `rotate(${anguloBrujula}deg)`;

        // Continuar la animación hasta que la brújula haya alcanzado el ángulo objetivo
        if (Math.abs(diferencia) > 1) {
            animacionBrujula = requestAnimationFrame(animar);
        }
    }

    // Iniciar la animación
    animacionBrujula = requestAnimationFrame(animar);
}

// Función que maneja los clics en el mapa
function manejarClic(e) {
    if (tesoroEncontrado) return;

    let x = e.offsetX;
    let y = e.offsetY;

    let columnaClickeada = Math.floor(x / tamanoCeldaAncho);
    let filaClickeada = Math.floor(y / tamanoCeldaAlto);

    // Actualizar la dirección del tesoro
    actualizarDireccionTesoro(filaClickeada, columnaClickeada);

    // Si no se ha encontrado el tesoro, actualizar la brújula
    if (direccionTesoro) {
        actualizarAnguloBrujula();
    }

    if (filaClickeada !== filaAleatoria || columnaClickeada !== columnaAleatoria) {
        let xRoja = document.createElement("div");
        xRoja.classList.add("x-roja");
        xRoja.textContent = direccionTesoro;

        xRoja.style.top = `${filaClickeada * tamanoCeldaAlto}px`;
        xRoja.style.left = `${columnaClickeada * tamanoCeldaAncho}px`;

        grid.appendChild(xRoja);

        contadorErrores++;
        contadorErroresElem.textContent = contadorErrores;
    }
}

grid.addEventListener("click", manejarClic);

  grid.addEventListener("click", manejarClic);
});