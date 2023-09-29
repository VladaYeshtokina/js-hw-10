import axios from 'axios';
axios.defaults.headers.common['x-api-key'] =
  'live_2QNehEpaqEWbB7vA804GHTvS1cQ9PvLnOv152a8LH1dSxfgBkfeaifHsSc3DLBkN';

import { fetchBreeds, fetchCatByBreed, fetchCatByID } from './cat-api.js';
import { toCreateOptionsMarkup, toCreateCatInfoMarkup } from './markup.js';

import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';

import Notiflix from 'notiflix';



const ref = {
  breeds: document.querySelector('.breed-select'),
  catInfo: document.querySelector('.cat-info'),
  loader: document.querySelector('.loader'),
  error: document.querySelector('.error'),
};
const { breeds, catInfo, loader, error } = ref;

toggle([error, breeds]);

fetchBreeds()
  .then(cat => {    
    toCreateOptionsMarkup(cat, breeds);
    toggle([loader, breeds]);
    
    new SlimSelect({
      select: breeds,      
    });  
  })
  .catch(onFetchError);

breeds.addEventListener('change', onBreedClick);

function onBreedClick(e) {
  fetchCatByBreed(e.currentTarget.value)
    .then(catData => {
      const { id, url } = catData[0];
      catInfo.innerHTML = `<img src=${url} width='400px'>`;

      toggle([catInfo, loader]);
      setTimeout(toggle, 1000, [catInfo, loader]);

      return id;
    })
    .then(id => {
      return fetchCatByID(id)
        .then(({ breeds }) => {
          return breeds;
        });
    })
    .then(breeds => {
      toCreateCatInfoMarkup(catInfo, breeds);
    })
    .catch(onFetchError);  
}

function onFetchError() {
  toggle([catInfo, breeds]); 
  Notiflix.Notify.failure(
    'Oops! Something went wrong! Try reloading the page!'
  );
}
  
function toggle(arr) {
  arr.forEach(selector => selector.classList.toggle('is-hidden'));
}




