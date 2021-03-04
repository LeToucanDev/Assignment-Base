const endpoint = 'https://data.princegeorgescountymd.gov/resource/umjn-t2iz.json';
const foodPlace = [];
fetch(endpoint).then(blob => blob.json())
.then(data => foodPlace.push(...data))


function findMatches(searchQuery, foodPlace){
    return foodPlace.filter(place => {
        const regex = new RegExp(searchQuery, 'gi'); //regExp is an object that goes into .match method
        return place.city.match(regex) || place.category.match(regex)|| place.name.match(regex)
    });
};

function displayMatches(){
    const matchArr = findMatches(this.value, foodPlace); //this.value is the data being input in the form
    const html = matchArr.map(place => { //.map creates an array with equal size but replaces the values with this instead
        return `

            <li class = "box has-background-danger-light m-2">
                <span class="name">${place.name}</span>
                <span class="name">${place.city}</span>
                <span class="name">${place.category}</span>
            </li>

        `;

    }).join(''); //This changes html from an array to a big string

    suggestions.innerHTML = html; //takes the html strong from html and creates html in this element

};

const searchInput = document.querySelector('.search'); //This chooses an element with the class search
const suggestions = document.querySelector('.suggestions'); //Chooses element with class suggestions

searchInput.addEventListener('change', displayMatches);
searchInput.addEventListener('keyup', displayMatches);