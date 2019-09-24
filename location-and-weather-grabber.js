$(document).ready(function () {

  // setting initial variables
  var latitude;
  var longitude;
  var key;
  var playlists = {
    sunny: "https://www.youtube.com/embed/videoseries?list=PLxLLzv-6F2_e90kVYMmrW20IaP12tRbbp",
    // cloudy playlist goes here 
    rainy: "https://www.youtube.com/embed/videoseries?list=PLxLLzv-6F2_cr90z0I1F372NZSKtx2UPG",
    stormy: "https://www.youtube.com/embed/videoseries?list=PLxLLzv-6F2_eEuojX5xDbHP_f3WUsHLZQ"
    // snowy playlist goes here
  }
var bookSuggestions = {
  cloudy: "Crime and Punishment",
  sunny: "To All The Boys I've Loved Before"
}

  // this is the function chain that, in a couple steps, grabs the user's latitude and longitude and also grabs the AccuWeather API's location key for the provided latitude and longitude
  function showPosition(position) {
    // position & cords will be refered to at the bottom when we check to see if location services are enabled. Below we reset the variables latitude and longitude to the grabbed coordinates from the user's browser
    latitude = position.coords.latitude;
    longitude = position.coords.longitude;
    // the following function grabs the location key from the AccuWeather's Locations API (using Geoposition search), using latitude and longitude arguments
    var getLocationKey = function (lat, long) {
      var locationQueryURL = "http://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=mFTs4oCgPX4qpFGAJ6QMgJXQ95lv6Bhn&language=en-us&details=false&toplevel=true";
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
            var weatherQueryURL = "http://dataservice.accuweather.com/currentconditions/v1/" + thekey + "?apikey=mFTs4oCgPX4qpFGAJ6QMgJXQ95lv6Bhn&language=en-us&details=true";
            $.ajax({
              url: weatherQueryURL,
              method: "GET",
            })
              .then(function (response) {
                // Sunny Scenario!
                if (response[0].WeatherIcon === 1 || response[0].WeatherIcon === 2 || response[0].WeatherIcon === 3 || response[0].WeatherIcon === 4 || response[0].WeatherIcon === 5 || response[0].WeatherIcon === 33 || response[0].WeatherIcon === 34 || response[0].WeatherIcon === 37) {
                  $("#displayWeather").html(response[0].WeatherText);
                  if (response[0].IsDayTime) {
                    $("#displayWeather").append($('<img src="weather-icons/sunny.png" alt="sunny">'));
                  } else {
                    $("#displayWeather").append($('<img src="weather-icons/nightsunny.png" alt="clear night">'));
                  }
                  $("#displayWeather").append($('<p>' + response[0].Temperature.Imperial.Value + ' degrees</p>'));
                  $("body").css({ "background-image": "url('images/sun-background.jpg')", "background-size": "cover", "background-repeat": "no-repeat", "background-position": "50% 50%" });
                  // Sunny YouTube Playlist Links go here!
                  $("#video").append($('<iframe width="560" height="315" src='+playlists.sunny+'  frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>'));
                  // Sunny Book Recommendation goes here!
                  var bookQueryURL = "https://www.googleapis.com/books/v1/volumes?key=AIzaSyD8qve3oh3rIrcjK3HBzcj-c4vo3WOWYWU";
                  $.ajax({
                    url: bookQueryURL,
                    method: "GET",
                    data: {
                      q: bookSuggestions.sunny,
                    }
                  }).then (function (response){
                    $("#displayBook").append($('<p>'+ response.items[0].volumeInfo.title +'</p>'));
                    $("#displayBook").append($('<img src="' +response.items[0].volumeInfo.imageLinks.thumbnail+'">'));
                  })
                  // Cloudy Scenario:
                } else if (response[0].WeatherIcon === 6 || response[0].WeatherIcon === 7 || response[0].WeatherIcon === 8 || response[0].WeatherIcon === 11 || response[0].WeatherIcon === 35 || response[0].WeatherIcon === 36 || response[0].WeatherIcon === 38) {
                  $("#displayWeather").html(response[0].WeatherText);
                  if (response[0].IsDayTime) {
                    $("#displayWeather").append($('<img src="weather-icons/cloudy.png" alt="cloudy">'));
                  } else {
                    $("#displayWeather").append($('<img src="weather-icons/nightcloudy.png" alt="cloudy night">'));
                  }
                  $("#displayWeather").append($('<p>' + response[0].Temperature.Imperial.Value + ' degrees</p>'));
                  $("body").css({ "background-image": "url('images/clouds-background.jpg')", "background-size": "cover", "background-repeat": "no-repeat", "background-position": "50% 50%" });
                  // Cloudy YouTube Playlist Links go here!
                  // need to update this with CLOUDY PLAYLIST
                  $("#video").append($('<iframe width="560" height="315" src='+playlists.sunny+'  frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>'));
                  // Cloudy Book Recommendation goes here!
                  var bookQueryURL = "https://www.googleapis.com/books/v1/volumes?&maxResults=1&apikey=AIzaSyD8qve3oh3rIrcjK3HBzcj-c4vo3WOWYWU";
                  $.ajax({
                    url: bookQueryURL,
                    method: "GET",
                    data: {
                      q: bookSuggestions.cloudy,
                    }
                  }).then (function (response){
                    $("#displayBook").append($('<p>'+response.items[0].volumeInfo.title+'</p>'));
                  })
                  $("#displayBook").append($('<img> src="' +response.items[0].volumeInfo.imageLinks.smallThumbnail+'">'));
                  console.log(response.items[0].volumeInfo.imageLinks.smallThumbnail);
                  // Rainy Scenario:
                } else if (response[0].WeatherIcon === 12 || response[0].WeatherIcon === 13 || response[0].WeatherIcon === 14 || response[0].WeatherIcon === 18 || response[0].WeatherIcon === 39 || response[0].WeatherIcon === 40) {
                  $("#displayWeather").html(response[0].WeatherText);
                  if (response[0].IsDayTime) {
                    $("#displayWeather").append($('<img src="weather-icons/rainy.png" alt="rainy">'));
                  } else {
                    $("#displayWeather").append($('<img src="weather-icons/nightrainy.png" alt="rainy night">'));
                  }
                  $("#displayWeather").append($('<p>' + response[0].Temperature.Imperial.Value + ' degrees</p>'));
                  $("body").css({ "background-image": "url('images/rain-background.jpg')", "background-size": "cover", "background-repeat": "no-repeat", "background-position": "50% 50%" });
                  // Rainy YouTube Playlist Links go here!
                  $("#video").append($('<iframe width="560" height="315" src='+playlists.rainy+'  frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>'));
                  // Rainy Book Recommendation goes here!

                  // Stormy Scenario:
                } else if (response[0].WeatherIcon === 15 || response[0].WeatherIcon === 16 || response[0].WeatherIcon === 17 || response[0].WeatherIcon === 41 || response[0].WeatherIcon === 42) {
                  $("#displayWeather").html(response[0].WeatherText);
                  if (response[0].IsDayTime) {
                    $("#displayWeather").append($('<img src="weather-icons/stormy.png" alt="stormy">'));
                  } else {
                    $("#displayWeather").append($('<img src="weather-icons/nightstormy.png" alt="stormy night">'));
                  }
                  $("#displayWeather").append($('<p>' + response[0].Temperature.Imperial.Value + ' degrees</p>'));
                  $("body").css({ "background-image": "url('images/thunder-background.jpg')", "background-size": "cover", "background-repeat": "no-repeat", "background-position": "50% 50%" });
                  // Stormy YouTube Playlist Links go here!
                  $("#video").append($('<iframe width="560" height="315" src='+playlists.stormy+'  frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>'));
                  // Stormy Book Recommendation goes here!

                  // Below - I figured I should add a snowy situation since there were so many potential snow weather situations
                  //Snowy Scenario:
                } else if (response[0].WeatherIcon === 19 || response[0].WeatherIcon === 20 || response[0].WeatherIcon === 21 || response[0].WeatherIcon === 22 || response[0].WeatherIcon === 23 || response[0].WeatherIcon === 24 || response[0].WeatherIcon === 25 || response[0].WeatherIcon === 26 || response[0].WeatherIcon === 29 || response[0].WeatherIcon === 43 || response[0].WeatherIcon === 44) {
                  $("#displayWeather").html(response[0].WeatherText);
                  if (response[0].IsDayTime) {
                    $("#displayWeather").append($('<img src="weather-icons/snowy.png" alt="snowy">'));
                  } else {
                    $("#displayWeather").append($('<img src="weather-icons/nightsnowy.png" alt="snowy night">'));
                  }
                  $("#displayWeather").append($('<p>' + response[0].Temperature.Imperial.Value + ' degrees</p>'));
                  $("body").css({ "background-image": "url('images/snow-background.jpg')", "background-size": "cover", "background-repeat": "no-repeat", "background-position": "50% 50%" });
                  // need to update this with the SNOWY playlist
                  $("#video").append($('<iframe width="560" height="315" src='+playlists.sunny+'  frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>'));
                } else {
                  //dealing with a couple random extra weather circumstances....
                  $("#displayWeather").html("It's either really hot, really cold, or windy.")
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
      //This function displays any errors the user may encounter when using geolocations.
  function showError(error) {
    switch (error.code) {
      case error.PERMISSION_DENIED:
        $("#displayWeather").html($("<p>User denied the request for Geolocation.</p>"));
        break;
      case error.POSITION_UNAVAILABLE:
        $("#displayWeather").html($("<p>Location information is unavailable.</p>"));
        break;
      case error.TIMEOUT:
        $("#displayWeather").html($("<p>The request to get user location timed out.</p>"));
        break;
      case error.UNKNOWN_ERROR:
        $("#displayWeather").html($("<p>An unknown error occurred.</p>"));

        break;
    }
  }

  // This is the function to get the user's permission to know their location
  function getLocation() {

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition,showError);

    } else {
      $("#displayWeather").html($("<p>Geolocation is not supported by this browser.</p>"));
    }
  }

  //Below we actually run the getLocation function. This will be the first thing to happen when the page loads!
  getLocation();















})


