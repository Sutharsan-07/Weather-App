const api = {
    key: "3f189860ec3255304a28fdcae163e957",
    base: "https://api.openweathermap.org/data/2.5/"
}

const searchbox = document.querySelector('.search-box');
searchbox.addEventListener('keypress', setQuery);

function setQuery(evt) {
    if (evt.keyCode == 13) // number 13 is the key for enter key in keyboard
    {
        getResults(searchbox.value);
    }
}

function getResults(query)
{
    fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
       .then(Weather => {
        return Weather.json();
       }).then(displayResults);
}

function displayResults(Weather)
{
    console.log(Weather);
    let city = document.querySelector('.location .city');
    city.innerText = `${Weather.name}, ${Weather.sys.country}`;

    let now = new Date();
    let date = document.querySelector('.location .date');
    date.innerText = dateBuilder(now);

    let temp = document.querySelector('.current .temperature');
    temp.innerHTML = `${Math.round(Weather.main.temp)}&degC`;

    let weather_el = document.querySelector('.current .Weather');
    weather_el.innerText = `${Weather.weather[0].main}`;
    
    let hilow = document.querySelector('.range');
    hilow.innerText = `${Math.floor(Weather.main.temp_min)}°C /  ${Math.ceil(Weather.main.temp_max)}°C`;

}

function dateBuilder(d) {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate()+"th";
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;
}
