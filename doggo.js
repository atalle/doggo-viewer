const BREEDS_URL = 'https://dog.ceo/api/breeds/list/all';
const select = document.getElementById("dropdown");
const img = document.getElementById("dog-img");
const spinner = document.getElementById("loader");

fetch(BREEDS_URL)
  .then(response => {
    return response.json();
  })
  .then(data => {
    // create array of keys (breeds) from JSON object
    const breedsArray = Object.keys(data.message);

    // create dropdown options from the array
    for (let i = 0; i < breedsArray.length; i++) {
      const option = document.createElement('option');
      option.value = breedsArray[i];
      option.innerText = capitalizeFirstLetter(breedsArray[i]);
      select.appendChild(option);
    }
  })

select.addEventListener("change", event => {
  let url = `https://dog.ceo/api/breed/${event.target.value}/images/random`;
  getDoggo(url);
});

function getDoggo(url) {
  spinner.classList.add("show");
  img.classList.remove("show");
  // fetch img from API
  fetch(url)
    .then(response => {
      return response.json();
    })
    // replace img in DOM
    .then(data => {
      img.src = data.message;
    })
}

// show image after it has loaded
img.addEventListener("load", function () {
  spinner.classList.remove("show");
  img.classList.add("show");
})

function capitalizeFirstLetter(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}