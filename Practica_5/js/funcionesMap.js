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
  const grid = document.getElementById("grid");
  const filas = 21;
  const columnas = 17;
  let contadorErrores = 0;
  let tesoroEncontrado = false;

  const contadorErroresElem = document.getElementById("contadorErrores");

  const rect = grid.getBoundingClientRect();
  const tamanoCeldaAncho = rect.width / columnas;
  const tamanoCeldaAlto = rect.height / filas;

  let filaAleatoria = Math.floor(Math.random() * filas);
  let columnaAleatoria = Math.floor(Math.random() * columnas);

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
    }
  });

  function manejarClic(e) {
    if (tesoroEncontrado) return;

    let x = e.offsetX;
    let y = e.offsetY;

    let columnaClickeada = Math.floor(x / tamanoCeldaAncho);
    let filaClickeada = Math.floor(y / tamanoCeldaAlto);

    if (filaClickeada !== filaAleatoria || columnaClickeada !== columnaAleatoria) {
      let xRoja = document.createElement("div");
      xRoja.classList.add("x-roja");
      if (filaClickeada > filaAleatoria) {
        if (columnaClickeada > columnaAleatoria) {
          xRoja.textContent = "NW";
        } else if (columnaClickeada < columnaAleatoria) {
          xRoja.textContent = "NE"
        } else if (columnaClickeada == columnaAleatoria) {
          xRoja.textContent = "N"
        }
      } else if (filaClickeada < filaAleatoria) {
        if (columnaClickeada > columnaAleatoria) {
          xRoja.textContent = "SW";
        } else if (columnaClickeada < columnaAleatoria) {
          xRoja.textContent = "SE"
        } else if (columnaClickeada == columnaAleatoria) {
          xRoja.textContent = "S"
        }
      } else if (filaClickeada == filaAleatoria) {
        if (columnaClickeada > columnaAleatoria) {
          xRoja.textContent = "W";
        } else if (columnaClickeada < columnaAleatoria) {
          xRoja.textContent = "E" 
      }
    }
      xRoja.style.top = `${filaClickeada * tamanoCeldaAlto}px`;
      xRoja.style.left = `${columnaClickeada * tamanoCeldaAncho}px`;

      grid.appendChild(xRoja);

      contadorErrores++;
      contadorErroresElem.textContent = contadorErrores;
    }
  }

  grid.addEventListener("click", manejarClic);
});