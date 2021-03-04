const endpoint = 'https://data.princegeorgescountymd.gov/resource/umjn-t2iz.json';
const zipcodes = [];

fetch(endpoint)
    .then(blob => blob.json())
    .then(data => zipcodes.push(...data))

function findMatches(wordToMatch, zipcodes){
    return zipcodes.filter(place => {
    const regex = new RegExp(wordToMatch, "gi");
    return place.zip.match(regex) || place.city.match(regex)
    });
}

function displayMatches(){
    const matchArray = findMatches(this.value, zipcodes);
    const html = matchArray.map(place => {
        const regex = new RegExp(this.value, "gi");
        const cityName = place.city;
        const zipCode = place.zip;
        const addressLine1 = place.address_line_1;
        const restaurantName = place.name;
        const inspectionResults = place.inspection_results;
        const {category} = place;
        return `
            <div class="box is-small">
                <li>
                    <div class="name">${restaurantName}</div>
                    <div class="address">${addressLine1}</div>
                    <div class="address">${cityName}, ${zipCode}</div>
                    <div class="category">${category}</div>
                    <div class="inspection result">${inspectionResults}</div>
                </li>
            </div>
            `;
    }).join('');
    suggestions.innerHTML = html;
}

const searchInput = document.querySelector('.input');
const suggestions = document.querySelector('.suggestions');

searchInput.addEventListener('change', displayMatches);
searchInput.addEventListener('keyup', displayMatches);