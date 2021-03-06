async function windowActions(){
const endpoint = 'https://data.princegeorgescountymd.gov/resource/umjn-t2iz.json';
const foodPlace = [];
const request = await fetch(endpoint);
const mArr = await request.json().then(data => foodPlace.push(...data));

function findMatches(searchQuery, foodPlace){
    return foodPlace.filter(place => {
        const regex = new RegExp(searchQuery, 'gi'); //regExp is an object that goes into .match method
        return place.city.match(regex) || place.category.match(regex)|| place.name.match(regex)
    });
};

function displayMatches(event){
    query = event.target.value;
    const matchArr = findMatches(query, foodPlace); //this.value is the data being input in the form
    const html = matchArr.map(place => { //.map creates an array with equal size but replaces the values with this instead
        return `         
            <li class = "box">
                <span class="name">${place.name}</span> <br>
                <span class="category">${place.category}</span> <br>
                <address>
                    ${place.city} <br>
                    ${place.address_line_1}
                </address>
            </li>           
        `;

    }).join(''); //This changes html from an array to a big string

    if(query){
        suggestions.innerHTML = html; //takes the html strong from html and creates html in this element
    }else {
        suggestions.innerHTML = "";
    }
};

    const searchInput = document.querySelector('.search'); //This chooses an element with the class search
    const suggestions = document.querySelector('.suggestions'); //Chooses element with class suggestions

    searchInput.addEventListener('change',(evt)=> displayMatches(evt));
    searchInput.addEventListener('keyup',(evt)=> displayMatches(evt));
}

window.onload = windowActions;