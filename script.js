let category = "top";

let key = "034f4206d71c005eb4a06acbeba90843";

function clicker(headingText) {
    document.querySelectorAll("aside > a").forEach(function(el)
    {
        el.classList.remove("selected");
    });

    document.querySelector(`aside > a.${headingText.toLowerCase()}`).classList.add("selected")

    let heading = document.querySelector('#newsList > h2');
    heading.innerText = headingText + " Stories";

    category = headingText.toLowerCase();
    fetcher();
}

async function fetcher()
{
    document.querySelector("#topStoriesContainer").innerHTML = "";

    const resp = await fetch(`https://hacker-news.firebaseio.com/v0/${category}stories.json`);
    const ids = await resp.json();
    //JSON = JavaScript Object Notation
    //const itemsArray = [];

    let items = ids.slice(0, 20);
    console.log(items);

    for(let i = 0 ; i < 20 ; i++)
    {
        const itemData = await fetch(`https://hacker-news.firebaseio.com/v0/item/${items[i]}.json`);
        const resp = await itemData.json();
        //itemsArray.push(resp);

        const inserter = 
        `<a class="news-item" href="${resp.url}" target="blank" data-title="${resp.title}">` +
            `<h3 class="news-title">${resp.title}</h3>` +
            `<p class="news-byline">${resp.by}</p>` +
            `<p class="news-time">${resp.time}</p>` +
            `<p class="news-score">` +
                `<i class="fa fa-thumbs-up"></i>${resp.score}` +
            `</p>` +
        `</a>`;

        console.log(inserter)

        document.querySelector("#topStoriesContainer").insertAdjacentHTML("beforeend", inserter);
    }
}

function main()
{
    console.log("Hey");
}

fetcher();
main();

function topClicked(){
    clicker("Top");
}

function bestClicked(){
    clicker("Best");
}

function newClicked(){
    clicker("New");
}

function KClicked(){
    clicker("K");
	
}
function CClicked(){
    clicker("C");
	
}
  

async function weather(key,latitude,longitude){
	let api = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}`;
    response = await fetch(api)
    let data = await response.json();
    console.log(data);
	temp = Math.floor(data.main.temp - 273);
    description = data.weather[0].description;
   let iconId = data.weather[0].icon;
    city = data.name;
	iconurl = "http://openweathermap.org/img/w/" + iconId + ".png";
	
	console.log(city);
	document.querySelector("#weather-container").innerHTML = "";
	const iconElement = document.querySelector(".weather-icon");
	  const inser = 
        `<p class="weather-location">${city}</p>` +
			'<p class="line"></p>'+
			`<p class="weather-description">${description}</p>`+
            `<p class="weather-value">${temp}<span>°C</span></p>`+ `<img class = "image" src="icons/${iconId}.png"/>`
			
            ;
	
	
    console.log(inser);
    

  
	document.querySelector("#weather-container").insertAdjacentHTML("beforeend", inser);
//    document.querySelector("#weather-image").innerHTML = `<img src="icons/${iconId}.png"/>`;
	 
	console.log(iconId);
//     document.querySelector("#weather-icon").innerHTML = `<img src="icons/${iconId}.png"/>`;
//     document.querySelector("#temperature-value").innerHTML = `${temp}°<span>C</span>`;
//     document.querySelector("#temperature-description").innerHTML = description;
//     document.querySelector("#location").innerHTML = `${city}`;   
}

if('geolocation' in navigator){
    navigator.geolocation.getCurrentPosition(setPosition);
}

function setPosition(position){
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    
    weather(key,latitude,longitude);
}


// useTimeout and useInterval
// blocking and non-blocking