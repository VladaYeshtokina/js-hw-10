const BASE_URL = 'https://api.thecatapi.com/v1/';

function fetchBreeds() {
  return fetch(`${BASE_URL}breeds`)
    .then(response => {
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      return response.json();
  });
}

function fetchCatByBreed(breedId) {
  return fetch(`${BASE_URL}images/search?breed_ids=${breedId}`)
    .then(response => {
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      return response.json();
    }
  );
}

function fetchCatByID(id) {
  return fetch(`${BASE_URL}images/${id}`)
    .then(response => {
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      return response.json();
  });  
}

export { fetchBreeds, fetchCatByBreed, fetchCatByID };