const botonAsync = document.querySelector(".btn-async");
const contenedor2 = document.querySelector(".resultado");
const estado2 = document.querySelector("#estado");

function mostrarEstado(texto,color){
    estado2.textContent = texto;
    estado2.style.color = color;
}

async function obtenerFotosAsync(){

    mostrarEstado("Cargando con ASYNC/AWAIT...", "blue");

    contenedor2.innerHTML =
        `<div class="loader">Cargando imágenes...</div>`;

    try{

        const respuesta = await fetch("datos.json");
        const datos = await respuesta.json();

        contenedor2.innerHTML="";

        datos.forEach(foto=>{
            contenedor2.innerHTML += `
            <div class="col-md-4 col-lg-3">
                <div class="card h-100 shadow border-primary">
                    <img src="${foto.url}" class="card-img-top img-galeria">
                    <div class="card-body">
                        <h5>${foto.titulo}</h5>
                        <p class="small text-muted">${foto.descripcion}</p>
                    </div>
                </div>
            </div>`;
        });

        mostrarEstado("Galería cargada usando ASYNC/AWAIT ✅","blue");

    }catch(error){
        console.error(error);
    }
}

botonAsync.addEventListener("click", obtenerFotosAsync);