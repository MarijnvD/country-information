import axios from 'axios';


const errorMessage = document.getElementById('error');

async function fetchCountries() {
    try {
        const result = await axios.get('https://restcountries.com/v2/all');
        const countries = result.data
        countries.sort((a, b) => {
            return a.population - b.population
        })
        countryList(countries);

    } catch(e) {
        console.error(e);

        if (e.response.status === 500) {
            errorMessage.textContent = "Er ging iets mis in de server";
        } else if (e.response.status === 404) {
            errorMessage.textContent = "Het verzoek is mislukt";
        }
    }
}

fetchCountries();

function countryList(countries){

    const countryArray = document.getElementById('countries');

    //Variabele maken voor HTML element (innerhtml)
    // Variabele aanmaken, map methode aanroepen
    countryArray.innerHTML = countries.map((country) => {
        return`
        <div id="country" class="inner-content-container">
            <div>
                <img src="${country.flag}" alt="flag">
                <span id="countryId" class=${regionSelector(country.region)}>${country.name}</span>        
            </div>
        <span>Has a population of ${country.population} people</span>
        </div>
        `
    }).join(" ")
}

function regionSelector(region) {
    switch (region) {
        case 'Africa':
            return "blue";
        case 'Americas':
            return "green";
        case 'Asia':
            return "red";
        case 'Europe':
            return "yellow";
        case 'Oceana':
            return "purple";
        default:
            return "white";
    }
}

// <li>${response.data[1].name}</li>
// <img src="${response.data[1].flag}" alt="flag"></li>
// <li>Has a population of ${response.data[1].population} people</li>
// <li>De Region is: ${response.data[1].region}</li>