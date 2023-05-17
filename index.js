const Apikey = "4153f60313cc0ee9135ee3e189a729cb";
const ApiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const SearchInput = document.querySelector(".search input");
const SearchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");
const CurrentLocation = document.querySelector(".currentLocation");
const AppBody = document.querySelector(".weather");





async function CheckWeather(city){
    const responce = await fetch(ApiUrl + city + `&appid=${Apikey}`)
    var data = await responce.json();
    console.log(data)

    document.querySelector(".city").innerHTML = data.name ;
    document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + `<sup>o</sup>c`;
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%" ;
    document.querySelector(".wind").innerHTML = data.wind.speed + " "+"km/hr" ;

    if(data.weather[0].main=="Clouds"){
        weatherIcon.src = "/WeatherApp/images/clouds.png";
    }
    else if(data.weather[0].main == "Rain"){
        weatherIcon.src = "/WeatherApp/images/rain.png";
    }
    else if(data.weather[0].main == "Clear"){
        weatherIcon.src = "/WeatherApp/images/clear.png";
    }
    else if(data.weather[0].main == "Drizzle"){
        weatherIcon.src = "/WeatherApp/images/drizzle.png";
    }
    else if(data.weather[0].main == "Mist"){
        weatherIcon.src = "/WeatherApp/images/mist.png";
    }

    document.querySelector(".weather").style.display="block"
}

SearchBtn.addEventListener("click",()=>{
    CheckWeather(SearchInput.value)
})

CurrentLocation.addEventListener("click",()=>{
    AppBody.style.display = "block"
    if(navigator.geolocation){
         navigator.geolocation.getCurrentPosition((position)=>{
              let latitude = position.coords.latitude ;
              let longitude = position.coords.longitude ;
              console.log(`latitude : ${latitude} + longi : ${longitude}`)
              let cityapi = "https://api.opencagedata.com/geocode/v1/json?q="
              let apikey = "4f9d15e2f6764dbd8457ecf82feba454"
              async function getCityDetail(){
                let Apidata = await fetch (cityapi + `${latitude} + ${longitude}` + `&key=${apikey}`) ;
                let data = await Apidata.json() ;
                let cityName = data.results[0].components.city
                CheckWeather(cityName)
              }
              getCityDetail()
         },(error)=>{
            if(error.code = 0){
                alert("Unknow Error")
            }
            else if(error.code = 1){
                alert("Permission deniyed")
            }
            else if(error.code = 2){
                alert("Position not available")
            }
            else if(error.code = 3){
                alert("Taking Long time ")
            }
            
         })
        
    }else{
        AppBody.innerHTML = "your browser is outdated"
    }

    
})


