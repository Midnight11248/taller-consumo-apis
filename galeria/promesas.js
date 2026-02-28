const botonPromesas = document.querySelector(".btn-promesas");
const contenedor = document.querySelector(".resultado");
const estado = document.querySelector("#estado");

function mostrarEstado(texto,color){
    estado.textContent = texto;
    estado.style.color = color;
}

function mostrarFotos(fotos){

    contenedor.innerHTML="";

    fotos.forEach(foto=>{
        contenedor.innerHTML += `
        <div class="col-md-4 col-lg-3">
            <div class="card h-100 shadow">
                <img src="${foto.url}" class="card-img-top img-galeria">
                <div class="card-body">
                    <h5>${foto.titulo}</h5>
                    <p class="small text-muted">${foto.descripcion}</p>
                </div>
            </div>
        </div>`;
    });
}

function obtenerFotosPromesas(){

    mostrarEstado("Cargando con PROMESAS...", "green");

    contenedor.innerHTML =
        `<div class="loader">Cargando imágenes...</div>`;

    fetch("datos.json")
        .then(res=>res.json())
        .then(datos=>{
            mostrarFotos(datos);
            mostrarEstado("Galería cargada usando PROMESAS ✅","green");
        })
        .catch(error=>console.error(error));
}

botonPromesas.addEventListener("click", obtenerFotosPromesas);