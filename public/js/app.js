var fetchWeather = "/weather";

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');

const weatherIcon = document.querySelector('.weatherIcon i');


const weatherCondition = document.querySelector('.weatherCondition');


const tempElement = document.querySelector('.temperature span');


const locationElement = document.querySelector('.place');


const humidityElement = document.querySelector('.humidity');


const pressureElement = document.querySelector('.pressure');


const dateElement = document.querySelector('.date');


const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

dateElement.textContent= new Date().getDate() + "," +monthNames[new Date().getMonth()];



weatherForm.addEventListener('submit',(event)=>{
    event.preventDefault();
    console.log(search.value);
    locationElement.textContent="Loading...";
    tempElement.textContent= "";
    weatherCondition.textContent="";
    humidityElement.textContent="";
    pressureElement.textContent="";

    const locationApi = fetchWeather + "?address=" + search.value;
    fetch(locationApi).then(response=>{
       response.json().then(data=>{
        if(data.error){ 
            locationElement.textContent=data.error;
            tempElement.textContent= "";
            weatherCondition.textContent="";
            humidityElement.textContent="";
            pressureElement.textContent="";
    }else{
        if(data.description === "rain" || data.description === "fog"){
            weatherIcon.className = "wi wi-day-"+data.description
        }else{
            weatherIcon.className = "wi wi-day-cloudy";
           
        }
        locationElement.textContent=data.cityName;
        tempElement.textContent= (data.temperature-273.5).toFixed(1) + String.fromCharCode(176);
        weatherCondition.textContent=data.description.toUpperCase();
        humidityElement.textContent=" HUMIDITY:"+data.humidity;
        pressureElement.textContent=" PRESSURE:"+data.pressure;
    }
       }) 
    })
})