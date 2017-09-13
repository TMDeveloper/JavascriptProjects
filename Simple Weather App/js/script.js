var openWeatherMap = "https://api.openweathermap.org/data/2.5/weather";
    if (window.navigator && window.navigator.geolocation) {
        window.navigator.geolocation.getCurrentPosition(function(position) {
        $.getJSON(openWeatherMap, {
            lat: position.coords.latitude,
            lon: position.coords.longitude,
            units: "metric",
            APPID: "3a04160c46b58635945f4ebf4751d6a6"
        }).done(function(weather) {
            $("#location").text(weather.name + ", " + weather.sys.country);
            $("#description").text(weather.weather[0].description);
            $("#temp").text(weather.main.temp);
            $("#humidity").text(weather.main.humidity + "% ");
            $("#wind").text(weather.wind.speed + "Km/h");

          var description = weather.weather[0].main;
            console.log(description);
           
            if(description.indexOf("Clouds") > -1 || description.indexOf("few clouds") > -1 || description.indexOf("Cloudy") > -1){
                $("#weatherIcon").attr("src", "images/partly_cloudy.png");
                $("body").css("background", "url(images/cloudy_day.jpg) no-repeat fixed center");
            }
            else if(description.indexOf("Sun") > -1 || description.indexOf("Sunny day") > -1 || description.indexOf("sunny") > -1){
                $("#weatherIcon").attr("src", "images/sunny.png");
                $("body").css("background", "url(images/sunny_day.jpg) no-repeat fixed center");
            }
            else if(description.indexOf("Snow") > -1 || description.indexOf("snowing") > -1){
                $("#weatherIcon").attr("src", "images/snow.png");
                $("body").css("background", "url(images/snow_day.jpg) no-repeat fixed center");
            }
            else if(description.indexOf("Rain") > -1 || description.indexOf("rainy") >-1 ){
                $("#weatherIcon").attr("src", "images/rain_cloudy.png");
                $("body").css("background", "url(images/rainy_day.jpg) no-repeat fixed center");
            }
        });
    });
    }
    $("button").click(function(){
        var C = $("#temp").text();
        var F = C*9/5 + 32;
        $("#temp").text(F);
        $("#degreeType").text("F ");
    }); 

