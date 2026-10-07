
async function getWeather() {

    const city = document.getElementById("city").value.trim();

    const error = document.getElementById("error");

    error.innerText = "";

    if (city === "") {

        error.innerText = "Please enter a city name.";

        return;
    }

    try {

        // Get city location
        const locationURL =
            `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=en&format=json`;

        const locationResponse =
            await fetch(locationURL);

        if (!locationResponse.ok) {
            throw new Error("Location error");
        }

        const locationData =
            await locationResponse.json();

        if (!locationData.results) {
            throw new Error("City not found");
        }

        const latitude =
            locationData.results[0].latitude;

        const longitude =
            locationData.results[0].longitude;

        const cityName =
            locationData.results[0].name;


        // Get weather data
        const weatherURL =
            `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m`;

        const weatherResponse =
            await fetch(weatherURL);

        if (!weatherResponse.ok) {
            throw new Error("Weather error");
        }

        const weatherData =
            await weatherResponse.json();

        const current =
            weatherData.current;


        // Display city
        document.getElementById("cityName").innerText =
            cityName;


        // Display temperature
        document.getElementById("temperature").innerText =
            current.temperature_2m + " °C";


        // Display humidity
        document.getElementById("humidity").innerText =
            current.relative_humidity_2m + " %";


        // Display wind
        document.getElementById("wind").innerText =
            current.wind_speed_10m + " km/h";


        // Get weather condition
        const condition =
            getWeatherCondition(current.weather_code);

        document.getElementById("condition").innerText =
            condition.name;


        // Dynamic weather icon
        document.getElementById("weatherIcon").innerText =
            condition.icon;


        // Travel recommendation
        document.getElementById("suggestion").innerText =
            getTravelSuggestion(current.weather_code);


    }

    catch (error) {

        document.getElementById("error").innerText =
            "City not found. Please enter a valid city.";

        document.getElementById("cityName").innerText =
            "Search for a city";

        document.getElementById("temperature").innerText =
            "-- °C";

        document.getElementById("condition").innerText =
            "Weather condition";

        document.getElementById("humidity").innerText =
            "--";

        document.getElementById("wind").innerText =
            "--";

        document.getElementById("weatherIcon").innerText =
            "❓";

        document.getElementById("suggestion").innerText =
            "Please search for a valid city.";
    }
}


// Weather conditions and icons
function getWeatherCondition(code) {

    if (code === 0) {
        return {
            name: "Clear Sky",
            icon: "☀️"
        };
    }

    if (code === 1 || code === 2 || code === 3) {
        return {
            name: "Partly Cloudy",
            icon: "⛅"
        };
    }

    if (code === 45 || code === 48) {
        return {
            name: "Fog",
            icon: "🌫️"
        };
    }

    if (code >= 51 && code <= 67) {
        return {
            name: "Rain",
            icon: "🌧️"
        };
    }

    if (code >= 71 && code <= 77) {
        return {
            name: "Snow",
            icon: "❄️"
        };
    }

    if (code >= 80 && code <= 82) {
        return {
            name: "Rain Showers",
            icon: "🌦️"
        };
    }

    if (code >= 95) {
        return {
            name: "Thunderstorm",
            icon: "⛈️"
        };
    }

    return {
        name: "Unknown",
        icon: "❓"
    };
}


// Travel suggestions
function getTravelSuggestion(code) {

    if (code === 0) {

        return "☀️ Great weather for travel! Perfect for sightseeing, outdoor activities and exploring tourist attractions.";
    }

    if (code >= 1 && code <= 3) {

        return "⛅ Good weather for travel. You can enjoy sightseeing and outdoor activities.";
    }

    if (code >= 45 && code <= 48) {

        return "🌫️ Foggy conditions. Travel carefully and avoid driving at high speed.";
    }

    if (code >= 51 && code <= 67) {

        return "🌧️ Rainy weather. Carry an umbrella and consider visiting indoor attractions.";
    }

    if (code >= 71 && code <= 77) {

        return "❄️ Snowy weather. Wear warm clothes and check road conditions before travelling.";
    }

    if (code >= 80 && code <= 82) {

        return "🌦️ Rain showers are expected. Carry an umbrella and plan flexible activities.";
    }

    if (code >= 95) {

        return "⛈️ Thunderstorm conditions. Avoid outdoor travel and stay indoors if possible.";
    }

    return "Check the weather conditions before planning your trip.";
}