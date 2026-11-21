
// ==========================================
// 1. PAGE NAVIGATION
// ==========================================

const dashboardPage = document.querySelector(".dashboard-page");
const locationsPage = document.querySelector(".locations-page");
const settingsPage = document.querySelector(".settings-page");

const dashboardLink = document.querySelector("#dashboard-link");
const forecastLink = document.querySelector("#forecast-link");
const locationsLink = document.querySelector("#locations-link");
const settingsLink = document.querySelector("#settings-link");

function hideAllPages() {
    dashboardPage.style.display = "none";
    locationsPage.style.display = "none";
    settingsPage.style.display = "none";
}

// Show dashboard
function showDashboard() {
    hideAllPages();
    dashboardPage.style.display = "block";
}

// Highlight active navigation link
function setActiveLink(activeLink) {
    const navigationLinks = [
        dashboardLink,
        forecastLink,
        locationsLink,
        settingsLink
    ];

    navigationLinks.forEach(function (link) {
        link.classList.remove("active");
        link.removeAttribute("aria-current");
    });

    activeLink.classList.add("active");
    activeLink.setAttribute("aria-current", "page");
}

// Dashboard navigation
dashboardLink.addEventListener("click", function (event) {
    event.preventDefault();

    showDashboard();
    setActiveLink(dashboardLink);
});

// Forecast navigation
forecastLink.addEventListener("click", function (event) {
    event.preventDefault();

    showDashboard();
    setActiveLink(forecastLink);

    document.querySelector("#forecasts").scrollIntoView({
        behavior: "smooth"
    });
});

// Locations navigation
locationsLink.addEventListener("click", function (event) {
    event.preventDefault();

    hideAllPages();
    locationsPage.style.display = "block";

    setActiveLink(locationsLink);
});

// Settings navigation
settingsLink.addEventListener("click", function (event) {
    event.preventDefault();

    hideAllPages();
    settingsPage.style.display = "block";

    setActiveLink(settingsLink);
});

// Initial page
showDashboard();
setActiveLink(dashboardLink);


// ==========================================
// 2. TEMPERATURE AND DATE SELECTORS
// ==========================================

const temperatureUnit = document.querySelector("#temperature-unit");

const currentTemperature = document.querySelector(
    ".current-weather h1"
);

const feelsLikeTemperature = document.querySelector(
    ".detail-card:nth-child(3) p"
);

const currentDate = document.querySelector(
    ".current-weather > p"
);

const currentWeatherIcon = document.querySelector(
    "#current-weather-icon"
);

const forecastCards = document.querySelectorAll(
    ".forecast-card"
);

let currentWeatherData = null;
let dailyWeatherData = null;


// Hide forecast cards until weather data loads
forecastCards.forEach(function (card) {
    card.style.display = "none";
});


// ==========================================
// 3. TEMPERATURE CONVERSION
// ==========================================

function convertTemperature(celsius) {
    return Math.round((celsius * 9 / 5) + 32);
}


// ==========================================
// 4. WEATHER ICON FUNCTION
// ==========================================

function getWeatherIcon(code) {

    if (code === 0) return "☀️";

    if (code === 1 || code === 2) return "🌤️";

    if (code === 3) return "☁️";

    if (code === 45 || code === 48) return "🌫️";

    if (code >= 51 && code <= 67) return "🌧️";

    if (code >= 71 && code <= 77) return "❄️";

    if (code >= 80 && code <= 82) return "🌦️";

    if (code >= 85 && code <= 86) return "🌨️";

    if (code >= 95 && code <= 99) return "⛈️";

    return "🌤️";
}


// ==========================================
// 5. UPDATE TEMPERATURE DISPLAY
// ==========================================

