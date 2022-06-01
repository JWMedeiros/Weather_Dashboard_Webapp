let searchHistory = document.querySelector("#search-history");
let weather = document.querySelector("#city-weather");
let forecast = document.querySelector("#forecast");
let city= document.querySelector("#city");
let formEl = document.querySelector("#form")
let btn = document.querySelector("#btn-dark");

function openApplication(){
    getHistory();
}

let formSubmitHandler = function (event) {
    event.preventDefault();
  
    let search = city.value.trim();
  
    if (search) {
      getWeather(city);
      setHistory(city);
      //Clear fields?
    } else {
      alert('Please enter a city name');
    }
  };

function getWeather (searchContent){
    //API call, process data, create weather field
    //Then create 5-day forecast cards and append them

    //Fix link
    letapiUrl = 'https://api.github.com/users/' + user + '/repos';

    fetch(apiUrl)
        .then(function (response) {
        if (response.ok) {
            console.log(response);
            response.json().then(function (data) {
            console.log(data);
            //Do stuff
            });
        } else {
            alert('Error: ' + response.statusText);
        }
        })
        .catch(function (error) {
        alert('Unable to connect to the weather API');
    });
}


function getHistory(){
    let history = localStorage.getItem("history");
}

function setHistory(hist){
    //Save search term to localstorage, pop it in the array
}

formEl.addEventListener('submit', formSubmitHandler);
btn.addEventListener('click', formSubmitHandler);
openApplication();