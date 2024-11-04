const weatherSearch = document.querySelector("#weather-search");
const locationInput = document.querySelector('input[name="location"]');
const getWeatherButton = document.querySelector("#weather-search button");
const weatherDisplay = document.querySelector("#weather-display");
const currentConditions = document.querySelector("#current-conditions");
const unitSelector = document.querySelector("#unit");

async function getWeatherByLocation(location) {
  try {
    let unit = unitSelector.checked ? "metric" : "us";

    const response = await fetch(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=${unit}&key=LDHDYDC27SU47MJ23BA59AS4W&contentType=json`
    );
    const json = await response.json();
    return json;
  } catch (e) {
    console.log(e);
  }
}

function returnRelevantProperties(weather) {
  const conditions = {
    high: weather.days[0].tempmax,
    low: weather.days[0].tempmin,
    realTemp: weather.currentConditions.temp,
    feelTemp: weather.currentConditions.feelslike,
    humidity: weather.currentConditions.humidity,
    wind: weather.currentConditions.windspeed,
    condition: weather.currentConditions.conditions,
    description: weather.description,
    location: weather.resolvedAddress,
  };
  return conditions;
}

function DOMUpdate(conditions, speedUnit, tempUnit) {
  const temp = document.querySelector("#temp");
  const condition = document.querySelector("#condition");
  const locationDisplay = document.querySelector("#location");
  const highLowFeels = document.querySelector("#high-low-feels");
  const wind = document.querySelector("#wind");
  speedUnit = unitSelector.checked ? "kph" : "mph";
  tempUnit = unitSelector.checked ? "C" : "F";

  temp.textContent = `${conditions.realTemp} ${tempUnit}`;
  condition.textContent = conditions.condition;
  locationDisplay.textContent = conditions.location;
  highLowFeels.textContent = `${conditions.high} / ${conditions.low} feels like ${conditions.feelTemp}`;
  wind.textContent = `${conditions.wind} ${speedUnit}`;
}

getWeatherButton.addEventListener("click", () => {
  getWeatherByLocation(locationInput.value).then((result) => {
    console.log(result);
    DOMUpdate(returnRelevantProperties(result));
  });
});

unitSelector.addEventListener("click", () => {
  getWeatherByLocation(locationInput.value).then((result) => {
    console.log(result);
    DOMUpdate(returnRelevantProperties(result));
  });
});