function updateTemperatureDisplay() {

    if (currentWeatherData === null) {
        return;
    }

    const isFahrenheit =
        temperatureUnit.value === "fahrenheit";

    let temperature =
        currentWeatherData.temperature_2m;

    let feelsLike =
        currentWeatherData.apparent_temperature;

    // Convert Celsius to Fahrenheit
    if (isFahrenheit) {
        temperature = convertTemperature(temperature);
        feelsLike = convertTemperature(feelsLike);
    } else {
        temperature = Math.round(temperature);
        feelsLike = Math.round(feelsLike);
    }

    const unit = isFahrenheit ? "°F" : "°C";

    currentTemperature.textContent =
        `${temperature} ${unit}`;

    feelsLikeTemperature.textContent =
        `${feelsLike} ${unit}`;


    // Update forecast temperatures
    if (dailyWeatherData !== null) {

        const todayDate =
            currentWeatherData.time.split("T")[0];

        const futureIndexes = dailyWeatherData.time
            .map(function (date, index) {
                return date > todayDate ? index : -1;
            })
            .filter(function (index) {
                return index !== -1;
            })
            .slice(0, 5);


        forecastCards.forEach(function (card, index) {

            const forecastIndex = futureIndexes[index];

            if (forecastIndex === undefined) {
                return;
            }

            let maxTemp =
                dailyWeatherData.temperature_2m_max[forecastIndex];

            let minTemp =
                dailyWeatherData.temperature_2m_min[forecastIndex];

            if (isFahrenheit) {
                maxTemp = convertTemperature(maxTemp);
                minTemp = convertTemperature(minTemp);
            } else {
                maxTemp = Math.round(maxTemp);
                minTemp = Math.round(minTemp);
            }

            card.querySelector("p").textContent =
                `${maxTemp}${unit} / ${minTemp}${unit}`;

        });
    }
}


// ==========================================
// 6. THEME SETTINGS
// ==========================================

const themeSelect = document.querySelector("#theme");

themeSelect.addEventListener("change", function () {

    if (themeSelect.value === "light") {
        document.body.classList.add("light-theme");
    } else {
        document.body.classList.remove("light-theme");
    }

});


// ==========================================
// 7. CITY SEARCH
// ==========================================

const searchInput = document.querySelector(".search-bar input");
const searchButton = document.querySelector(".search-bar button");


// Get city coordinates using geocoding API
async function getCityCoordinates(city) {

    try {

        const response = await fetch(
            `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1`
        );

        if (!response.ok) {
            throw new Error("Unable to search for the city.");
        }

        const data = await response.json();

        if (!data.results || data.results.length === 0) {
            alert("City not found. Please try another city.");
            return;
        }

        const latitude = data.results[0].latitude;
        const longitude = data.results[0].longitude;
        const cityName = data.results[0].name;

        await getWeather(latitude, longitude, cityName);

    } catch (error) {

        console.error("City Search Error:", error);

        alert("Unable to search for this city. Please try again.");

    }
}


// Search button
searchButton.addEventListener("click", function () {

    const city = searchInput.value.trim();

    if (city === "") {
        alert("Please enter a city name.");
        return;
    }

    getCityCoordinates(city);

});


// Search using Enter key
searchInput.addEventListener("keydown", function (event) {

    if (event.key === "Enter") {
        searchButton.click();
    }

});


// ==========================================
// 8. FETCH WEATHER DATA
// ==========================================

