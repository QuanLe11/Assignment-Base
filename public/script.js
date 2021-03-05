async function windowActions() {
    const endpoint = 'https://data.princegeorgescountymd.gov/resource/umjn-t2iz.json';
    const searchInput = document.querySelector('#input');
    const suggestions = document.querySelector('.suggestions');
    
    
    // const data = fetch(endpoint);
    // const results = data.json();
    const request = await fetch(endpoint)
        // .then(blob => blob.json())
        // .then(data => zipcodes.push(...data))

    const zipcodes = await request.json();
    
    function findMatches(wordToMatch, zipcodes) {
        return zipcodes.filter(place => {
        const regex = new RegExp(wordToMatch, "gi");
        return place.zip.match(regex) || place.city.match(regex)
        });
    }
    
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
                        <div class="address">${addressLine1}, ${addressLine2}</div>
                        <div class="address">${cityName}, ${zipCode}</div>
                        <div class="inspection result">${inspectionResults}</div>
                    </li>
                </div>
                `;
        }).join('');
        suggestions.innerHTML = html;
    }
    
    searchInput.addEventListener('input', displayMatches);
    searchInput.addEventListener('keyup', (evt) => {
        displayMatches(evt)
    });
}

window.onload = windowActions;