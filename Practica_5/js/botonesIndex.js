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
function siONo() {
  let siBoton = document.getElementById("si");
  let noBoton = document.getElementById("no");

  siBoton.addEventListener("click", function() {
    window.location.href = "carga.html?origen=index";
  });
  noBoton.addEventListener("click", function() {
    Textos("confirmarTexto");
  });
}
siONo();