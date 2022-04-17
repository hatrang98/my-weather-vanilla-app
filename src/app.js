let city = "Hanoi";
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
function showTemp(response) {
  console.log(response.data);
  let tempElement = document.querySelector("#temp");
  tempElement.innerHTML = Math.round(response.data.main.temp);
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
let apiKey = "634e0f286e83523b2a964bf9f5ac1617";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
axios.get(apiUrl).then(showTemp);
