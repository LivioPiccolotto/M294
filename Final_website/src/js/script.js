const form = document.getElementById('form');
const log = document.getElementById('log');
const fishlist = document.getElementById('results');
const fisharray = [];

fetch('https://www.fishwatch.gov/api/species')
    .then(function (response) {
        //successfull fetch return as json
        return response.json();
    })
    .then(function(data) {
        //data now contains the json
        for (var i in data) fisharray.push([i, data[i]]);
        console.log(fisharray);
        for (var i in fisharray)
        fishlist.innerHTML += `<p>${fisharray[i][1]['Color']}</p>`;
    })
form.addEventListener('submit', function (e) {
    e.preventDefault();
    const query = document.getElementById('fishsearch').value;
    console.log(query);
    const fishes = fetchSomeFishes(query);
})

function fetchSomeFishes(fish) {
    fetch(`https://www.fishwatch.gov/api/species/${fish}`)
    .then(function(response) {
        return response.json();
    })
    .then(function(data){
        console.log(data);
        const imageUrl = data[0]['Image Gallery'][0]['src'];
        log.innerHTML = `<img src=${imageUrl}>`;
    })
    .catch(function (error){
        console.log(error);
    })
}