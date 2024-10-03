const apiKey = '08266215fdd3a60eea2ab24692eb4049'; 


async function getWeather() {
    const city = document.getElementById('city').value;
    if (!city) {
        alert('Please enter a city name');
        return;
    }

    try {
        const weatherResponse = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
        const weatherData = await weatherResponse.json();

        const forecastResponse = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`);
        const forecastData = await forecastResponse.json();

        displayWeatherInfo(weatherData);
        displayForecastInfo(forecastData);
    } catch (error) {
        alert('Failed to fetch weather data. Please try again.');
        console.error(error);
    }
}


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


function displayForecastInfo(data) {
    const forecastDiv = document.getElementById('forecast-info');
    forecastDiv.innerHTML = '<h2>5 Day Forecast</h2>';


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
