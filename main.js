const imgIcon = document.querySelector("#weather-icon");
const weatherInfoContainer = document.querySelector(".weather-info");
const cityInput = document.querySelector('input[name="city"]');
const searchButton = document.querySelector("#search");
const weatherDataContainer = document.querySelector(".weather-data");

async function fetchAPI(city) {
  const fetchData = await fetch(
    `http://api.weatherapi.com/v1/current.json?key=0f315cc4501b4f96b23163917242002&q=${
      city || "london"
    }`
  );
  return await fetchData.json();
}

async function defaultAPICall() {
  weatherDataContainer.classList.add("hidden");

  const loader = '<div class="boxLoading"></div>';
  document.getElementById("loading").innerHTML = loader;

  const cityData = await fetchAPI();

  document.getElementById("loading").innerHTML = "";
  weatherDataContainer.classList.remove("hidden");

  imgIcon.src = cityData.current.condition.icon;

  weatherInfoContainer.innerHTML = `
    <h1>${cityData.location.name}</h1>
    <h2>${cityData.current.condition.text}</h2>
    <h3>Temperature: ${cityData.current.temp_c} °C</h3>
    <h3>Feels Like: ${cityData.current.feelslike_c} °C</h3>`;
}

defaultAPICall();

searchButton.addEventListener("click", async () => {
  weatherDataContainer.classList.add("hidden");

  const loader = '<div class="boxLoading"></div>';
  document.getElementById("loading").innerHTML = loader;

  const city = cityInput.value;
  const cityData = await fetchAPI(city);

  document.getElementById("loading").innerHTML = "";
  weatherDataContainer.classList.remove("hidden");

  imgIcon.src = cityData.current.condition.icon;

  weatherInfoContainer.innerHTML = `
    <h1>${cityData.location.name}</h1>
    <h2>${cityData.current.condition.text}</h2>
    <h3>Temperature: ${cityData.current.temp_c} °C</h3>
    <h3>Feels Like: ${cityData.current.feelslike_c} °C</h3>`;
});
