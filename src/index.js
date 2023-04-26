import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import './css/styles.css';
import { fetchCountries } from './fetchCountries';

const inputEl = document.getElementById('search-box');
const listEl = document.querySelector('.country-list');
const infoEl = document.querySelector('.country-info');

const DEBOUNCE_DELAY = 300;

inputEl.addEventListener('input', debounce(inputHandler, DEBOUNCE_DELAY))

const cleanMarkup = ref => (ref.innerHTML = '');

function inputHandler (event) {
    const textInput = event.target.value.trim();
        cleanMarkup(listEl);
     cleanMarkup(infoEl);
    if (textInput === "") {
        
        return;
    }
    
    fetchCountries(textInput)
        .then(data => {
            console.log(data);
            if (data.length > 10) {
                Notify.info('Занадто багато варіантів, мені складно обрати...')
                return;
            }
            renderMarkup(data);
        })
        .catch(error => {
            cleanMarkup(listEl);
            cleanMarkup(infoEl);
            Notify.failure('Знущаєшся з мене? Так не буває!');
        });
};

function renderMarkup(data) { 
    if (data.length === 1) {
        cleanMarkup(listEl);
        infoEl.innerHTML = createInfoMarkup(data);
    } else { 
        cleanMarkup(infoEl);
        listEl.innerHTML = createListMarkup(data);
    }
};
function createInfoMarkup(data) { 
    return data.map(
        ({ name, capital, population, flags, languages }) =>
            `<h1><img src="${flags.png}"
            alt="${name.official}" width="40" height="40">
            ${name.official}</h1>
            <p><b>Capital: </b>${capital}</p>
            <p><b>Population: </b>${population}</p>
            <p><b>Languages: </b>${Object.values(languages).join(', ')}</p>`,
    );
};
function createListMarkup(data) { 
    return data.map(
        ({ name, flags }) =>
            `<li><img src="${flags.png}"
            alt="${name.official}"
            width="60" heigh="40"> ${name.official}</li>`
    )
        .join('');
};