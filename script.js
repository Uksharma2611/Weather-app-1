const apiKey = "5118ba469d528cb5aed8210934ed4628";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?&units=metric&q=";

const searchBox = document.querySelector("#city-input");
const searchBtn = document.querySelector("#search-btn");
const weatherIcon = document.querySelector(".weather-icon");

async function checkWeather(city) {
    try {
        const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

        if (!response.ok) {
            throw new Error('City not found');
        }

        const data = await response.json();
        
        document.querySelector(".city").textContent = data.name;
        document.querySelector(".temp").textContent = Math.round(data.main.temp) + "°C";
        document.querySelector(".humidity").textContent = data.main.humidity + " %";
        document.querySelector(".wind").textContent = data.wind.speed + " Kmph";
        
        const weatherCondition = data.weather[0].main;
        weatherIcon.src = `./images/${weatherCondition.toLowerCase()}.png`;

        document.querySelector(".weather").style.display = "block";
        document.querySelector(".error").style.display = "none";

        // Clear the input field
        searchBox.value = "";
    } catch (error) {
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
    }
}

// Add event listeners for button click and 'Enter' key
searchBtn.addEventListener("click", () => {
    if (searchBox.value !== "") {
        checkWeather(searchBox.value);
    }
});

searchBox.addEventListener("keyup", (event) => {
    if (event.key === "Enter" && searchBox.value !== "") {
        checkWeather(searchBox.value);
    }
});
