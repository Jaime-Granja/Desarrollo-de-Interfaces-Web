const params = new URLSearchParams(window.location.search);
const origen = params.get("origen");

if (origen === "index") {
    setTimeout(function() {
        window.location.href = "juego.html";
    }, 3000);
} else if (origen === "juego") {
    setTimeout(function() {
        window.location.href = "index.html";
    }, 3000);
}
