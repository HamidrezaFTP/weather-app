const appInput = document.getElementById("cityInput");
const appButton = document.getElementById("getWeather");
const appOutput = document.getElementById("weatherInfo");

const API_KEY = "498cd62a7c24abd620d297e4375589ff";
const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";

const displayWeather = function (weather) {
  const html = `
    <div class="weather-app__info--temp">${weather.temp}°C</div>
    <div class="weather-app__info--desc">${weather.desc}</div>
  `;

  appOutput.innerHTML = html;
};

const getWeather = async function (city) {
  try {
    const response = await fetch(
      `${BASE_URL}?q=${city}&appid=${API_KEY}&units=metric`
    );

    if (!response.ok) {
      throw new Error("City not found");
    }

    const data = await response.json();

    const weather = {
      temp: Math.round(data.main.temp),
      desc: data.weather[0].description,
    };

    displayWeather(weather);
  } catch (error) {
    console.error(error);
  }
};

appButton.addEventListener("click", function () {
  const city = appInput.value;
  if (!city) {
    return;
  }
  getWeather(city);
});
