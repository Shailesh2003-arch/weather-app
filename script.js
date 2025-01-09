document.addEventListener("DOMContentLoaded", () => {
  const cityInput = document.getElementById("city-input");
  const getWeatherBtn = document.getElementById("get-weather-btn");
  const weatherInfo = document.getElementById("weather-info");
  const cityNameDisplay = document.getElementById("city-name");
  const temperatureDisplay = document.getElementById("temperature");
  const descriptionDisplay = document.getElementById("description");
  const errorMsg = document.getElementById("error-msg");
  const API_KEY = "fd1996edc54290deaf4ee38d53f4acd6";
  getWeatherBtn.addEventListener("click", async () => {
    const cityName = cityInput.value.trim();
    if (!cityName) return; // In javascript an empty string is a considered as a false value

    try {
      const weatherData = await fetchWeatherData(cityName);
      displayWeatherData(weatherData);
    } catch (error) {
      showError();
    }
  });

  async function fetchWeatherData(cityName) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${API_KEY}`;
    const response = await fetch(url);
    console.log(typeof response);
    console.log(response);
    if (!response.ok) {
      throw new Error("City Not found");
    }
    const data = await response.json();
    return data;
  }
  function displayWeatherData(data) {
    // console.log(data);
    const { name, main, weather } = data;
    cityNameDisplay.textContent = name;
    weatherInfo.classList.remove("hidden");
    errorMsg.classList.add("hidden");
    temperatureDisplay.textContent = `Temperature:${main.temp}`;
    descriptionDisplay.textContent = `Weather:${weather[0].description}`;
  }
  function showError() {
    weatherInfo.classList.add("hidden");
    errorMsg.classList.remove("hidden");
  }
});
