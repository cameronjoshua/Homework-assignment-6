var appid = '150464c2adb8c38e5bd05c322eda9963';

$(".search_submit").on("click", async function(e) {
  e.preventDefault();
  reset();
  let city_data;
  let forecast;

  let city = $(".search_input").val();

  city_data = await fetch_city(city);

  $("#city_name").html(city);
  $("#temp").html(city_data.main.temp);
  $("#wind").html(city_data.wind.speed);
  $("#humidity").html(city_data.main.humidity);

  forecast = await fetch_forecast(city_data.coord);

})

async function fetch_city(city) {
  let api = 'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=' + appid;

  let response = await fetch(api);
  let response_json = await response.json();
  console.log(response_json);

  return response_json;
}

async function fetch_forecast(coord) {
  let api = 'https://api.openweathermap.org/data/2.5/forecast?lat=' + coord.lat + '&lon=' + coord.lon + '&appid=' + appid;
  let response = await fetch(api);
  let response_json = await response.json();
  console.log(response_json);
  
  return response_json;
}

function reset() {
  $("#city_name").html('');
  $("#temp").html('');
  $("#wind").html('');
  $("#humidity").html('');
}