var data, weatherForecastVariable;
var click = false;
//Using fetch() to get weather forecast
async function forecastGetter()
{
  try
  {
    let answer = await fetch("https://data.weather.gov.hk/weatherAPI/opendata/weather.php?dataType=fnd&lang=en");
    if (answer.status === 200)
    {
      weatherForecastVariable = await answer.json();
    }
    else
    {
      console.log(weatherForecastVariable);
    }
  }
  catch (err)
  {
    console.log("Fetch Error");
  }
}


//Using fetch() to get current weather
async function currentTempGetter()
{
  try
  {
    let answer = await fetch("https://data.weather.gov.hk/weatherAPI/opendata/weather.php?dataType=rhrread&lang=en");
    if (answer.status === 200)
    {
      data = await answer.json();
    } else
    {
      console.log(data);
    }
  }
  catch (err)
  {
    console.log("Fetch Error");
  }
}


//function to show warning message while hovering, if any present
function warningForMouseOver()
 {
  if (click === true)
  {
    let warns = document.getElementsByClassName("warningMssg"); let buttonForWarning = document.getElementsByClassName("warning");
    buttonForWarning[0].style.borderBottomRightRadius = "15px"; buttonForWarning[0].style.borderBottomLeftRadius = "15px";
    warns[0].style.display = "none"; click = false;
  }
  else
  {
    let warns = document.getElementsByClassName("warningMssg"); let buttonForWarning = document.getElementsByClassName("warning");
    buttonForWarning[0].style.borderBottomRightRadius = "15px"; buttonForWarning[0].style.borderBottomLeftRadius = "15px";
    warns[0].style.display = "block"; click = true;
  }
}

async function fn123()
 {


  let xyz = await currentTempGetter();
  const temporar = data.temperature.data;
  BannerOnTop = document.createElement("div");
  reload = document.createElement("div");
  header = document.createElement("div");
  content = document.createElement("div");
  warning = document.createElement("buttonForWarning");
  warningImage = document.createElement("img"); warningMssg = document.createElement("div");
  weatherLogoIcon = document.createElement("div"); weatherImages = document.createElement("img");
  tempIcon = document.createElement("div"); tempImages = document.createElement("img"); temp = document.createElement("div");
  rainIcon = document.createElement("div"); rainImage = document.createElement("img"); rain = document.createElement("div");
  humidIcon = document.createElement("div"); humidityImage = document.createElement("img"); humid = document.createElement("div");
  UVIcon = document.createElement("div"); UVImage = document.createElement("img"); UV = document.createElement("div");
  time = document.createElement("div");
  choices = document.createElement("div");
  tempOption = document.createElement("span"); foreOption = document.createElement("span");
  mainBody = document.createElement("div");



  reload.classList.add("reload");
  BannerOnTop.classList.add("BannerOnTop");
  header.classList.add("header");
  content.classList.add("content");
  weatherLogoIcon.classList.add("weatherLogoIcon"); weatherImages.classList.add("weatherImages");
  tempIcon.classList.add("tempIcon"); tempImages.classList.add("tempImages");
  humidIcon.classList.add("humidIcon"); humidityImage.classList.add("humidityImage");
  rainIcon.classList.add("rainIcon"); rainImage.classList.add("rainImage");
  UVIcon.classList.add("UVIcon"); UVImage.classList.add("UVImage"); UV.classList.add("UV");
  warning.classList.add("warning"); warningImage.classList.add("warningImage"); warningMssg.classList.add("warningMssg");
  time.classList.add("time");
  choices.classList.add("choices");
  tempOption.classList.add("myChoiceSelected");
  mainBody.classList.add("mainBody");



  reload.addEventListener("click", reloadingThePage);


  var iconOfTheWeather = data.icon[0] + ".png";
  weatherImages.src = "https://www.hko.gov.hk/images/HKOWxIconOutline/pic" + iconOfTheWeather;
  humidityImage.src = "images/drop.png";
  warningImage.src = "images/arrow.png";
  tempImages.src = "images/thermometer.png";
  rainImage.src = "images/rain.png";
  UVImage.src = "images/UVindex.png";



  warning.addEventListener("click", warningForMouseOver);
  foreOption.addEventListener("click", fn456);

  reload.appendChild(document.createTextNode("↻"));
  header.appendChild(document.createTextNode("Weather in Hong Kong"));



  var A = data.temperature.data[1].value;
  var B = data.humidity.data[0].value;
  var C = data.rainfall.data[13].max;
  var stringNumerOne = A + "\u2103";
  var stringNumberTwo = B + "%";
  var stringNumberThree = C + "mm";
  temp.appendChild(document.createTextNode(stringNumerOne));
  humid.appendChild(document.createTextNode(stringNumberTwo));
  rain.appendChild(document.createTextNode(stringNumberThree));



  if (data.uvindex.length == 0)
  {
    UVIcon.style.display = "none";
  }
  else
  {
    UV.appendChild(document.createTextNode(data.uvindex.data[0].value));
    UVIcon.style.display = "block";
  }

  warning.appendChild(document.createTextNode("Warning"));
  warning.appendChild(warningImage);

  if (data.warningMessage.length == 0)
  {
    warning.style.display = "none";
  }
  else
   {
    warning.style.display = "block";
    warningMssg.appendChild(document.createTextNode(data.warningMessage[0]));
  }

  warningMssg.style.display = "none";
  time.appendChild(
    document.createTextNode("Last Update: " + data.updateTime.substring(11, 16))
  );
  foreOption.appendChild(document.createTextNode("Forecast"));
  tempOption.appendChild(document.createTextNode("Temperature"));


  temporar.forEach((element, index) =>
  {


    let mainBox = document.createElement("div"); let cancelButtonClick = document.createElement("img");
    let location = document.createElement("div"); let temperature = document.createElement("div");
    mainBox.classList.add("mainBox"); cancelButtonClick.classList.add("cancelButtonClick");
    location.classList.add("location"); temperature.classList.add("temperature");
    cancelButtonClick.src = "images/cancel.ico";
    location.appendChild(document.createTextNode(element.place));
    temperature.appendChild(document.createTextNode(element.value + "\u2103"));
    mainBox.appendChild(cancelButtonClick); mainBox.appendChild(location); mainBox.appendChild(temperature);
    mainBody.appendChild(mainBox);



    cancelButtonClick.onclick = function ()
    {
      mainBody.childNodes[index].style.display = "none";
    };
  });


  weatherLogoIcon.appendChild(weatherImages);
  humidIcon.appendChild(humidityImage); humidIcon.appendChild(humid);
  tempIcon.appendChild(tempImages); tempIcon.appendChild(temp);
  UVIcon.appendChild(UVImage); UVIcon.appendChild(UV);
  rainIcon.appendChild(rainImage); rainIcon.appendChild(rain);
  content.appendChild(weatherLogoIcon); content.appendChild(tempIcon); content.appendChild(humidIcon); content.appendChild(rainIcon); content.appendChild(UVIcon);
  document.body.appendChild(BannerOnTop);
  BannerOnTop.appendChild(header); BannerOnTop.appendChild(reload); BannerOnTop.appendChild(content); BannerOnTop.appendChild(warning); BannerOnTop.appendChild(warningMssg);
  choices.appendChild(tempOption); choices.appendChild(foreOption);
  BannerOnTop.appendChild(time);
  document.body.appendChild(choices); document.body.appendChild(mainBody);


}

