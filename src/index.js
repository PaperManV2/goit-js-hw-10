import './css/styles.css';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
import { fetchCountries } from './fetchCountries';

const DEBOUNCE_DELAY = 300;

//https://restcountries.com/v3.1/name
//https://restcountries.com/v3.1/all?fields=name,capital,population,flags,languages

const searchBox = document.getElementById('search-box');
const listOfCountries = document.querySelector('.country-list');
const description = document.querySelector('.country-info');

let resultFromFetch;
let currentText;

function WritingList(data) {
  RemoveHTMLElements();

  for (let item of data) {
    const element = ` <li class="singleItem"><img class="flag" src=${item.flags.svg} /><span class="countryName">${item.name.official}</span></li>`;
    listOfCountries.insertAdjacentHTML('beforeend', element);
  }
}

function WritingSingleCountry(data) {
  RemoveHTMLElements();
  const country = data[0];

  const element = ` <li class="singleItem"><img class="flag" src=${country.flags.svg} /><h2 class="singleCountryName">${country.name.official}</h2</li>`;
  listOfCountries.insertAdjacentHTML('beforeend', element);

  let languagesArray = Object.values(country.languages);

  let languages = '';

  for (let item of languagesArray) {
    languages += item;
    languages += ' ';
  }

  const desc = `
  <ul class="listInDescription">
    <li class="singleItem"><span class="countryName">Capital:</span><span class="valueOfDescs">${country.capital}</span></li>
    <li class="singleItem"><span class="countryName">Population:</span><span class="valueOfDescs">${country.population}</span></li>
    <li class="singleItem"><span class="countryName">Languages:</span><span class="valueOfDescs">${languages}</span></li>
  </ul>`;
  description.insertAdjacentHTML('beforeend', desc);
}

const GiveAllValues = debounce(async () => {
  resultFromFetch = await fetchCountries(currentText);
  if (resultFromFetch.length == 1) {
    WritingSingleCountry(resultFromFetch);
    return;
  } else if (resultFromFetch.length <= 10) {
    WritingList(resultFromFetch);
    return;
  } else if (resultFromFetch.length > 10) {
    Notiflix.Notify.info(
      'Too many matches found. Please enter a more specific name.'
    );
    return;
  }
});

function RemoveHTMLElements() {
  listOfCountries.innerHTML = '';
  description.innerHTML = '';
}

searchBox.addEventListener('input', () => {
  currentText = searchBox.value.trim();

  if (currentText != '') {
    GiveAllValues();
  } else RemoveHTMLElements();
});
