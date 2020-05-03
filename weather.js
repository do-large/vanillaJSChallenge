const API_KEY = "766e32c1d2287670d34bee5d7f8b5d00";
const weather = document.querySelector('.js-weather h3');

const COORDS_LS = "coords";

function getWeather(lat, lon){
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
    ).then(function (response){
        return response.json();
    }).then(function (json){
        const temp = json.main.temp;
        const location = json.name;
        const state = json.weather[0].main;
        const img = showWeatherImoge(state);
        weather.innerText = `${temp}℃ ${img} @ ${location} `
    })
}

function showWeatherImoge(weather){
    switch(weather){
        case "Clear" : 
            return "🌞";
        case "Clouds" :
            return "⛅";
        case "Rain" :
        case "Mist" : 
            return "☔";
        case "Snow" : 
            return "⛄";
        case "Wind" : 
            return "🌀";
        default:
            return "";
    }
}
function saveCoords(coordsObj){
    localStorage.setItem(COORDS_LS, JSON.stringify(coordsObj));
}

function handleSuccess(position){
    const {coords : { latitude, longitude}} = position;
    const coordsObj = {
        latitude,
        longitude
    };
    saveCoords(coordsObj);
    
}

function askForCoords () {
    navigator.geolocation.getCurrentPosition(handleSuccess);
}

function init(){
    const coords = localStorage.getItem(COORDS_LS);
    if(coords === null){
        askForCoords();
    }else{
        const parsedCoords = JSON.parse(coords);
        getWeather(parsedCoords.latitude, parsedCoords.longitude);
    }
}

init();