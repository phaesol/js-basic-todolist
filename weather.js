const weather = document.querySelector('.js-weather');


const API_KEY ='b9670883eec163b863fe44fed8aef72f';
const COORDS = 'coords';

// function onGeoOk(position) {
//   const lat = position.coords.latitude;
//   const lon = position.coords.longitude;
//   const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
//   fetch(url)
//     .then((response) => response.json())
//     .then((data) => {
//       city.innerText = data.name;
//       weather.innerText = `${data.weather[0].main} @ ${data.main.temp}`;
//     });
// }
function getWeather(lat,lng){
    //데이터 가져올 때 백틱 사용, 새로고침 없이 자동으로 js 에서 데이터 가져와서 업데이트 // unit options 사용해서 단위 metric 으로 사용
    //then >> 데이터를 가져올 때 시간이 걸리는 경우, then 사용. then 이 하는 기본적인 역할은 함수를 호출하는 것이지만, 데이터가 완전히 들어온 후 호출 하는 역할로 여기서 작동.
    //await,async 와 같이 비동기 처리를 하는 것이라고 생각하면 됨. >> Promise 객체
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`)
    .then(function(response){
        //json 형태로 promise 객체가 pending 되어 대기 상태가 됨. 그래서 우리는 얘도 데이터를 다 가져올 때까지 기다려 줄거라서 then 을 한번 더 써줌.
        return response.json();
    }).then(function(json){
        //이렇게 해주면 최종적으로 js object 형태로 잘 들고 와짐.
        const temperature = json.main.temp;
        const place = json.name;
    
        weather.innerText = `${temperature}° ${json.weather[0].main}  @ ${place}`;
    })
}
function saveCoords(coordsObj){
    const location = localStorage.setItem(COORDS,JSON.stringify(coordsObj));
    console.log(location);
}


function handleGeoSuccess(position){
   const latitude =  position.coords.latitude;
   const longitude =  position.coords.longitude;
   const coordsObj ={
    //    latitude :latitude,
    //    longtitude : longtitude
    //object 에서 key 값과 value 의 값이 같음.
    latitude,
    longitude
   };

   saveCoords(coordsObj);
   getWeather(latitude,longitude)
}


function handleGeoError(){
    alert(' Cant access geo location ');
} 


function askForCoords(){
    
   navigator.geolocation.getCurrentPosition(handleGeoSuccess,handleGeoError);

    
}


function loadCoords(){
    const loadedCoords = localStorage.getItem(COORDS);
    if(loadedCoords === null){
        askForCoords();
       
    }else{
        const parseCoords = JSON.parse(loadedCoords);
        // getWeather();
        console.log(parseCoords);
        getWeather(parseCoords.latitude,parseCoords.longitude);
    }
}


function init(){
    loadCoords();
}

init();


// const weather = document.querySelector(".weather span:first-child");
// const city = document.querySelector(".weather span:last-child");
// const API_KEY = "b9670883eec163b863fe44fed8aef72f";

// const COORDS = 'coords';

// function onGeoOk(position) {
//   const lat = position.coords.latitude;
//   const lon = position.coords.longitude;
//   const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
//   fetch(url)
//     .then((response) => response.json())
//     .then((data) => {
//       city.innerText = data.name;
//       weather.innerText = `${data.weather[0].main} @ ${data.main.temp}`;
//     });
// }
// function onGeoError() {
//   alert("Can't find you. No weather for you.");
// }


// navigator.geolocation.getCurrentPosition(onGeoOk, onGeoError);
