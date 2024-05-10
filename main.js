let ciudadGuardada = "Soledad";
let medidaGuardada = "metric";

let contenedorGlobal = document.getElementById("contenedor-global");
let contenedorInicial = document.getElementById("contenedor-inicial");

let contenedorBusqueda = document.getElementById("contenedor-busqueda");
let btnAbrirBuscador = document.getElementById("btnAbrir-buscador");
let btnCerrarBuscador = document.getElementById("btnCerrar-buscador");
let busquedaButton = document.getElementById("busqueda-button");

let infoCiudad = document.getElementById("info-ciudad");
let infoBandera = document.getElementById("info-bandera");

let btnUbicacionActual = document.getElementById("btnUbicacion-actual");

let btnMedidaCelcius = document.getElementById("medida-celcius");
let btnMedidaFarenhait = document.getElementById("medida-farenhait");

window.addEventListener("load", () => {
  cargarUbicacionActual();
});

btnAbrirBuscador.addEventListener("click", () => {
  contenedorBusqueda.classList.toggle("contenedor-busqueda_visible");
});

btnCerrarBuscador.addEventListener("click", () => {
  contenedorBusqueda.classList.toggle("contenedor-busqueda_visible");
});

btnUbicacionActual.addEventListener("click", () => {
  cargarUbicacionActual();
});

busquedaButton.addEventListener("click", () => {
  let BusquedaCiudad = document.getElementById("busqueda-input");
  buscarCiudad(BusquedaCiudad.value, medidaGuardada);
  contenedorBusqueda.classList.toggle("contenedor-busqueda_visible");
  BusquedaCiudad.value = "";
});

btnMedidaCelcius.addEventListener("click", () => {
  medidaGuardada = "metric";
  btnMedidaCelcius.classList.toggle("detalles-Medida_activo");
  btnMedidaFarenhait.classList.toggle("detalles-Medida_activo");
  buscarCiudad(ciudadGuardada, medidaGuardada);
});

btnMedidaFarenhait.addEventListener("click", () => {
  medidaGuardada = "imperial";
  btnMedidaCelcius.classList.toggle("detalles-Medida_activo");
  btnMedidaFarenhait.classList.toggle("detalles-Medida_activo");
  buscarCiudad(ciudadGuardada, medidaGuardada);
});

const buscarCiudad = (nombre = "soledad", medida = "metric") => {
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${nombre}&appid=16863400d4371d275212a608f6ff4867`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      cargarDatos(data.coord.lat, data.coord.lon, medida);
      cargarUbicacion(data.name, data.sys.country);
    })
    .catch((error) => {
      alert(
        `Sin resultados para la busqueda: ${nombre}\nverifique e intente nuevamente`
      );
      console.log(error);
    });
};

const cargarDatos = (lat = 10.9184, lon = -74.7646, medida = "metric") => {
  let infoFecha = document.getElementById("info-fecha");

  let fecha = new Date();
  let dia = fecha.getDate();
  let diaSemana = fecha.getDay();
  let mes = fecha.getMonth();
  let year = fecha.getFullYear();

  infoFecha.textContent = `Hoy - ${trasformarDiaSemana(diaSemana)}, ${dia} ${trasformarMes(mes)} ${year}`;

  const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,alerts&lang=es&units=${medida}&appid=16863400d4371d275212a608f6ff4867`;

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      let infoIcon = document.getElementById("info-icon");
      let infoTemperatura = document.getElementById("info-temperatura");
      let infoClima = document.getElementById("info-clima");
      let datoHumedad = document.getElementById("dato-humedad");
      let datoVisibilidad = document.getElementById("dato-visibilidad");
      let datoPresion = document.getElementById("dato-presion");
      let datoViento = document.getElementById("dato-viento");
      let contenedorDias = document.getElementById("contenedor-detalles-dias");

      let clima = data.current.weather[0].description;
      infoClima.textContent = clima.charAt(0).toUpperCase() + clima.slice(1);
      infoIcon.src = `icons/${asignarIcono(data.current.weather[0].main)}`;
      datoHumedad.textContent = `${data.current.humidity}%`;
      datoVisibilidad.textContent = `${Math.round(data.current.visibility / 1000)} km`;
      datoPresion.textContent = `${data.current.pressure} hPa`;

      if (medida === "imperial") {
        infoTemperatura.textContent = `${Math.round(data.current.temp)}°F`;
        datoViento.textContent = `${data.current.wind_speed} mph`;
      } else {
        infoTemperatura.textContent = `${Math.round(data.current.temp)}°C`;
        datoViento.textContent = `${data.current.wind_speed} m/s`;
      }
      contenedorDias.innerHTML = `
      <div class="detalles-dia">
        <span class="detalles-dia-fecha">Mañana</span>
        <img src="icons/${asignarIcono(data.daily[1].weather[0].main)}" alt="clima" class="detalles-dia-icono">
        <div class="detalles-dia-temperatura">
          <span>${Math.round(data.daily[1].temp.min)}°</span>
          <span>${Math.round(data.daily[1].temp.max)}°</span>
        </div>
      </div>
      <div class="detalles-dia">
        <span class="deatils-day-date">${calcularFecha(year,mes,dia + 2)}</span>
        <img src="icons/${asignarIcono(data.daily[1].weather[0].main)}" alt="clima" class="detalles-dia-icono">
        <div class="detalles-dia-temperatura">
          <span>${Math.round(data.daily[2].temp.min)}°</span>
          <span>${Math.round(data.daily[2].temp.max)}°</span>
        </div>
      </div>
      <div class="detalles-dia">
        <span class="deatils-day-date">${calcularFecha(year,mes,dia + 3)}</span>
        <img src="icons/${asignarIcono(data.daily[1].weather[0].main)}" alt="clima" class="detalles-dia-icono">
        <div class="detalles-dia-temperatura">
          <span>${Math.round(data.daily[3].temp.min)}°</span>
          <span>${Math.round(data.daily[3].temp.max)}°</span>
        </div>
      </div>
      <div class="detalles-dia">
        <span class="deatils-day-date">${calcularFecha(year,mes,dia + 4)}</span>
        <img src="icons/${asignarIcono(data.daily[1].weather[0].main)}" alt="clima" class="detalles-dia-icono">
        <div class="detalles-dia-temperatura">
          <span>${Math.round(data.daily[4].temp.min)}°</span>
          <span>${Math.round(data.daily[4].temp.max)}°</span>
        </div>
      </div>
      <div class="detalles-dia">
        <span class="deatils-day-date">${calcularFecha(year,mes,dia + 5)}</span>
        <img src="icons/${asignarIcono(data.daily[1].weather[0].main)}" alt="clima" class="detalles-dia-icono">
        <div class="detalles-dia-temperatura">
          <span>${Math.round(data.daily[5].temp.min)}°</span>
          <span>${Math.round(data.daily[5].temp.max)}°</span>
        </div>
      </div>
      `;
    })
    .catch((error) => {
      console.log(error);
    });
};

