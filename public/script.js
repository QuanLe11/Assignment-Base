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
        const cityName = place.city.replace(regex, `<span class="hl">${this.value}</span>`);
        const zipCode = place.zip.replace(regex, `<span class="hl">${this.value}</span>`);
        const addressLine1 = place.address_line_1;
        const restaurantName = place.name;
        const inspectionResults = place.inspection_results;
        const {category} = place;
        return `
            <div class="box is-small">
                <li>
                    <span class="name">${restaurantName}</span>
                    <br>
                    <span class="address">${addressLine1}</span>
                    <br>
                    <span class="address">${cityName}, ${zipCode}</span>
                    </br>
                    <span class="category">${category}</span>
                    <br>
                    <span class="inspection result">${inspectionResults}</span>
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