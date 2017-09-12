var openWeatherMap = "http://api.openweathermap.org/data/2.5/weather";
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
           
            if(description.indexOf("Clouds") > -1){
                $("#weatherIcon").attr("src", "https://ssl.gstatic.com/onebox/weather/64/partly_cloudy.png");
                $("body").css("background", "url(http://emanbilisim.com/weather4/javascript-premium-weather-widget/bins/assets/bg-cloudy-day.jpg) no-repeat fixed center");
            }
            else if(description.indexOf("Cloudy") > -1){
                $("#weatherIcon").attr("src", "https://ssl.gstatic.com/onebox/weather/64/cloudy.png");
                $("body").css("background", "url(http://emanbilisim.com/weather4/javascript-premium-weather-widget/bins/assets/bg-cloudy-day.jpg) no-repeat fixed center");
            }
            else if(description.indexOf("Sun") > -1){
                $("#weatherIcon").attr("src", "https://ssl.gstatic.com/onebox/weather/64/sunny.png");
                $("body").css("background", "url(http://cdn.weatheravenue.com/img/background/background.jpg) no-repeat fixed center");
            }
            else if(description.indexOf("Snow") > -1){
                $("#weatherIcon").attr("src", "https://ssl.gstatic.com/onebox/weather/64/snow.png");
                $("body").css("background", "url(http://www.wallpaperawesome.com/wallpapers-awesome/wallpapers-weather-clouds-tornado-rain-cyclone-flashlights-awesome/wallpaper-snowing-in-the-trees-weather.jpg) no-repeat fixed center");
            }
            else if(description.indexOf("Rain")){
                $("#weatherIcon").attr("src", "https://ssl.gstatic.com/onebox/weather/64/rain_s_cloudy.png");
                $("body").css("background", "url(https://cdn.pixabay.com/photo/2014/04/05/11/39/rain-316579_960_720.jpg) no-repeat fixed center");
            }
        });
    });
    };
    $("button").click(function(){
        var C = $("#temp").text();
        var F = C*9/5 + 32;
        $("#temp").text(F);
        $("#degreeType").text("F ");
    }); 

