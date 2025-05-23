const baseURL = 'https://api.nytimes.com/svc/search/v2/articlesearch.json';
let city;
let tempURL;
// Select various HTML elements from index.html for reference
const searchTerm = document.querySelector('.search');
const search = document.querySelector('#search');
const startDate = document.querySelector('.start-date');
const endDate = document.querySelector('.end-date');
const nextBtn = document.querySelector('.next');
const previousBtn = document.querySelector('.prev');
const section = document.querySelector('section');
const nav = document.querySelector('nav');
const sort = document.querySelector('.sort');
const loader = document.querySelector('.hourglass');
loader.style.display = "none";
search.focus();
nav.style.display = 'none';
let pageNumber = 0;
const key = "XXvKI1OVDzoAojy31mEXel8z5N7rXj4e";

const searchForm = document.querySelector('form');
searchForm.addEventListener("submit",submitSearch);   

function submitSearch(e){
    pageNumber = 0;
    loader.style.display = "none";
    fetchResults(e);
}
async function fetchTemperature() {
    try {
        const response = await fetch(tempURL);
        const json = await response.json();
        displayTemp(json);
    } catch (error) {
        console.error('Error getting temperature:', error.message);
    }
}

// Fetch results according to page number,on pressing the next and previous buttons
function fetchResults(e){
    e.preventDefault();
    loader.style.display = "block";
    let url = `${baseURL}?api-key=${key}&page=${pageNumber}&q=${searchTerm.value}`;
    if(startDate.value !== ""){
        // Remove hyphens from the date string
        const formattedStartDate = startDate.value.replace(/-/g, '');
        url = `${url}&begin_date=${formattedStartDate}`;
    }
    
    if(endDate.value !== ""){
        // Remove hyphens from the date string
        const formattedEndDate = endDate.value.replace(/-/g, '');
        url = `${url}&end_date=${formattedEndDate}`;
    }
    if(sort!==""){
        url = `${url}&sort=${sort.value}`;
    }
    fetch(url)
    .then((response)=>response.json())
    .then((json)=>{
        displayResults(json);
        console.log(json);
        loader.style.display = "none";
    })
    .catch((error)=>{
        console.error(`Error fetching data:${error.message}`);
        loader.style.display = "none";
});

}
const temperatureDisplay = document.querySelector("#temperature");
const humid = document.querySelector("#humidity");
function displayTemp(data) {
    if (data && data.currentConditions) {
      const temperature = data.currentConditions.temp;
      const humidity = data.currentConditions.humidity;
      const far = Number(temperature);
      const cel = (far-32)*5/9;
      temperatureDisplay.textContent = String(cel).slice(0,4);
      humid.textContent = `${humidity}`;
    } else {
      console.error('Temperature data is not available');
    }
}
setInterval(fetchTemperature,60000);
fetchTemperature();

//Display the json data retreived in a good manner
function displayResults(json){
    while(section.firstChild){
        section.removeChild(section.firstChild);
    }
    const articles = json.response.docs;
    nav.style.display = articles.length  === 10?"block":"none";
    if(articles.length === 0){
        const para = document.createElement("p");
        para.textContent = "No results retained";
        section.appendChild(para);
    }else{
        for(const current of articles){
            const article = document.createElement("article");
            const heading  = document.createElement("h1");
            const link = document.createElement("a");
            const link2 = document.createElement("a");
            const img = document.createElement("img");
            const para1 = document.createElement("p");
            const date = document.createElement("p");
            const sp = document.createElement("p");
            const keywordPara = document.createElement("p");
            keywordPara.classList.add("keywords");
            link.href  = current.web_url;
            article.style.backgroundColor = "black";
            link.textContent = current.headline.main;
            link.style.fontFamily = "news";
            link2.href= current.web_url;
            link2.textContent = current.headline.main.slice(0,10)+`....`;
            link2.style.fontFamily = "news";
            link2.style.color = "blue";

            sp.textContent = `Click `;
            para1.textContent = current.snippet;
            data = new Date(current.pub_date);
            date.textContent = data.toISOString().split('T')[0];
            for(const keyword of current.keywords){
                const span = document.createElement("span");
                span.textContent = `${keyword.value}`;
                keywordPara.appendChild(span);

            }   
            para1.style.fontSize = "50";
            if(current.multimedia){
                img.src = `${current.multimedia.thumbnail.url}`;
                console.log("img is ",current.multimedia.default.url);
                img.style.width = "50%";
                img.style.height = "50%";
                img.alt = current.headline.main;
            }
            date.style.color="black";
            date.style.background = "white";
            heading.style.fontFamily = "head";
            article.appendChild(heading);
            heading.appendChild(link);
            article.appendChild(date);
            article.appendChild(img);
            article.appendChild(para1);
            sp.appendChild(link2);
            article.appendChild(sp);
            section.appendChild(article);

        }
    }

}
nextBtn.addEventListener("click",nextPage);
previousBtn.addEventListener("click",previousPage);
// Going to the next page
function nextPage(e){
    pageNumber++;
    fetchResults(e);

}
// Going to previous page
function previousPage(e){
    if(pageNumber>0)pageNumber--;
    else{return;}
    fetchResults(e);
}

document.addEventListener('DOMContentLoaded', () => {
    const cityModal = document.getElementById('cityModal');
    const cityForm = document.getElementById('cityForm');
    const cityInput = document.getElementById('cityInput');

    cityForm.addEventListener('submit', (e) => {
        e.preventDefault();
        city = cityInput.value.toLowerCase();
        cityModal.style.display = "none";
        tempURL = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?unitGroup=us&include=current&key=TWDWQU5ZRGQBQ3N8SFA8FW445&contentType=json`;
        fetchTemperature();
    });
});
