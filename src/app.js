function showTime() {
  let now = new Date();
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
  timeElement.innerHTML = showTime();
  //add icon
  let iconUrl = `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`;
  let iconElement = document.querySelector("#weather-icon");
  iconElement.setAttribute("src", iconUrl);
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

// add forecast
let forecast = document.querySelector("#forecast");
let forecastHTML = `<div class="row">`;
let days = ["Mon", "Tue", "Wed", "Thu", "Fri"];
days.forEach(function (day) {
  forecastHTML =
    forecastHTML +
    `<div class="col-2 forecast-eachDay">
              <span class="forecast-date">${day}</span>
              <br />
              <img
                src="https://cdn.iconscout.com/icon/free/png-256/cloudy-weather-11-1147979.png"
                width="20px"
                class="forecast-icon"
              />
              <br />
              <span class="temp-max">20°</span>
              <span class="temp-min">10°</span>
            </div>`;
});
forecastHTML = forecastHTML + `</div>`;
forecast.innerHTML = forecastHTML;
