const imgIcon = document.querySelector("#weather-icon");
const weatherInfoContainer = document.querySelector(".weather-info");
const cityInput = document.querySelector('input[name="city"]');
const searchButton = document.querySelector("#search");

async function fetchAPI(city) {
  const fetchData = await fetch(
    `http://api.weatherapi.com/v1/current.json?key=0f315cc4501b4f96b23163917242002&q=${
      city || "london"
    }`
  );
  return await fetchData.json();
}

async function defaultAPICall() {
  const cityData = await fetchAPI();

  imgIcon.src = cityData.current.condition.icon;

  weatherInfoContainer.innerHTML = `
    <h1>${cityData.location.name}</h1>
    <h2>${cityData.current.condition.text}</h2>
    <h3>Temperature: ${cityData.current.temp_c} °C</h3>
    <h3>Feels Like: ${cityData.current.feelslike_c} °C</h3>`;
}

defaultAPICall();

searchButton.addEventListener("click", async () => {
  const city = cityInput.value;
  const cityData = await fetchAPI(city);

  imgIcon.src = cityData.current.condition.icon;

  weatherInfoContainer.innerHTML = `
    <h1>${cityData.location.name}</h1>
    <h2>${cityData.current.condition.text}</h2>
    <h3>Temperature: ${cityData.current.temp_c} °C</h3>
    <h3>Feels Like: ${cityData.current.feelslike_c} °C</h3>`;
});
