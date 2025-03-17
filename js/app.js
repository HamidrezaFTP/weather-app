const appInput = document.getElementById("cityInput");
const appButton = document.getElementById("getWeather");
const appOutput = document.getElementById("weatherInfo");

const API_KEY = "498cd62a7c24abd620d297e4375589ff";
const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";

const displayWeather = (weather) => {
  const html = `
    <div class="weather-app__info--temp">${weather.temp}°C</div>
    <div class="weather-app__info--desc">${weather.desc}</div>
  `;
  appOutput.innerHTML = html;
};

const getWeather = async (city) => {
  try {
    appOutput.innerHTML = `<p class="weather-app__info--loading">Loading...</p>`;
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
      icon: `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`,
    };

    displayWeather(weather);
  } catch (error) {
    appOutput.innerHTML = `<p class="weather-app__info--error">${error.message}</p>`;
  }
};

appButton.addEventListener("click", () => {
  const city = appInput.value.trim();
  if (!city) {
    appOutput.innerHTML = `<p class="weather-app__info--error">Please enter a city name!</p>`;
    return;
  }
  getWeather(city);
});

appInput.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    appButton.click();
  }
});
