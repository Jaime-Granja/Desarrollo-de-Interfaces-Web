const params = new URLSearchParams(window.location.search);
const destino = params.get("destino");
 carga = setTimeout(function() {
    window.location.href = destino;}, 4000);
 if (destino == "juegoRetry") {
    setTimeout(function() {
    window.location.href = "juego.html";}, 2000);
    clearTimeout(carga)
 }