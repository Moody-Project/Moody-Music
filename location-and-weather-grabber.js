$(document).ready(function () {

  // setting initial variables
  var latitude;
  var longitude;
  var key;

  // this is the function chain that, in a couple steps, grabs the user's latitude and longitude and also grabs the AccuWeather API's location key for the provided latitude and longitude
  function showPosition(position) {
    // position & cords will be refered to at the bottom when we check to see if location services are enabled. Below we reset the variables latitude and longitude to the grabbed coordinates from the user's browser
    latitude = position.coords.latitude;
    longitude = position.coords.longitude;
    // the following function grabs the location key from the AccuWeather's Locations API (using Geoposition search), using latitude and longitude arguments
    var getLocationKey = function (lat, long) {
      var locationQueryURL = "http://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=c5lAV7P9wARFOa8nA5SlxAkF2kwNMGwd&language=en-us&details=false&toplevel=true";
      $.ajax({
        url: locationQueryURL,
        method: "GET",
        data: {
          q: lat + "," + long,
        }
      })
        .then(function (response) {
          // Below we reset the key variable to be key from AccuWeather
          key = response.Key;
          // the following function uses a key to get the current weather conditions from AccuWeather's Current Conditions API
          var getWeather = function (thekey) {
            var weatherQueryURL = "http://dataservice.accuweather.com/currentconditions/v1/" + thekey + "?apikey=c5lAV7P9wARFOa8nA5SlxAkF2kwNMGwd&language=en-us&details=true";
            $.ajax({
              url: weatherQueryURL,
              method: "GET",
            })
              .then(function (response) {
                // Sunny Scenario!
                if (response[0].WeatherIcon === 1 || response[0].WeatherIcon === 2 || response[0].WeatherIcon === 3 || response[0].WeatherIcon === 4 || response[0].WeatherIcon === 5) {
                  $("#displayWeather").html(response[0].WeatherText);
                  $("#displayWeather").append($('<img src="weather-icons/sunny.png" alt="sunny">'));
                  // Sunny YouTube Playlist Links go here!

                  // Sunny Book Recommendation goes here!

                } else if (response[0].WeatherIcon === 6 || response[0].WeatherIcon === 7 || response[0].WeatherIcon === 8 || response[0].WeatherIcon === 11) {
                  $("#displayWeather").html(response[0].WeatherText);
                  $("#displayWeather").append($('<img src="weather-icons/cloudy.png" alt="cloudy">'));
                  // Cloudy YouTube Playlist Links go here!

                  // Cloudy Book Recommendation goes here!

                } else if (response[0].WeatherIcon === 12 || response[0].WeatherIcon === 13 || response[0].WeatherIcon === 14 || response[0].WeatherIcon === 18) {
                  $("#displayWeather").html(response[0].WeatherText);
                  $("#displayWeather").append($('<img src="weather-icons/rainy.png" alt="rainy">'));
                  // Rainy YouTube Playlist Links go here!

                  // Rainy Book Recommendation goes here!

                } else if (response[0].WeatherIcon === 15 || response[0].WeatherIcon === 16 || response[0].WeatherIcon === 17 || response[0].WeatherIcon === 41 || response[0].WeatherIcon === 42) {
                  $("#displayWeather").html(response[0].WeatherText);
                  $("#displayWeather").append($('<img src="weather-icons/stormy.png" alt="stormy">'));
                  // Stormy YouTube Playlist Links go here!

                  // Stormy Book Recommendation goes here!

                }
              })
          }
          // Below we actually *run* the getWeather function - to kickstart the if statments and such. NB this is WITHIN the getLocationKey function - so we don't run getWeather until we have the actual key 
          getWeather(key);
        })
    }
    //Below we actually *run* the getLocationKey function. NB this is WITHIN the showPosition function, so we don't run getLocationKey until we have the user's latitude and longitude stored
    getLocationKey(latitude, longitude);


  }


  // This is the function to get the user's permission to know their location
  function getLocation() {

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);


    } else {
      //I need to add in some error handlers...
      console.log("Geolocation is not supported by this browser.");
    }
  }

  //Below we actually run the getLocation function. This will be the first thing to happen when the page loads!
  getLocation();















})


