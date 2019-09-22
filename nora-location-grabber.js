$( document ).ready(function() {
    // Saving user's weather location 
    var userLocation= document.getElementById("displayWeather");
    function getLocation() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
      } else {
        console.log("we can't get the location");
        showError();
      }
    }
    // function to grab user coordinates - still need to delete console.log
    function showPosition(position) {
        var latitude = position.coords.latitude
        var longitude = position.coords.longitude;
        console.log(latitude + "," + longitude);
        return (latitude + "," + longitude);
    }
    // function to show errors - need to sort this out still...
    function showError(error) {
        switch(error.code) {
          case error.PERMISSION_DENIED:
            console.log("User denied the request for Geolocation.");
            break;
          case error.POSITION_UNAVAILABLE:
            console.log("Location information is unavailable.");
            break;
          case error.TIMEOUT:
            console.log("The request to get user location timed out.");
            break;
          case error.UNKNOWN_ERROR:
            console.log("An unknown error occurred.");
            break;
        }
      }
    // var userLatLong = getLocation(userLocation);
    
    // var locationKey = function {
    // // var weatherLocationURL = "http://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=c5lAV7P9wARFOa8nA5SlxAkF2kwNMGwd&
    // // $.ajax({
    // //     url: weatherLocationURL,
    // //     method: "GET",
    // //     data: {
    // //         q
    // //     }
    // // })
    // }
    
    
    
    
    
    
    
    })