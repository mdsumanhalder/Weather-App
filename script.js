let weather = {
  apiKey: "5b19f7556606a31f7017fecd90b80513",
  fetchWeather: function (city) {
    fetch(
      "https://api.openweathermap.org/data/2.5/weather?q=" +
        city +
        "&units=metric&appid=" +
        this.apiKey
    )
      .then((response) => {
        if (!response.ok) {
          alert("No weather location found.");
          throw new Error("No weather found.");
        }
        return response.json();
      })
      .then((data) => this.displayWeather(data));
  },
  displayWeather: function (data) {
    const { name } = data;
    const { icon, description } = data.weather[0];
    const { temp, humidity,feels_like } = data.main;
    const { speed } = data.wind;
    document.querySelector(".city").innerText =` Weather in   ${name}`
    document.querySelector(".icon").src = "https://openweathermap.org/img/wn/" + icon + ".png";  ;
    document.querySelector(".description").innerText = description;
    document.querySelector(".temp").innerText = `${temp}°C`;
    document.querySelector(".feeling").innerText =` feels_like: ${feels_like}`
    document.querySelector(".humidity").innerText =
      `Humidity: ${humidity}%`;
    document.querySelector(".wind").innerText =
      ` Wind speed: ${speed} km/h`;
    document.querySelector(".weather").classList.remove("loading");
  },
  search: function () {
    this.fetchWeather(document.querySelector(".search-bar").value);
  },
};

document.querySelector(".search button").addEventListener("click", function () {
  weather.search();
});

document
  .querySelector(".search-bar")
  .addEventListener("keyup", function (event) {
    if (event.key == "Enter") {
      weather.search();
    }
  });

weather.fetchWeather("Tallinn");
