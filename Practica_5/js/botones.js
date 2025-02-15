// Función para ver tutorial o confirmar el entrar al juego
function Textos(idDiv) {
  let div = document.getElementById(idDiv);

  if (div.style.display === "block") {
    div.style.display = "none";
  } else {
    let divs = document.querySelectorAll("#tutorialTexto, #confirmarTexto");
    divs.forEach(function(div) {
      div.style.display = "none";
    });
    div.style.display = "block";
  }
}

let tutorialBoton = document.getElementById("tutorialBoton");
let confirmarBoton = document.getElementById("confirmarBoton");

tutorialBoton.addEventListener("click", function() {
  Textos("tutorialTexto");
});

confirmarBoton.addEventListener("click", function() {
  Textos("confirmarTexto");
});

// Ahora haremos las funciones de los botones sí y no.
let continuar = document.getElementById("si")
let retroceder = document.getElementById("no")

function Jugar(idButton) {
let Button = document.getElementById(idButton);

  
}
