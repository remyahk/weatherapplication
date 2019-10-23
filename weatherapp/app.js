let appid = "dae482518ffe8a6c12637af0fc67ed61";
let unit = "imperial";
let searchmethod;
// searchcity/zip method
function getsearch(searchitem) {
  if (
    searchitem.length === 5 &&
    Number.parseInt(searchitem) + "" === searchitem
  ) {
    searchmethod = "zip";
  } else {
    searchmethod = "q";
  }
}

// fetch from server
function searchweather(searchitem) {
  getsearch(searchitem);
  fetch(
    `http://api.openweathermap.org/data/2.5/weather?${searchmethod}=${searchitem}&APPID=${appid}&units=${unit}`
  )
    .then(result => {
      return result.json();
    })
    .then(result => init(result));
}

function init(resultfromserver) {
  switch (resultfromserver.weather[0].main) {
    case "Thunderstorm":
      document.body.style.backgroundImage = 'url("thunder.jpeg")';
      break;
    case "Drizzle":
    case "Rain":
    case "Atmosphere":
      document.body.style.backgroundImage = 'url("rain.jpeg")';
      break;
    case "Snow":
      document.body.style.backgroundImage = 'url("snow.jpg")';
      break;
    case "Clear":
      document.body.style.backgroundImage = 'url("clear.jpg")';
      break;
    case "Clouds":
      document.body.style.backgroundImage = 'url("cloudy.jpeg")';
      break;
    default:
      break;
  }
  let temperaturedescription = document.getElementById(
    "temperaturedescription"
  );
  let cityheader = document.getElementById("cityheader");
  let temperature = document.getElementById("temperature");
  let datte = document.getElementById("datenow");
  let winddesc = document.getElementById("winddesc");
  let humidity = document.getElementById("humidity");
  let documenticon = document.getElementById("documenticon");
  documenticon.src =
    "http://openweathermap.org/img/wn/" +
    resultfromserver.weather[0].icon +
    ".png";
  let weatherdescription = resultfromserver.weather[0].description;
  temperaturedescription.innerText =
    weatherdescription.charAt(0).toUpperCase() + weatherdescription.slice(1);
  temperature.innerHTML = Math.floor(resultfromserver.main.temp) + "&#176";
  winddesc.innerHTML =
    "Wind at " + Math.floor(resultfromserver.wind.speed) + " m/s";
  cityheader.innerHTML =
    resultfromserver.name + "," + resultfromserver.sys.country;
  humidity.innerHTML = "Humdity at " + resultfromserver.main.humidity + " %";

  // var targetDate = resultfromserver.dt;
  // datte.innerHTML =
  //   targetDate.getTime() / 1000 + targetDate.getTimezoneOffset() * 60;
  // d.getUTCDate() +
  // "/" +
  // d.getUTCMonth() +
  // "/" +
  // d.getUTCFullYear() +
  // "  " +
  // d.getUTCHours() +
  // ":" +
  // d.getUTCMinutes(2);
  var rightNow = new Date();
  var res = rightNow
    .toISOString()
    .slice(0, new Date().toISOString().indexOf("T"))
    .replace(/-[^0-9]/g, "");

  datte.innerHTML = res;

  weathersetinfo();
}

//search button initialize

let searchbtn = document.getElementById("searchbutton");
searchbtn.addEventListener("click", () => {
  let searchitem = document.getElementById("searchinput").value;
  if (searchitem) {
    searchweather(searchitem);
  }
});

//weather description visibility

function weathersetinfo() {
  let weathercontainer = document.getElementById("weather");
  let weathercontainerheight = weathercontainer.clientHeight;
  let weathercontainerwidth = weathercontainer.clientWidth;
  weathercontainer.style.left = `calc(50% - ${weathercontainerwidth / 1.2}px)`;
  weathercontainer.style.top = `calc(50% - ${weathercontainerheight / 2}px)`;
  weathercontainer.style.visibility = "visible";
}
