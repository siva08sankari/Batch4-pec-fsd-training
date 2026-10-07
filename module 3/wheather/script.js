
async function getWeather() {

    const city = document.getElementById("city").value.trim();
    const error = document.getElementById("error");

    // Clear previous error
    error.innerText = "";

    // Check empty input
    if (city === "") {
        error.innerText = "Please enter a city name.";
        return;
    }

    try {

        // Step 1: Find city latitude and longitude
        const locationURL =
            `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=en&format=json`;

        const locationResponse = await fetch(locationURL);

        if (!locationResponse.ok) {
            throw new Error("Location request failed");
        }

        const locationData = await locationResponse.json();

        // Check whether city exists
        if (!locationData.results || locationData.results.length === 0) {
            throw new Error("City not found");
        }

        const latitude = locationData.results[0].latitude;
        const longitude = locationData.results[0].longitude;
        const cityName = locationData.results[0].name;

        // Step 2: Get weather information
        const weatherURL =
            `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m`;

        const weatherResponse = await fetch(weatherURL);

        if (!weatherResponse.ok) {
            throw new Error("Weather request failed");
        }

        const weatherData = await weatherResponse.json();

        const current = weatherData.current;

        // Step 3: Display weather information
        document.getElementById("cityName").innerText =
            cityName;

        document.getElementById("temperature").innerText =
            current.temperature_2m + " °C";

        document.getElementById("humidity").innerText =
            current.relative_humidity_2m + " %";

        document.getElementById("wind").innerText =
            current.wind_speed_10m + " km/h";

        document.getElementById("condition").innerText =
            getWeatherCondition(current.weather_code);

    }

    catch (error) {

        document.getElementById("error").innerText =
            "City not found. Please enter a valid city.";

        document.getElementById("cityName").innerText =
            "Weather Information";

        document.getElementById("temperature").innerText = "--";
        document.getElementById("condition").innerText = "--";
        document.getElementById("humidity").innerText = "--";
        document.getElementById("wind").innerText = "--";
    }
}


// Convert weather code into weather condition
function getWeatherCondition(code) {

    if (code === 0) {
        return "Clear Sky";
    }

    if (code === 1 || code === 2 || code === 3) {
        return "Partly Cloudy";
    }

    if (code === 45 || code === 48) {
        return "Fog";
    }

    if (code >= 51 && code <= 67) {
        return "Rain";
    }

    if (code >= 71 && code <= 77) {
        return "Snow";
    }

    if (code >= 80 && code <= 82) {
        return "Rain Showers";
    }

    if (code >= 95) {
        return "Thunderstorm";
    }

    return "Unknown";
}

