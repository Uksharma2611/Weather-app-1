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
        const weatherIcon = document.querySelector(".weather-icon");
        
        if (data.weather[0].main == "Clouds") {
            weatherIcon.src = "./images/clouds.png";
        } else if (data.weather[0].main == "Clear") {
            weatherIcon.src = "./images/clear.png";
        } else if (data.weather[0].main == "Drizzle") {
            weatherIcon.src = "./images/drizzle.png";
        } else if (data.weather[0].main == "Mist") {
            weatherIcon.src = "./images/mist.png";
        } else if (data.weather[0].main == "Rain") {
            weatherIcon.src = "./images/rain.png";
        } else if (data.weather[0].main == "Snow") {
            weatherIcon.src = "./images/snow.png";
        }
        

        document.querySelector(".weather").style.display = "block";
        document.querySelector(".error").style.display = "none";

        searchBox.value = "";
    } catch (error) {
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
    }
}

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
