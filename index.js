const apiKey = "48e1aaba620d85f58cb7538fa94d7f74";

const cityInput = document.getElementById("city");
const searchBtn = document.getElementById("searchBtn");
const weatherInfo = document.getElementById("weatherInfo");
const errorMsg = document.getElementById("error");

searchBtn.addEventListener("click", function () {
    const city = cityInput.value.trim();
    if (city === "") {
        errorMsg.textContent = "Please enter a city name!";
        errorMsg.classList.remove("hidden");
        weatherInfo.classList.add("hidden");
        return;
    }
    getWeather(city);
});

async function getWeather(city) {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`);

        if (!response.ok) throw new Error("City not found");

        const data = await response.json();

        document.getElementById("cityName").textContent = `${data.name}, ${data.sys.country}`;
        document.getElementById("description").textContent = `${data.weather[0].description}`;
        document.getElementById("temp").textContent = `${data.main.temp}`;
        document.getElementById("humidity").textContent = `${data.main.humidity}`;
        document.getElementById("wind").textContent = `${data.wind.speed}`;

        weatherInfo.classList.remove("hidden");
        errorMsg.classList.add("hidden");

    } catch (error) {
        errorMsg.textContent = `${error.message}`;
        errorMsg.classList.remove("hidden");
        weatherInfo.classList.add("hidden");
    }
}
