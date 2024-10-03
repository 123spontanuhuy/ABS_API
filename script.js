const apiKey = '08266215fdd3a60eea2ab24692eb4049'; // Ganti dengan API key dari OpenWeather

// Fungsi untuk mendapatkan cuaca saat ini dan ramalan cuaca
async function getWeather() {
    const city = document.getElementById('city').value;
    if (!city) {
        alert('Please enter a city name');
        return;
    }

    try {
        // URL untuk cuaca saat ini
        const weatherResponse = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
        const weatherData = await weatherResponse.json();

        // URL untuk ramalan cuaca 5 hari (3 jam per interval)
        const forecastResponse = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`);
        const forecastData = await forecastResponse.json();

        displayWeatherInfo(weatherData);
        displayForecastInfo(forecastData);
    } catch (error) {
        alert('Failed to fetch weather data. Please try again.');
        console.error(error);
    }
}

// Fungsi untuk menampilkan informasi cuaca saat ini
function displayWeatherInfo(data) {
    const weatherDiv = document.getElementById('weather-info');
    weatherDiv.innerHTML = `
        <div class="weather-box">
            <h2>Current Weather in ${data.name}, ${data.sys.country}</h2>
            <p>Temperature: ${data.main.temp}°C</p>
            <p>Condition: ${data.weather[0].description}</p>
            <img src="http://openweathermap.org/img/wn/${data.weather[0].icon}.png" alt="${data.weather[0].description}">
            <p>Humidity: ${data.main.humidity}%</p>
            <p>Wind: ${data.wind.speed} m/s</p>
        </div>
    `;
}

// Fungsi untuk menampilkan ramalan cuaca 5 hari
function displayForecastInfo(data) {
    const forecastDiv = document.getElementById('forecast-info');
    forecastDiv.innerHTML = '<h2>5 Day Forecast</h2>';

    // Hanya tampilkan 3 kali per hari (pagi, siang, malam)
    for (let i = 0; i < data.list.length; i += 8) {
        const day = data.list[i];
        const date = new Date(day.dt_txt);
        forecastDiv.innerHTML += `
            <div class="weather-box">
                <h3>${date.toDateString()}</h3>
                <p>Temperature: ${day.main.temp}°C</p>
                <p>Condition: ${day.weather[0].description}</p>
                <img src="http://openweathermap.org/img/wn/${day.weather[0].icon}.png" alt="${day.weather[0].description}">
            </div>
        `;
    }
}
