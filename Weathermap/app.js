const apiKey = "dd4142cca8f3898f05b5cd08e2dd8df3";

const btn = document.getElementById("buscar");
const input = document.getElementById("ciudad");

/* =========================
   BUSCAR CLIMA
========================= */
async function checkWeather(city){

    if(!city) return;

    const url =
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=es`;

    const response = await fetch(url);
    const data = await response.json();

    if(data.cod != 200){
        document.getElementById("error").textContent="Ciudad no encontrada";
        document.getElementById("weather").style.display="none";
        return;
    }

    /* ===== DATOS ===== */
    document.querySelector(".city").textContent = data.name;
    document.querySelector(".temp").textContent =
        Math.round(data.main.temp)+"°C";

    document.querySelector(".description").textContent =
        data.weather[0].description;

    document.querySelector(".feels").textContent =
        Math.round(data.main.feels_like)+"°C";

    document.querySelector(".min").textContent =
        Math.round(data.main.temp_min)+"°C";

    document.querySelector(".max").textContent =
        Math.round(data.main.temp_max)+"°C";

    document.querySelector(".humidity").textContent =
        data.main.humidity+"%";

    document.querySelector(".wind").textContent =
        data.wind.speed+" km/h";

    /* ===== ICONO ===== */
    const icon = document.querySelector(".weather-icon");
    const clima = data.weather[0].main;

    if(clima=="Clear") icon.src="img/clear.png";
    else if(clima=="Clouds") icon.src="img/clouds.png";
    else if(clima=="Rain") icon.src="img/rain.png";
    else if(clima=="Drizzle") icon.src="img/drizzle.png";
    else if(clima=="Mist") icon.src="img/mist.png";
    else if(clima=="Snow") icon.src="img/snow.png";

    /* ===== FONDO DINÁMICO (AHORA CORRECTO) ===== */

    let fondo = "";

    if(clima=="Clear")
        fondo="https://images.unsplash.com/photo-1501973801540-537f08ccae7b";

    else if(clima=="Clouds")
        fondo="https://images.unsplash.com/photo-1499346030926-9a72daac6c63";

    else if(clima=="Rain" || clima=="Drizzle")
        fondo="https://images.unsplash.com/photo-1501696461415-6bd6660c6742";

    else if(clima=="Mist")
        fondo="https://images.unsplash.com/photo-1485236715568-ddc5ee6ca227";

    else if(clima=="Snow")
        fondo="https://images.unsplash.com/photo-1483664852095-d6cc6870702d";

    document.body.style.background =
        `url(${fondo}) center/cover no-repeat fixed`;

    document.getElementById("weather").style.display="block";
    document.getElementById("error").textContent="";

    cargarPronostico(city);
}

/* =========================
   PRONÓSTICO 5 DÍAS
========================= */
async function cargarPronostico(city){

    const url =
    `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric&lang=es`;

    const response = await fetch(url);
    const data = await response.json();

    const forecastDiv = document.getElementById("forecast");
    forecastDiv.innerHTML="";

    for(let i=0;i<5;i++){

        const item = data.list[i*8];

        const dia = new Date(item.dt_txt)
            .toLocaleDateString("es-ES",{weekday:"short"});

        forecastDiv.innerHTML += `
            <div>
                <p>${dia}</p>
                <p>${Math.round(item.main.temp)}°C</p>
            </div>
        `;
    }
}

/* =========================
   EVENTOS
========================= */

btn.addEventListener("click",()=>{
    checkWeather(input.value);
});

/* ENTER = BUSCAR */
input.addEventListener("keypress",(e)=>{
    if(e.key==="Enter"){
        checkWeather(input.value);
    }
});