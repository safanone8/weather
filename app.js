const BASE_URL = "https://api.weatherapi.com/v1/current.json?key=fe6b634ab8544aff89e40749241908";
const searchVal = document.querySelector("#search");
let btn = document.querySelector("#submitSearch");
let weatherDetails = document.querySelector("#weatherDetails");

const updateWeather = async(searchLoc) => {
    let loc = searchLoc;
    let days = 1;
    let airQualityIndex = "yes";

    const updated_URl = `${BASE_URL}&q=${loc}&days=${days}&aqi=${airQualityIndex}`

    let response = await fetch(updated_URl);
    let data = await response.json();
    console.log(data);

    let temp_c = data.current.temp_c;
    let temp_f= data.current.temp_f;
    let feel_like = data.current.feelslike_c;
    let humidity = data.current.humidity;
    let visiblity = data.current.vis_km;
    let windDir = data.current.wind_dir;
    let windSpeed = data.current.wind_kph;
    let airQuality = data.current.air_quality.co;

    if(airQuality < 50){
        airQuality = "Good"
    }
    else if(airQuality > 50 && airQuality <= 100){
        airQuality = "Moderate"
    }else if(airQuality > 100 && airQuality <= 150){
        airQuality = "Unhealthy for Sensitive Groups"
    }else if(airQuality > 150 && airQuality <= 200){
        airQuality = "Unhealthy"
    }else if(airQuality > 200 && airQuality <= 300){
        airQuality = "Very Unhealthy"
    }else if(airQuality > 300){
        airQuality = "Hazardous"
    }

    weatherDetails.innerHTML = "";

    const newPara = document.createElement("p");
    newPara.innerText = `Here is your weather report of ${searchLoc} \n\n Temp (C) : ${temp_c}C \n Temp (F) : ${temp_f} \n Feels Like : ${feel_like} \n Humidity : ${humidity} % \n airQuality : ${airQuality} \n Visiblity : ${visiblity} Km \n Wind Direction : ${windDir} \n Wind Speed : ${windSpeed}`;

    weatherDetails.appendChild(newPara);
    
    searchVal.focus();

}



btn.addEventListener("click", () => {
    if (searchVal.value === ""){
        alert("The input is empty")
    }
    let searchLoc = searchVal.value.trim();
    updateWeather(searchLoc);
})












// http://api.weatherapi.com/v1/forecast.json?key=&q=London&days=5&aqi=no&alerts=no