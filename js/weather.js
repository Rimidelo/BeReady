export const fetchWeatherDataByCoords = async (lat, lon) => {
    try {
        const response = await fetch(`${SERVER_URL}/weather/getWeatherByCoords?lat=${lat}&lon=${lon}`);
        const weatherData = await response.json();
        updateWeatherUI(weatherData);
    } catch (error) {
        console.error("Error fetching weather data:", error);
    }
};

export const fetchWeatherData = async (city) => {
    try {
        const response = await fetch(`${SERVER_URL}/weather/getWeather/${city}`);
        const weatherData = await response.json();
        updateWeatherUI(weatherData);
    } catch (error) {
        console.error("Error fetching weather data:", error);
    }
};

const updateWeatherUI = (weatherData) => {
    const weatherLocationElement = document.getElementById('weather-location');
    const weatherIconElement = document.getElementById('weather-icon');
    const weatherTempElement = document.getElementById('weather-temp');
    if (weatherLocationElement && weatherIconElement && weatherTempElement) {
        weatherLocationElement.textContent = `${weatherData.name}, ${weatherData.sys.country}`;
        weatherIconElement.innerHTML = `<i class="wi wi-day-sunny"></i>`;
        weatherTempElement.textContent = `${weatherData.main.temp}°C`;
    } else {
        console.error("Weather UI elements not found in the DOM.");
    }
};
