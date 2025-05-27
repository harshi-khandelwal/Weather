const apiKey = "8260c03ac1074055b7f111911252605";

function getWeather() {
  const city = document.getElementById('cityInput').value.trim();
  if (!city) {
    alert('Please enter a city name.');
    document.getElementById('weatherResult').innerHTML = '';
    setBackgroundImage("normal.gif");
    return;
  }

  const apiUrl = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=yes`;

  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      const weather = data.current;
      const location = data.location;
      const condition = weather.condition.text.toLowerCase();

    const output = `
        <h2>${location.name}, ${location.country}</h2>
        <img src="https:${weather.condition.icon}" alt="weather icon">

        <div class="info-container">
            <div class="info-box">
            <p><strong>Condition:</strong> ${weather.condition.text}</p>
            <p><strong>Temperature:</strong> ${weather.temp_c} °C</p>
            <p><strong>Feels Like:</strong> ${weather.feelslike_c} °C</p>
            </div>

            <div class="info-box">
            <p><strong>Humidity:</strong> ${weather.humidity} %</p>
            <p><strong>Wind Speed:</strong> ${weather.wind_kph} km/h</p>
            <p><strong>UV Index:</strong> ${weather.uv}</p>
            </div>

            <div class="info-box">
            <p><strong>AQI (US EPA):</strong> ${weather.air_quality["us-epa-index"]}</p>
            <p><strong>PM2.5:</strong> ${weather.air_quality.pm2_5.toFixed(1)} µg/m³</p>
            <p><strong>PM10:</strong> ${weather.air_quality.pm10.toFixed(1)} µg/m³</p>
            </div>
        </div>`;

      document.getElementById('weatherResult').innerHTML = output;

      setBackgroundImageByCondition(condition);
    })
    .catch(error => {
      console.error('Error:', error);
      document.getElementById('weatherResult').innerText = 'Unable to fetch weather data.';
      setBackgroundImage("default.gif");
    });
}

function setBackgroundImage(filename) {
  document.getElementById("bgImage").src = `images/${filename}`;
}

function setBackgroundImageByCondition(condition) {
  if (condition.includes("sunny") || condition.includes("clear")) {
    setBackgroundImage("sunny(aes).gif");
  } else if (condition.includes("cloud")) {
    setBackgroundImage("cloudy(aes).gif");
  } else if (condition.includes("rain") || condition.includes("drizzle")) {
    setBackgroundImage("rain(aes).gif");
  } else if (condition.includes("snow")) {
    setBackgroundImage("snow.gif");
  } else if (condition.includes("storm") || condition.includes("thunder")) {
    setBackgroundImage("thunderstorm(aes).gif");
  } else if (condition.includes("fog") || condition.includes("mist") || condition.includes("haze")) {
    setBackgroundImage("fog(aes).gif");
  } else {
    setBackgroundImage("default(aes).gif");
  }
}
