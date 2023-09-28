function toCreateOptionsMarkup(arr, selector) {
  selector.innerHTML = '<option> - Please choose breed - </option>';  
  arr.forEach(({ id, name }) => {
    selector.insertAdjacentHTML(
      'beforeend',
      `<option value=${id}>${name}</option>`
    );
  });
}

function toCreateCatInfoMarkup(selector, arrObj) {
  const { name, description, temperament } = arrObj[0];
  selector.insertAdjacentHTML(
    'beforeend',
    `<div class= 'cat-info__block'>
    <h2 class= 'cat-info__title'>${name}</h2>
    <p class= 'cat-info__descr'>${description}</p>
    <p class= 'cat-info__temper'><span class= 'accent'>Temperament:</span> ${temperament}</p>
    </div>`
  );
}


  export { toCreateOptionsMarkup, toCreateCatInfoMarkup };