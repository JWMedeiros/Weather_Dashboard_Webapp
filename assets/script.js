let searchHistory = document.querySelector("#search-history");
let weather = document.querySelector("#city-weather");
let forecast = document.querySelector("#forecast");
let city= document.querySelector("#city");
let formEl = document.querySelector("#form")
let btn = document.querySelector(".btn-dark");

function openApplication(){
    getHistory();
}

let formSubmitHandler = function (event) {
    event.preventDefault();
  
    let search = city.value.trim();
  
    if (search) {
      getWeather(search);
      setHistory(search);
      city.value=""
    } else {
      alert('Please enter a city name');
    }
};

function getWeather (searchContent){
    //API call, process data, create weather field
    //Then create 5-day forecast cards and append them
    let apiUrl = 'https://api.openweathermap.org/data/2.5/weather?q='+searchContent+'&appid=618a3004eb9f5b56db1be77c9d75e5fc';

    fetch(apiUrl)
        .then(function (response) {
        if (response.ok) {
            response.json().then(function (data) {
                let lat=data.coord.lat;
                let long =data.coord.lon;
                let indexURL=("https://api.openweathermap.org/data/2.5/onecall?lat="+lat+"&lon="+long+"&appid=618a3004eb9f5b56db1be77c9d75e5fc");
                fetch (indexURL)
                    .then(function(resp){
                        if (resp.ok){
                            resp.json().then(function(data2){
                                weather.classList.remove("hidden");
                                weather.children[0].textContent=(data.name+" weather for "+moment().format("MMM, Do YYYY")+" ");
                                weather.children[1].setAttribute("src","http://openweathermap.org/img/wn/"+data.weather[0].icon+"@2x.png");
                                weather.children[2].textContent=("Temperature: "+((data.main.temp-273.15).toFixed(2))+" degrees Celsius")
                                weather.children[3].textContent=("Windspeed: "+data.wind.speed+" MPH")
                                weather.children[4].textContent=("Humidity: "+data.main.humidity+"%")
                                weather.children[5].textContent=("UV Index: "+data2.current.uvi)
                                if (data2.current.uvi>2&&data2.current.uvi<=5){
                                    weather.setAttribute("style","background-color: yellow")
                                }
                                else if (data2.current.uvi>5){
                                    weather.setAttribute("style","background-color: red")
                                }
                                else{
                                    weather.setAttribute("style","background-color: green")
                                }
                                setHistory(data.name);
                                set5DayForecast(lat,long);
                            })
                        }
                    })
            });
        } else {
            alert('Error: ' + response.statusText);
        }
        })
        .catch(function (error) {
        alert('Unable to connect to the weather API');
    });
}

function set5DayForecast(lat,long){
    let url = "https://api.openweathermap.org/data/2.5/forecast?lat="+lat+"&lon="+long+"&appid=618a3004eb9f5b56db1be77c9d75e5fc";
    fetch(url)
        .then(function (response){
            if (response.ok){
                response.json().then(function(data){
                    forecast.classList.remove("hidden");
                    for (let i=3;i<data.list.length;i+=8){
                        let card =document.createElement("section");
                        let h6=document.createElement("h6");
                        let p1=document.createElement("img");
                        let p2=document.createElement("p");
                        let p3=document.createElement("p");
                        let p4=document.createElement("p");
                        //Set textContents
                        h6.textContent=(data.list[i].dt_txt);
                        p1.setAttribute("src","http://openweathermap.org/img/wn/"+data.list[i].weather[0].icon+"@2x.png")
                        p2.textContent=("Temperature: "+((data.list[i].main.temp-273.15).toFixed(2))+" degrees Celsius");
                        p3.textContent=("Windspeed: "+data.list[i].wind.speed+" MPH");
                        p4.textContent=("Humidity: "+data.list[i].main.humidity+"%");
                        card.appendChild(h6);
                        card.appendChild(p1);
                        card.appendChild(p2);
                        card.appendChild(p3);
                        card.appendChild(p4);
                        forecast.appendChild(card);
                    }
                });
            }
        });

}


function getHistory(){
    let history = JSON.parse(localStorage.getItem("history"));
    console.log(history);
    if (history===null){
        localStorage.setItem("history","[]")
    }
    else{
        for (let i=0;i<history.length;i++){
            console.log(history.length)
            let btn =document.createElement("button");
            btn.textContent=history[i];
            btn.addEventListener("click",function(){
                getWeather(btn.textContent)
            })
            searchHistory.appendChild(btn);
            console.log("done")
        }
    }
}

function setHistory(hist){
    let cities=JSON.parse(localStorage.getItem("history"));
    console.log("setHistory");
    cities.push(hist);
    localStorage.setItem("history",JSON.stringify(cities));
    getHistory();
}

formEl.addEventListener('submit', formSubmitHandler);
btn.addEventListener('click', formSubmitHandler);
openApplication();