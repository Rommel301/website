// Fetch data from the API
fetch('http://localhost:3000/api/lockers') // Ensure your API endpoint is correct
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        console.log('Fetched Data:', data); // Log fetched data to the console
        const productContainer = document.getElementById('product-container');

        // Check if data is an empty array
        if (data.length === 0) {
            productContainer.innerHTML = '<p>No products found.</p>'; // Handle no data case
            return;
        }

        // Append each locker to the container
        data.forEach(locker => {
            // Create a product card
            const productDiv = document.createElement('div');
            productDiv.classList.add('product');

            // Check if ImageBase64 is valid
            const imageSrc = locker.ImageBase64
                ? `data:image/png;base64,${locker.ImageBase64}` // Ensure it has the correct base64 prefix
                : 'https://via.placeholder.com/100'; // Fallback image if missing

            // Set up HTML structure with template literals
            productDiv.innerHTML = `
                <img src="${imageSrc}" alt="${locker.Model}">
                <h2>${locker.Model}</h2>
                <p>Unit: ${locker.Unit}</p>
                <p>Price: $${locker.Price.toFixed(2)}</p>
                
                <!-- Initially hide the details -->
                <div class="details" style="display: none;">
                    <p>Details: ${locker.Details}</p>
                </div>
                <a href="#" class="button view-more">View More</a> <!-- View More button -->
            `;
            productContainer.appendChild(productDiv);

            // Add event listener to the "View More" button
            const viewMoreButton = productDiv.querySelector('.view-more');
            viewMoreButton.addEventListener('click', function (e) {
                e.preventDefault(); // Prevent page reload

                const detailsDiv = productDiv.querySelector('.details');
                const button = productDiv.querySelector('.view-more');

                // Toggle visibility of details and change button text
                if (detailsDiv.style.display === 'none') {
                    detailsDiv.style.display = 'block';
                    button.textContent = 'View Less'; // Change button text to 'View Less'
                    productDiv.classList.add('expanded');
                } else {
                    detailsDiv.style.display = 'none';
                    button.textContent = 'View More'; // Change button text back to 'View More'
                    productDiv.classList.remove('expanded');
                }
            });
        });
    })
    .catch(error => {
        console.error('Error fetching data:', error);
        document.getElementById('product-container').innerHTML = '<p>Error fetching data.</p>'; // Handle errors
    });

document.addEventListener('DOMContentLoaded', function() {
    const userIcon = document.getElementById('user-icons'); // Ensure this is the correct ID for the logout icon
    const modal = document.getElementById('logoutModal');
    const closeModal = () => {
        modal.style.display = 'none'; // Hide modal
    };

    if (userIcon && modal) {
        // Show modal when clicking the user icon
        userIcon.addEventListener('click', function(e) {
            e.preventDefault(); // Prevent default behavior if it's a link
            modal.style.display = 'flex';  // Show the modal
        });

        // Close modal when close button or 'Cancel' button is clicked
        document.querySelector('.close-button')?.addEventListener('click', function(e) {
            e.stopPropagation();  // Prevent event bubbling
            closeModal();
        });

        document.getElementById('cancelLogout')?.addEventListener('click', function(e) {
            e.stopPropagation();  // Prevent event bubbling
            closeModal();
        });

        // Handle confirm logout (you can replace this with your actual logout logic)
        document.getElementById('confirmLogout')?.addEventListener('click', function() {
            console.log('Confirm button clicked');
            // Perform logout logic here
            // For example, clear session or token and redirect
            window.location.href = 'homepage-products.html'; // Redirect example
        });
    } else {
        console.error('User icon or modal not found');
    }
});

// Hamburger Menu Toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});
