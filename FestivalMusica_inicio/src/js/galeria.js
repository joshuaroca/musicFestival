document.addEventListener("DOMContentLoaded", function () {
    crearGaleria()
})

function crearGaleria() {
    const galeria = document.querySelector(".galeria-imagenes");
    for (let i = 1; i <= 12; i++) {
        const imagen = document.createElement("IMG");
        imagen.src = `build/img/thumb/${i}.jpg`
        imagen.dataset.imagenId = i;


        imagen.onclick = mostrarImagen;

        const lista = document.createElement("LI");
        lista.appendChild(imagen);

        galeria.appendChild(lista);

    }
}

function mostrarImagen(event) {
    const id = parseInt(event.target.dataset.imagenId)
    //   generar la imagen
    const imagen = document.createElement("IMG")
    imagen.src = `build/img/grande/${id}.jpg`

    //agregarla a un div
    const overlay = document.createElement("DIV");
    overlay.appendChild(imagen);
    overlay.classList.add('overlay');

    //boton para cerrar la imagen 
    const cerrarImgen = document.createElement("P")
    cerrarImgen.textContent = "X"
    cerrarImgen.classList.add("btnCerrar");

    //cuando se da click cerrar la imagen tambien
    overlay.onclick = function () {
        overlay.remove();
    }

    //cuando se precione el btn cerrar la img 
    cerrarImgen.onclick = function () {
        overlay.remove();
    }

    overlay.appendChild(cerrarImgen);

    //mostrarla en html
    const body = document.querySelector("body");
    body.appendChild(overlay);
    body.classList.add("fijarBody")
}