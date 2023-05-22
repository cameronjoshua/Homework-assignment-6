$(document).ready(function() {
  var appid = '150464c2adb8c38e5bd05c322eda9963';

  $(".search_submit").on("click", async function(e) {
    e.preventDefault();
    reset();
    let city = $(".search_input").val();

    try {
      let cityData = await fetchCity(city);
      $("#city_name").html(city);
      $("#temp").html(convertKelvinToFahrenheit(cityData.main.temp) + '°F');
      $("#wind").html(cityData.wind.speed + ' MPH');
      $("#humidity").html(cityData.main.humidity + '%');

      let forecastData = await fetchForecast(cityData.coord);
      displayForecast(forecastData);
    } catch (error) {
      console.log(error);
    }
  });

  async function fetchCity(city) {
    let api = 'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=' + appid;
    let response = await fetch(api);
    let response_json = await response.json();
    return response_json;
  }

  async function fetchForecast(coord) {
    let api = 'https://api.openweathermap.org/data/2.5/forecast?lat=' + coord.lat + '&lon=' + coord.lon + '&appid=' + appid;
    let response = await fetch(api);
    let response_json = await response.json();
    return response_json;
  }

  function displayForecast(forecastData) {
    let forecastWrap = $("#forecast_wrap");
    forecastWrap.empty();

    for (let i = 0; i < 5; i++) {
      let forecast = forecastData.list[i];

      let forecastBox = $('<div class="forecast"></div>');
      forecastBox.append('<p><b>' + forecast.dt_txt + '</b></p>');
      forecastBox.append('<p>Temp: ' + convertKelvinToFahrenheit(forecast.main.temp) + '°F</p>');
      forecastBox.append('<p>Wind: ' + forecast.wind.speed + ' MPH</p>');
      forecastBox.append('<p>Humidity: ' + forecast.main.humidity + '%</p>');

      forecastWrap.append(forecastBox);
    }
  }

  function convertKelvinToFahrenheit(kelvin) {
    return Math.round(((kelvin - 273.15) * 9) / 5 + 32);
  }

  function reset() {
    $("#city_name").html('');
    $("#temp").html('');
    $("#wind").html('');
    $("#humidity").html('');
    $("#forecast_wrap").empty();
  }
});
