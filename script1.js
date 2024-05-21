document.addEventListener('DOMContentLoaded', function () {
    const propertyForm = document.getElementById('property-form');
    const sellerProperties = document.getElementById('seller-properties');

    let properties = JSON.parse(localStorage.getItem('properties')) || [];

    propertyForm.addEventListener('submit', function (event) {
        event.preventDefault();
        const newProperty = {
            id: properties.length + 1,
            place: event.target.place.value,
            area: event.target.area.value,
            bedrooms: event.target.bedrooms.value,
            bathrooms: event.target.bathrooms.value,
            nearby: event.target.nearby.value
        };
        properties.push(newProperty);
        localStorage.setItem('properties', JSON.stringify(properties));
        renderSellerProperties();
        propertyForm.reset();
    });

    function renderSellerProperties() {
        sellerProperties.innerHTML = '';
        properties.forEach(property => {
            const propertyElement = document.createElement('div');
            propertyElement.classList.add('property-widget');
            propertyElement.innerHTML = `
                <p><strong>Place:</strong> ${property.place}</p>
                <p><strong>Area:</strong> ${property.area} sq ft</p>
                <p><strong>Bedrooms:</strong> ${property.bedrooms}</p>
                <p><strong>Bathrooms:</strong> ${property.bathrooms}</p>
                <p><strong>Nearby:</strong> ${property.nearby}</p>
                <button class="delete-property" data-id="${property.id}">Delete</button>
                <button class="update-property" data-id="${property.id}">Update</button>
            `;
            sellerProperties.appendChild(propertyElement);
        });

        document.querySelectorAll('.delete-property').forEach(button => {
            button.addEventListener('click', function () {
                const propertyId = parseInt(this.getAttribute('data-id'));
                properties = properties.filter(property => property.id !== propertyId);
                localStorage.setItem('properties', JSON.stringify(properties));
                renderSellerProperties();
            });
        });

        document.querySelectorAll('.update-property').forEach(button => {
            button.addEventListener('click', function () {
                const propertyId = parseInt(this.getAttribute('data-id'));
                const property = properties.find(property => property.id === propertyId);
                if (property) {
                    propertyForm.place.value = property.place;
                    propertyForm.area.value = property.area;
                    propertyForm.bedrooms.value = property.bedrooms;
                    propertyForm.bathrooms.value = property.bathrooms;
                    propertyForm.nearby.value = property.nearby;
                    properties = properties.filter(property => property.id !== propertyId);
                    localStorage.setItem('properties', JSON.stringify(properties));
                    renderSellerProperties();
                }
            });
        });
    }

    renderSellerProperties();
});
