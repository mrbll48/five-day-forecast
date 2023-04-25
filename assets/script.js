var searchBtnEl = document.getElementById('searchBtn')
var APIKey = 'a3df443072723cb37a1c2a55e24f5c42'
var city; 
function getWeather(event) {
    event.preventDefault();
    var requestUrl = 'https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}`.';
    var searchInputVal = document.getElementById('search-input')

    if (!searchInputVal) {
        console.error("You need to input a search value");
    }
}
fetch (requestUrl)
    .then(function (response) {
        return response.json();
    })
        .then(function (data) {
            console.log(data)
            for (var i = 0; i < data.length; i++) {
                var fiveDayForecast = ;
                var weatherCard = document.createElement('div');
                var weather = document.createElement('h4');
                weather.textContent = fiveDayForecast;
                weatherCard.appendChild(weather);

            }
        })

SearchBtnEl.addEventListener('click', getWeather);