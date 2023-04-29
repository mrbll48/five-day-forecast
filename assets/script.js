var searchBtnEl = document.getElementById('search-btn');
var APIKey = 'a3df443072723cb37a1c2a55e24f5c42';
var citySearch = document.getElementById('search-input');
var stateSearch = document.getElementById('state-search');
var forecastArea = document.getElementById('five-day');
var prevSearch = document.getElementById('prev-search');
var prevBtn;

// function to get the latitude and longitude of the searched city
function getLocation(event) {
    
    var requestUrl = 'http://api.openweathermap.org/geo/1.0/direct?q=' + citySearch.value + ',' + stateSearch.value + ',US&limit=5&appid=' + APIKey;
    event.preventDefault()
    fetch (requestUrl)
        .then(function (response) {
            return response.json();
        })
            .then(function (data) {
                console.log(data);
                var latitude = data[0].lat
                var longitude = data[0].lon
                getWeather(latitude, longitude)
        })
        localStore();
}
// function to get weather based on latitude and longitude 
function getWeather(lat, lon) {
    var requestForecast = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${APIKey}&units=imperial`
    var requestWeather = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${APIKey}&units=imperial`
    fetch (requestWeather)
    .then(function (response) {
        return response.json();
    })
        .then(function (currentWeather) {
            console.log(currentWeather);
            fetch (requestForecast)
            .then(function (response) {
                return response.json();
            })
            .then(function(forecastWeather){
                console.log(forecastWeather)
                displayCurrentWeather(currentWeather)
                displayForecast(forecastWeather)
            })
    })
}
// function to display the current weather
function displayCurrentWeather(currentWeather) {
    var cityName = document.getElementById('city-name');
    var weatherIcon = document.getElementById('weather-icon');
    var temperature = document.getElementById('temperature')
    var windSpeed = document.getElementById('wind')
    var humidity = document.getElementById('humidity')
    var currentDate = dayjs().format('M/DD/YYYY')
    cityName.textContent = currentWeather.name + ' (' + currentDate + ')' 
    weatherIcon.setAttribute('src', `https://openweathermap.org/img/wn/${currentWeather.weather[0].icon}.png`)
    temperature.textContent = 'Temp: ' + currentWeather.main.temp + ' °F'
    windSpeed.textContent = 'Wind: ' + currentWeather.wind.speed + ' MPH'
    humidity.textContent = 'Humidity: ' + currentWeather.main.humidity + '%'
}
// function to display the weather for the next 5 days
function displayForecast(forecastWeather) {
    console.log(forecastWeather)
    // loop to generate cards and place the forecast data into the cards
    for (var i = 1; i < 40; i+=8) {
        var fiveDayTemp = 'Temp: ' + forecastWeather.list[i].main.temp + ' °F';
        var fiveDayWind = 'Wind: ' + forecastWeather.list[i].wind.speed + ' MPH';
        var fiveDayHumidity = 'Humidity: ' + forecastWeather.list[i].main.humidity + '%';
        var fiveDayDate = forecastWeather.list[i].dt * 1000
        var weatherCard = document.createElement('div');
        var date = document.createElement('p');
        var weather = document.createElement('p');
        var windSpeed = document.createElement('p');
        var humidity = document.createElement('p');
        var weatherIcon = document.createElement('img')
        var dates = new Date(fiveDayDate);
        var dateFormat = dates.toDateString();
        console.log(dateFormat)
        weather.textContent = fiveDayTemp;
        windSpeed.textContent = fiveDayWind;
        humidity.textContent = fiveDayHumidity;
        date.textContent = dateFormat;
        weatherIcon.setAttribute('src', `https://openweathermap.org/img/wn/${forecastWeather.list[i].weather[0].icon}.png`);
        weatherCard.setAttribute('id', 'weather-card');
        date.setAttribute('id', 'date')
        forecastArea.appendChild(weatherCard);
        weatherCard.appendChild(date);
        weatherCard.appendChild(weatherIcon);
        weatherCard.appendChild(weather);
        weatherCard.appendChild(windSpeed);
        weatherCard.appendChild(humidity);
    }
}
// function to store previous searches made in local storage, and generate buttons to redo the search 
function localStore() {
    var previousSearches = JSON.parse(localStorage.getItem('city')) || [];
    previousSearches.push(citySearch.value);
    localStorage.setItem('city', JSON.stringify(previousSearches));
    console.log(localStorage.getItem('city'));

    for (var i = 0; i < previousSearches.length; i++) {
        var prevBtn= document.createElement('button');
        prevBtn.setAttribute('id', 'btn')
        prevBtn.textContent = previousSearches[i];
        prevSearch.appendChild(prevBtn)
        
    }
    console.log(prevBtn)
    activatePrevBtn()
}

function activatePrevBtn() {
    document.getElementById('btn').addEventListener('click', getPrevLocation)
}

function getPrevLocation(event) {
    var requestUrl = 'http://api.openweathermap.org/geo/1.0/direct?q=' + citySearch.value + ',US&limit=5&appid=' + APIKey;
    event.preventDefault()
    console.log(requestUrl)
    console.log(prevBtn)
    fetch (requestUrl)
        .then(function (response) {
            return response.json();
        })
            .then(function (data) {
                console.log(data);
                var lat = data[0].lat
                var lon = data[0].lon
                getPrevForecast(lat, lon)
        })


}

function getPrevForecast(lat, lon) {
    var requestForecast = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${APIKey}&units=imperial`
    var requestWeather = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${APIKey}&units=imperial`
    console.log(requestWeather)
    fetch (requestWeather)
    .then(function (response) {
        return response.json();
    })
        .then(function (currentWeather) {
            console.log(currentWeather);
            fetch (requestForecast)
            .then(function (response) {
                return response.json();
            })
            .then(function(forecastWeather){
                console.log(forecastWeather)
                displayCurrentWeather(currentWeather)
                displayForecast(forecastWeather)
            })
    })
}
console.log(prevBtn)
console.log(localStorage.getItem('city'))
searchBtnEl.addEventListener('click', getLocation);
