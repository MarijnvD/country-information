import axios from "axios";

let countryName = "nederland"

async function specificCountryData() {
    let countryData;
    try {
        const result = await axios.get(`https://restcountries.com/v2/name/${countryName}`);
        countryData = result.data.map((data) => {
            return data;
        })
    } catch (e) {
        console.error(e.message);
        console.log("massage" + e.message)
        const element = document.getElementById("countryResult");
        element.innerHTML = `
                    <h1>Check je spelling!</h1>
                    `
    }
    return countryData;
}

function countryData() {
    specificCountryData().then(data => {
        const {
            flag,
            name: countryName,
            subregion,
            population,
            capital,
        } = data[0]

        let valuta = ""
        if (data[0].currencies.length === 2) {
            const [first, second] = data[0].currencies
            const {name: valutaName1} = first
            const {name: ValutaName2} = second
            valuta = `${valutaName1} and ${ValutaName2}'s`
        } else {
            const [first] = data[0].currencies
            const {name: valutaName} = first
            valuta = `${valutaName}`
        }

        let language = ""
        const [first, second, third] = data[0].languages
        if (data[0].languages.length === 3) {
            language = `They speak ${first.nativeName}, ${second.nativeName} and ${third.nativeName}`
        }
        if (data[0].languages.length === 2) {
            language = `They speak ${first.nativeName} and ${second.nativeName}`
        }
        if (data[0].languages.length === 1) {
            language = `They speak ${first.nativeName}.`
        }

        const element = document.getElementById("inject-country-information");
        element.innerHTML = `
        <div class="info-box">
                <div class="flag-en-land">
                    <img src="${flag}" width="70" height="50">
                    <h1>${countryName}</h1>
                </div>
                <div class="text-Land">
                    <h2>${countryName} is situated in ${subregion}. It has a population of ${population} people.</h2>
                    <h2>The capital is ${capital} and you can pay with ${valuta}.</h2>      
                    <h2>${language}.</h2>    
                </div>
</div>
                                `
    });
}

function CountrySearchButtonClick() {
}

const countryInputButon = document.getElementById("search-button")
countryInputButon.addEventListener("click", CountrySearchButtonClick)

function handelCountryInput(e) {
    const currentValue = e.target.value
    console.log(`${currentValue}`)
    countryName = currentValue.toLowerCase()
}

const countryNameInputField = document.getElementById("country-name")
countryNameInputField.addEventListener("keyup", handelCountryInput)

function handelSubmit(e) {
    e.preventDefault()

    specificCountryData();
    countryData();

    countryInformationRequest.reset()
}

const countryInformationRequest = document.getElementById("country-information-request");
countryInformationRequest.addEventListener('submit', handelSubmit)