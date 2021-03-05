// async function used instead of promise chains (which creates race condition)
async function windowActions() {
    // API PG County Food Inspection data
    const endpoint = 'https://data.princegeorgescountymd.gov/resource/umjn-t2iz.json';
    const searchInput = document.querySelector('#input');
    const suggestions = document.querySelector('.suggestions');
    
    // fetch request
    const request = await fetch(endpoint)
    // empty array for data
    const zipcodes = await request.json();
    
    // check for matches using input box compared to zipcodes array
    function findMatches(wordToMatch, zipcodes) {
        return zipcodes.filter(place => {
        const regex = new RegExp(wordToMatch, "gi");
        return place.zip.match(regex) || place.city.match(regex)
        });
    }
    
    // display matches found
    function displayMatches(event) {
        const matchArray = findMatches(event.target.value, zipcodes);
        const html = matchArray.map(place => {
            const regex = new RegExp(this.value, "gi");
            const cityName = place.city;
            const zipCode = place.zip;
            const addressLine1 = place.address_line_1;
            const addressLine2 = place.address_line_2;
            const restaurantName = place.name;
            const inspectionResults = place.inspection_results;
            const {category} = place;
            return `
                <div class="box is-small">
                    <li>
                        <div class="name">${restaurantName}</div>
                        <div class="category">${category}</div>
                        <address class="address">${addressLine1}, ${addressLine2}</address>
                        <address class="address">${cityName}, ${zipCode}</address>
                        <div class="inspection result">${inspectionResults}</div>
                    </li>
                </div>
                `;
        }).join('');
        suggestions.innerHTML = html;
    }
    
    // event listeners
    searchInput.addEventListener('input', displayMatches);
    searchInput.addEventListener('keyup', (evt) => {
        displayMatches(evt)
    });
}

// function call to async function windowActions
window.onload = windowActions;