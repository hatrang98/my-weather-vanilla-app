function showTime(timestamp) {
  let now = new Date(timestamp * 1000);
  let hour = now.getHours();
  let day = now.getDay();
  let minute = now.getMinutes();
  if (minute < 10) {
    minute = `0${minute}`;
  }
  if (hour < 10) {
    hour = `0${hour}`;
  }
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  return `${days[day]} ${hour}: ${minute}`;
}
let tempC = null;
function showTemp(response) {
  console.log(response.data);
  degreeC.classList.add("active");
  degreeF.classList.remove("active");
  let tempElement = document.querySelector("#temp");
  tempElement.innerHTML = Math.round(response.data.main.temp);
  tempC = response.data.main.temp;
  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = response.data.name;
  let descriptionElement = document.querySelector("#description");
  descriptionElement.innerHTML = response.data.weather[0].description;
  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = `Humidity: ${response.data.main.humidity} %`;
  let speedElement = document.querySelector("#speed");
  speedElement.innerHTML = response.data.wind.speed;
  let timeElement = document.querySelector("#currentTime");
  timeElement.innerHTML = showTime(response.data.dt);
  //add icon
  let iconUrl = `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`;
  let iconElement = document.querySelector("#weather-icon");
  iconElement.setAttribute("src", iconUrl);
  //ad forecast
  function showForecastDay(timestamp) {
    let date = new Date(timestamp * 1000);
    let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    let day = date.getDay();
    return days[day];
  }
  function showForecast(response) {
    console.log(response.data);
    let forecast = document.querySelector("#forecast");
    let forecastHTML = `<div class="row">`;
    response.data.daily.forEach(function (day, index) {
      if (index < 5) {
        forecastHTML =
          forecastHTML +
          `<div class="col-2 forecast-eachDay">
              <span class="forecast-date">${showForecastDay(day.dt)}</span>
              <br />
              <img
                src="http://openweathermap.org/img/wn/${
                  day.weather[0].icon
                }@2x.png"
                class="forecast-icon"
              />
              <br />
              <span class="temp-max">${Math.round(day.temp.max)}°</span>
              <span class="temp-min">${Math.round(day.temp.min)}°</span>
            </div>`;
      }
    });
    forecastHTML = forecastHTML + `</div>`;
    forecast.innerHTML = forecastHTML;
  }
  let apiKey = "634e0f286e83523b2a964bf9f5ac1617";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${response.data.coord.lat}&lon=${response.data.coord.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showForecast);
}

// add search
function showCity(city) {
  let apiKey = "634e0f286e83523b2a964bf9f5ac1617";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemp);
}
function enterCity(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#enter-city");
  showCity(cityInput.value);
}
let form = document.querySelector("#search-form");
form.addEventListener("submit", enterCity);

// degree conversion

showCity("Hanoi");

function showDegreeF(event) {
  event.preventDefault();
  let tempF = tempC * 1.8 + 32;
  let degree = document.querySelector("#temp");
  degree.innerHTML = Math.round(tempF);
  degreeC.classList.remove("active");
  degreeF.classList.add("active");
}

function showDegreeC(event) {
  event.preventDefault();
  let degree = document.querySelector("#temp");
  degree.innerHTML = Math.round(tempC);
  degreeC.classList.add("active");
  degreeF.classList.remove("active");
}
let degreeF = document.querySelector("#degreeF");
degreeF.addEventListener("click", showDegreeF);
let degreeC = document.querySelector("#degreeC");
degreeC.addEventListener("click", showDegreeC);