const cargarUbicacion = (ciudad, pais) => {
  let urlBandera = `https://restcountries.com/v3.1/alpha/${pais}`;
  fetch(urlBandera)
    .then((response) => response.json())
    .then((flag) => {
      ciudadGuardada = ciudad;
      infoCiudad.textContent = `${ciudad}, ${pais}`;
      infoBandera.src = flag[0].flags.svg;
    })
    .catch((error) => {
      console.log(error);
    });
};

const encontrarUbicacionActual = (lat, lon) => {
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=16863400d4371d275212a608f6ff4867`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      cargarUbicacion(data.name, data.sys.country);
    });
};

const cargarUbicacionActual = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        let lon = position.coords.longitude;
        let lat = position.coords.latitude;
        encontrarUbicacionActual(lat, lon);
        cargarDatos(lat, lon, medidaGuardada);
        contenedorGlobal.style.display = "flex";
        contenedorInicial.style.display = "none";
      },
      (error) => {
        console.log(error);
        alert(
          "No se ha otorgado el permisos para acceder a tu ubicación actual.\nSe ha cargado una ciudad por defecto."
        );
        buscarCiudad(ciudadGuardada, medidaGuardada);
        contenedorGlobal.style.display = "flex";
        contenedorInicial.style.display = "none";
      }
    );
  } else {
    alert(
      "El navegador no ofrece soporte a la función de geolocalización.\nSe ha cargado una ciudad por defecto."
    );
    buscarCiudad(ciudadGuardada, medidaGuardada);
    contenedorGlobal.style.display = "flex";
    contenedorInicial.style.display = "none";
  }
};

const calcularFecha = (year, mes, dia) => {
  let date = new Date(year, mes, dia);
  return `${trasformarDiaSemana(date.getDay())}, ${date.getDate()} ${trasformarMes(date.getMonth())}`;
};

const asignarIcono = (clima) => {
  switch (clima) {
    case "Thunderstorm":
      return "thunderstorm.svg";
    case "Drizzle":
      return "drizzle.svg";
    case "Rain":
      return "rain.svg";
    case "Snow":
      return "snow.svg";
    case "Clear":
      return "clear-day.svg";
    case "Atmosphere":
      return "atmosphere.svg";
    case "Clouds":
      return "clouds.svg";
    default:
      return "clear-day.svg";
  }
};

const trasformarDiaSemana = (diaSemana) => {
  switch (diaSemana) {
    case 0:
      return "Dom";
    case 1:
      return "Lun";
    case 2:
      return "Mar";
    case 3:
      return "Mie";
    case 4:
      return "Jue";
    case 5:
      return "Vie";
    case 6:
      return "Sab";
    default:
      return "0";
  }
};

const trasformarMes = (mes) => {
  switch (mes) {
    case 0:
      return "Ene";
    case 1:
      return "Feb";
    case 2:
      return "Mar";
    case 3:
      return "Abr";
    case 4:
      return "May";
    case 5:
      return "jun";
    case 6:
      return "Jul";
    case 7:
      return "Ago";
    case 8:
      return "Sep";
    case 9:
      return "Oct";
    case 10:
      return "Nov";
    case 11:
      return "Dic";
    default:
      return "0";
  }
};
