var description = document.getElementById("description");
var temperature = document.getElementById("temperature");
var infoError = document.getElementById("info-error");
var city = document.getElementById("city");
var pressure = document.getElementById("pressure");
var humidity = document.getElementById("humidity");
var wind = document.getElementById("wind");

function getTemperature(myPosition) {

  var prepareURLCoords = "https://fcc-weather-api.glitch.me/api/current?lat=" + myPosition.coords.latitude + "&lon=" + myPosition.coords.longitude;

  $.getJSON(prepareURLCoords, function(data) {
    var myJSON = JSON.stringify(data);
    var myData = JSON.parse(myJSON);

    description.innerHTML = myData.weather[0].main;

    var img = $("#icon-weather");
    switch(description.innerHTML) {
      case "Rain":
         img.attr("src", "https://cdn2.iconfinder.com/data/icons/weather-collection-1/512/cloudy-havyrain-128.png");
        break;
      case "Clouds":
        img.attr("src", "https://cdn2.iconfinder.com/data/icons/weather-collection-1/512/rainnyday-128.png");
        break;
      default:
        img.attr("src", "https://cdn2.iconfinder.com/data/icons/weather-collection-1/512/sunny512x512-01-128.png");
        break;
    }

    img.alt = myData.weather[0].description;
    temperature.innerHTML = myData.main.temp + "&#8451"
    city.innerHTML = myData.name;
    pressure.innerHTML = myData.main.pressure + " hPa";
    humidity.innerHTML = myData.main.humidity + " %";
    wind.innerHTML = myData.wind.speed + " km/h";

    var iconWind = $("#windDirection");
    //few cases of wind
      iconWind.attr("src", "https://image.flaticon.com/icons/svg/25/25222.svg");


  });
}

function getMyLocalization() {
  if(navigator.geolocation)
    navigator.geolocation.getCurrentPosition(getTemperature, showError);
  else
    temp.innerHTML = "Gelocation is not supported";
}

function showError(error) {
    switch(error.code) {
        case error.PERMISSION_DENIED:
            infoError.innerHTML = "Turn on Your GPS"
            break;
        case error.POSITION_UNAVAILABLE:
            infoError.innerHTML = "Location information is unavailable."
            break;
        case error.TIMEOUT:
            infoError.innerHTML = "The request to get user location timed out."
            break;
        case error.UNKNOWN_ERROR:
            infoError.innerHTML = "An unknown error occurred."
            break;
    }
}

window.onload = getMyLocalization;

//Icons created by Thang Ta
//License Attribution 3.0 Unported (CC BY 3.0)
