const COORDS = 'coords';
const API_KEY = "e98e4e6792510cf2d0c8177488acf7c6"; //날짜를 가져오기 위한 API_KEY 
//api는 다른 서버에서 데이터를 편리하게 가져오기 위한 수단, api를 제공하는 웹사이트들이 있다.
//openweathermap.org 에서 가져온 키임!
const weather = document.querySelector('.js-weather .weather__text');

function getWeather(lat, lng) { //fetch와 then의 사용법!! 꼭 익혀두기!!
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric` //fetch는 해당 주소에서 데이터를 가져오는 함수이다.
    ).then(function(response) { //데이터가 넘어왔을 때 인자인 function을 실행한다.(데이터가 완전히 들어온 다음 호출하는 함수) 
        //이 함수를 쓰지 않으면 데이터가 오지도 않은 상태에서 다음 작업을 하게되기 때문에 써야함
        return response.json();
    }).then(function(json) {
        const temperature = json.main.temp;
        const place = json.name;
        weather.innerText = `${Math.floor(temperature)}ºC, 장소 : ${place}`
    })

}
//자바스크립트는 웹사이트로 Request를 보내고 응답을 통해서 데이터를 얻을 수 있음!

function saveCoords(coordsObj) {
    localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function handleGeoSucces(position) { //askForcoords에서 호출되는 함수(즉 장소를 이미 알고 있음)
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const coordsObj = {
        latitude, //latitude=latitude와 같음
        longitude
    };
    saveCoords(coordsObj); //객체는 저장
    getWeather(latitude, longitude); //api를 통해 호출
}

function handleGeoError() {
    console.log('Cant access geo location');
}

function askForCoords() {
    navigator.geolocation.getCurrentPosition(handleGeoSucces, handleGeoError)
        //위치를 가져오는 API를 사용함! 성공했을 때의 함수를 왼쪽, 실패했을 때의 함수를 오른쪽에 인자로 넣기!
}

function loadCoords() {
    const loadedCoords = localStorage.getItem(COORDS);
    if (loadedCoords === null) {
        askForCoords();
    } else {
        //getWeather
        const parseCoords = JSON.parse(loadedCoords);
        getWeather(parseCoords.latitude, parseCoords.longitude);
    }
}

function init() {
    loadCoords();
}

init();