async function getWeather(latitude, longitude, cityName) {

    try {

        const response = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,wind_speed_10m,surface_pressure,weather_code&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=auto&forecast_days=6`
        );

        if (!response.ok) {
            throw new Error("Unable to fetch weather data.");
        }

        const data = await response.json();

        const current = data.current;
        const daily = data.daily;

        // Store API data
        currentWeatherData = current;
        dailyWeatherData = daily;


        // Update current weather icon
        currentWeatherIcon.textContent =
            getWeatherIcon(current.weather_code);


        // Update city name
        document.querySelector(
            ".current-weather h2"
        ).textContent = cityName;


        // Update current date
        const dateString = current.time.split("T")[0];

        const today = new Date(
            dateString + "T00:00:00Z"
        );

        currentDate.textContent =
            today.toLocaleDateString("en-US", {
                weekday: "short",
                month: "short",
                day: "numeric",
                timeZone: "UTC"
            });


        // Update humidity
        document.querySelector(
            ".detail-card:nth-child(1) p"
        ).textContent =
            `${current.relative_humidity_2m}%`;


        // Update wind speed
        document.querySelector(
            ".detail-card:nth-child(2) p"
        ).textContent =
            `${current.wind_speed_10m} km/h`;


        // Update pressure
        document.querySelector(
            ".detail-card:nth-child(4) p"
        ).textContent =
            `${current.surface_pressure} hPa`;


        // Update five-day forecast
        const todayDate = current.time.split("T")[0];

        const futureIndexes = daily.time
            .map(function (date, index) {
                return date > todayDate ? index : -1;
            })
            .filter(function (index) {
                return index !== -1;
            })
            .slice(0, 5);


        forecastCards.forEach(function (card, index) {

            const forecastIndex = futureIndexes[index];

            if (forecastIndex === undefined) {
                card.style.display = "none";
                return;
            }

            // Get forecast date
            const date = new Date(
                daily.time[forecastIndex] + "T00:00:00Z"
            );

            const day = date.toLocaleDateString("en-US", {
                weekday: "short",
                timeZone: "UTC"
            });

            card.querySelector("h2").textContent = day;


            // Update weather icon
            const weatherCode =
                daily.weather_code[forecastIndex];

            card.querySelector(".forecast-icon").textContent =
                getWeatherIcon(weatherCode);

            card.style.display = "flex";

        });


        // Update temperature values
        updateTemperatureDisplay();

        console.log("Weather Data:", data);

    } catch (error) {

        console.error("Weather Error:", error);

        alert("Unable to fetch weather data. Please try again.");

    }

}


// ==========================================
// 9. LOAD DEFAULT CITY ON PAGE OPEN
// ==========================================

getCityCoordinates("Delhi");


// ==========================================
// 10. SAVED LOCATIONS
// ==========================================

const locationInput = document.querySelector("#location-input");

const addLocationButton = document.querySelector(
    "#add-location-btn"
);

const locationsList = document.querySelector(
    "#locations-list"
);


// Load saved locations from Local Storage
let savedCities = [];

try {

    savedCities = JSON.parse(
        localStorage.getItem("savedCities")
    ) || [];

} catch (error) {

    console.error("Unable to load saved locations:", error);

    savedCities = [];

}


// Support older saved data containing city-name strings
savedCities = savedCities.map(function (city) {

    if (typeof city === "string") {

        return {
            name: city,
            latitude: null,
            longitude: null
        };

    }

    return city;

});


// Save locations
function saveLocations() {

    localStorage.setItem(
        "savedCities",
        JSON.stringify(savedCities)
    );

}


// ==========================================
// 11. ADD A NEW CITY
// ==========================================

async function addCity() {

    const city = locationInput.value.trim();

    if (city === "") {
        alert("Please enter a city name.");
        return;
    }


    // Check duplicates
    const alreadyExists = savedCities.some(function (savedCity) {

        return savedCity.name.toLowerCase() === city.toLowerCase();

    });

    if (alreadyExists) {
        alert("This city is already saved.");
        return;
    }


    // Disable button while adding city
    addLocationButton.disabled = true;
    addLocationButton.textContent = "Adding...";

    try {

        // Get city coordinates
        const response = await fetch(
            `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1`
        );

        if (!response.ok) {
            throw new Error("City search failed.");
        }

        const data = await response.json();

        if (!data.results || data.results.length === 0) {
            alert("City not found. Please try another city.");
            return;
        }

        const result = data.results[0];

        const cityName = result.name;


        // Check duplicates again using resolved city name
        const duplicate = savedCities.some(function (savedCity) {

            return savedCity.name.toLowerCase() ===
                cityName.toLowerCase();

        });

        if (duplicate) {
            alert("This city is already saved.");
            return;
        }


        // Save city and coordinates
        savedCities.push({

            name: cityName,

            latitude: result.latitude,

            longitude: result.longitude

        });


        saveLocations();

        locationInput.value = "";

        displaySavedLocations();

    } catch (error) {

        console.error("Add City Error:", error);

        alert("Unable to add this city. Please try again.");

    } finally {

        addLocationButton.disabled = false;
        addLocationButton.textContent = "Add City";

    }

}


// Add city button
addLocationButton.addEventListener("click", addCity);


// Add city using Enter key
locationInput.addEventListener("keydown", function (event) {

    if (event.key === "Enter") {
        addCity();
    }

});


// ==========================================
// 12. DISPLAY SAVED LOCATIONS
// ==========================================

function displaySavedLocations() {

    locationsList.innerHTML = "";


    // Show message if no cities are saved
    if (savedCities.length === 0) {

        const message = document.createElement("p");

        message.classList.add("empty-locations");

        message.textContent =
            "No saved cities yet. Add a city to get started.";

        locationsList.appendChild(message);

        return;

    }


    savedCities.forEach(function (city) {

        const locationCard = document.createElement("div");

        locationCard.classList.add("location-card");


        // City name
        const cityHeading = document.createElement("h2");

        cityHeading.textContent = city.name;


        // Temperature
        const temperatureText = document.createElement("p");

        temperatureText.textContent = "Loading weather...";


        // Weather icon
        const weatherIcon = document.createElement("span");

        weatherIcon.classList.add("location-weather-icon");

        weatherIcon.textContent = "🌤️";


        // Remove button
        const removeButton = document.createElement("button");

        removeButton.classList.add("remove-location");

        removeButton.textContent = "Remove";

        removeButton.type = "button";


        // Add elements to location card
        locationCard.appendChild(cityHeading);

        locationCard.appendChild(temperatureText);

        locationCard.appendChild(weatherIcon);

        locationCard.appendChild(removeButton);

        locationsList.appendChild(locationCard);


        // Remove city
        removeButton.addEventListener("click", function () {

            savedCities = savedCities.filter(function (savedCity) {

                return savedCity.name !== city.name;

            });

            saveLocations();

            displaySavedLocations();

        });


        // Fetch saved city weather
        getSavedCityWeather(
            city,
            temperatureText,
            weatherIcon
        );

    });

}


// ==========================================
// 13. FETCH SAVED CITY WEATHER
// ==========================================

async function getSavedCityWeather(
    city,
    temperatureText,
    weatherIcon
) {

    try {

        let latitude = city.latitude;

        let longitude = city.longitude;


        // Geocode older saved entries that only contain city names
        if (latitude == null || longitude == null) {

            const geoResponse = await fetch(
                `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city.name)}&count=1`
            );

            if (!geoResponse.ok) {
                throw new Error("City search failed.");
            }

            const geoData = await geoResponse.json();

            if (!geoData.results || geoData.results.length === 0) {
                throw new Error("City not found.");
            }

            latitude = geoData.results[0].latitude;

            longitude = geoData.results[0].longitude;


            // Update saved city with coordinates
            const savedCity = savedCities.find(function (item) {

                return item.name === city.name;

            });

            if (savedCity) {

                savedCity.latitude = latitude;

                savedCity.longitude = longitude;

                saveLocations();

            }

        }


        // Fetch weather data
        const response = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,weather_code&timezone=auto`
        );

        if (!response.ok) {
            throw new Error("Weather fetch failed.");
        }

        const data = await response.json();

        const temperature = data.current.temperature_2m;

        const weatherCode = data.current.weather_code;


        // Store Celsius value for future unit changes
        temperatureText.dataset.celsius = temperature;


        // Display temperature in selected unit
        updateSavedLocationTemperature(temperatureText);


        // Display weather icon
        weatherIcon.textContent = getWeatherIcon(weatherCode);

    } catch (error) {

        console.error("Saved City Weather Error:", error);

        temperatureText.textContent = "Weather unavailable";

    }

}


// ==========================================
// 14. UPDATE SAVED CITY TEMPERATURES
// ==========================================

function updateSavedLocationTemperature(temperatureText) {

    const celsius = Number(temperatureText.dataset.celsius);

    if (!Number.isFinite(celsius)) {
        return;
    }

    const isFahrenheit =
        temperatureUnit.value === "fahrenheit";

    const temperature = isFahrenheit
        ? convertTemperature(celsius)
        : Math.round(celsius);

    const unit = isFahrenheit ? "°F" : "°C";

    temperatureText.textContent =
        `${temperature}${unit}`;

}


// Update all saved city temperatures
function updateAllSavedLocationTemperatures() {

    const savedTemperatureElements =
        document.querySelectorAll(
            ".location-card p[data-celsius]"
        );

    savedTemperatureElements.forEach(function (element) {

        updateSavedLocationTemperature(element);

    });

}


// ==========================================
// 15. LOAD SAVED LOCATIONS ON PAGE OPEN
// ==========================================

displaySavedLocations();


// ==========================================
// 16. TEMPERATURE UNIT CHANGE
// ==========================================

temperatureUnit.addEventListener("change", function () {

    updateTemperatureDisplay();

    updateAllSavedLocationTemperatures();

});