async function fn456()
{
  let xyz = await currentTempGetter();
  let abc = await forecastGetter();
  const weatherForecastInfo = weatherForecastVariable.weatherForecast;


  tempOption.classList.remove("myChoiceSelected");
  foreOption.classList.add("myChoiceSelected");
  foreOption.removeEventListener("click", fn456);
  tempOption.addEventListener("click", reloadingThePage);
  var Y = data.icon[0]
  var iconOfTheWeather = Y + ".png";
  weatherImages.src = "https://www.hko.gov.hk/images/HKOWxIconOutline/pic" + iconOfTheWeather;



  var A = data.temperature.data[1].value;
  var B = data.humidity.data[0].value;
  var C = data.rainfall.data[13].max;
  var stringNumerOne = A + "\u2103";
  var stringNumberTwo = B + "%";
  var stringNumberThree = C + "mm";
  temp.innerHTML = stringNumerOne;
  humid.innerHTML = stringNumberTwo;
  rain.innerHTML = stringNumberThree;


  var L = data.uvindex.length ;
  if (L!= 0)
  {
    var X  =  data.uvindex.data[0].value;
    UV.innerHTML = X;
    UVIcon.style.display = "block";
  }
  else
  {
    UVIcon.style.display = "none";
  }
  var L2 = data.warningMessage.length ;
  if (L2!= 0)
  {
    warning.style.display = "block";
    warningMssg.innerHTML = data.warningMessage[0];
  }
  else
  {
    warning.style.display = "none";
  }
  warningMssg.style.display = "none";
  time.innerHTML = "Last Update: " + data.updateTime.substring(14, 19);
  while(mainBody.firstChild)
  {
    mainBody.removeChild(mainBody.firstChild)
  }
  weatherForecastInfo.forEach((element) =>
  {


    let foreBox = document.createElement("div"); let foreWeather = document.createElement("img");
    let forecastDate = document.createElement("div"); let forecastDay = document.createElement("div");
    let forecastTemp = document.createElement("div"); let forecastHumid = document.createElement("div");

    forecastTemp.classList.add("forecastTemp"); forecastHumid.classList.add("forecastHumid");
    foreBox.classList.add("foreBox"); foreWeather.classList.add("foreWeather");
    forecastDate.classList.add("forecastDate"); forecastDay.classList.add("forecastDay");
    foreWeather.src = "https://www.hko.gov.hk/images/HKOWxIconOutline/pic" + element.ForecastIcon + ".png";


    var E = element.forecastDate.length;
    var G = element.forecastMintemp.value;
    var H = element.forecastMaxtemp.value;
    var F = element.forecastMinrh.value ;
    var FMAx = element.forecastMaxrh.value;


    forecastDate.appendChild(document.createTextNode(element.forecastDate.slice(E - 2, E) + "/" + element.forecastDate.slice(E - 4 , E - 2)));
    forecastDay.appendChild(document.createTextNode(element.week));
    forecastTemp.appendChild(document.createTextNode(G +"\u2103" + " | " + H +"\u2103"));
    forecastHumid.appendChild(document.createTextNode(F + "%" + " - " + FMAx + "%"));
    foreBox.appendChild(foreWeather); foreBox.appendChild(forecastDate); foreBox.appendChild(forecastDay); foreBox.appendChild(forecastTemp); foreBox.appendChild(forecastHumid);
    mainBody.appendChild(foreBox);
  });
}

function reloadingThePage()
{
  window.location.reload();
}

window.onload = function ()
 {
  fn123();
};
