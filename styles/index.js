//display the current date and time
let now = new Date();
let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
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
let day = days[now.getDay()];
let h5 = document.querySelector("#date");
h5.innerHTML = `${day} ${hours}:${minutes}`;

//display current position data
function showPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "33bb3131faab8b8de402456e4193a0d1";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(showTemperature);
}

function showTemperature(response) {
  let city = response.data.name;
  let h1 = document.querySelector("h1");
  h1.innerHTML = `${city}`;
  let description = document.querySelector("#Weather-description");
  description.innerHTML = response.data.weather[0].main;
  let currenTemp = Math.round(response.data.main.temp);
  let currentTemperature = document.querySelector("#Weather-summary");
  currentTemperature.innerHTML = `${currenTemp}°C`;
  let humidityElemnt = response.data.main.humidity;
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = `${humidityElemnt}%`;
  let windSpeedElemnt = response.data.wind.speed;
  let windSpeed = document.querySelector("#wind-speed");
  windSpeed.innerHTML = `${windSpeedElemnt} km/h`;
}

function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(showPosition);
}

let currentButton = document.querySelector("#btnCurrent");
currentButton.addEventListener("click", getCurrentPosition);

//display the searched city information
function search(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#showCity");
  let h1 = document.querySelector("#currentCity");
  h1.innerHTML = `${searchInput.value}`;
  let apiKey = "33bb3131faab8b8de402456e4193a0d1";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${h1.innerHTML}&units=metric`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(showWeatherInformation);
}

function showWeatherInformation(response) {
  let description = document.querySelector("#Weather-description");
  description.innerHTML = response.data.weather[0].main;
  let temperatureElemnt = Math.round(response.data.main.temp);
  let temperature = document.querySelector("#Weather-summary");
  temperature.innerHTML = `${temperatureElemnt}°C`;
  let humidityElemnt = response.data.main.humidity;
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = `${humidityElemnt}%`;
  let windSpeedElemnt = response.data.wind.speed;
  let windSpeed = document.querySelector("#wind-speed");
  windSpeed.innerHTML = `${windSpeedElemnt} km/h`;
}

let form = document.querySelector("#searchCities");
form.addEventListener("click", search);
