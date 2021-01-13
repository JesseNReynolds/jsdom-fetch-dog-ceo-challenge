console.log('%c HI', 'color: firebrick')

const imgUrl = "https://dog.ceo/api/breeds/image/random/4";
const breedUrl = 'https://dog.ceo/api/breeds/list/all';
const breedList = document.getElementById('dog-breeds');
const container = document.getElementById('dog-image-container');
const dropDown = document.getElementById('breed-dropdown');

breedList.addEventListener('click', function(e){
    if(e.target.tagName === "LI"){
        colorChange(e.target);
    }
})

dropDown.addEventListener('change', function(){
    filterListByLetter(dropDown.options[dropDown.selectedIndex].text);
})

function getImages() {
    fetch(imgUrl)
        // .then(resp => resp.json())
        .then(function(resp) {
            return resp.json();
        })
        // .then(data => data)
        .then(function(json) {
            imgsFromArrOfLinks(json.message)
        })
}

function imgsFromArrOfLinks(arr) {
    arr.forEach(element => {
        const img = document.createElement('img');
        img.src = element;
        img.style = 'max-width: 25%'
        container.appendChild(img);
    });
}

function listBreeds() {
    fetch(breedUrl)
        .then(function(resp) {
            return resp.json();
        })
        .then(function(json) {
            lisFromObjectOfBreeds(json.message);
            // console.log(json)
        })
}

function lisFromObjectOfBreeds(obj) {
    for (var key in obj) {
        const li = document.createElement('li');
        li.innerHTML = key;
        breedList.appendChild(li);
    }
}

function colorChange(element) {
    element.style = 'color: hotpink';
}

function filterListByLetter(letter) {
    Array.from(breedList.children).forEach(function(element) {
            if (element.innerHTML[0] != letter) {
                element.style = 'display: none;'
            } else {
                element.style = 'display: list-item;'
            }
        })
}

getImages()
listBreeds()
// These are obsolete because of defer
// document.addEventListener('DOMContentLoaded', getImages)
// document.addEventListener('DOMContentLoaded', listBreeds)
