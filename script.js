document.addEventListener('DOMContentLoaded', function () {
    const buyerProperties = document.getElementById('buyer-properties');
    const applyFiltersButton = document.getElementById('apply-filters');

    let properties = JSON.parse(localStorage.getItem('properties')) || [];

    function renderBuyerProperties(filteredProperties) {
        buyerProperties.innerHTML = '';
        filteredProperties.forEach(property => {
            const buyerPropertyElement = document.createElement('div');
            buyerPropertyElement.classList.add('property-widget');
            buyerPropertyElement.innerHTML = `
                <p><strong>Place:</strong> ${property.place}</p>
                <p><strong>Area:</strong> ${property.area} sq ft</p>
                <p><strong>Bedrooms:</strong> ${property.bedrooms}</p>
                <p><strong>Bathrooms:</strong> ${property.bathrooms}</p>
                <p><strong>Nearby:</strong> ${property.nearby}</p>
                <button class="interest-button" data-id="${property.id}">I'm Interested</button>
            `;
            buyerProperties.appendChild(buyerPropertyElement);
        });

        document.querySelectorAll('.interest-button').forEach(button => {
            button.addEventListener('click', function () {
                const propertyId = parseInt(this.getAttribute('data-id'));
                const property = properties.find(property => property.id === propertyId);
                if (property) {
                    alert(`Contact Seller for Property ID: ${property.id}`);
                }
            });
        });
    }

    applyFiltersButton.addEventListener('click', function () {
        const filterPlace = document.getElementById('filter-place').value.toLowerCase();
        const filterBedrooms = document.getElementById('filter-bedrooms').value;
        const filterBathrooms = document.getElementById('filter-bathrooms').value;

        const filteredProperties = properties.filter(property => {
            return (!filterPlace || property.place.toLowerCase().includes(filterPlace)) &&
                (!filterBedrooms || property.bedrooms == filterBedrooms) &&
                (!filterBathrooms || property.bathrooms == filterBathrooms);
        });

        renderBuyerProperties(filteredProperties);
    });

    // Initial render
    renderBuyerProperties(properties);
});
