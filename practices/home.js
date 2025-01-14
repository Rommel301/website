// Add smooth scrolling effect to the "Get Started" button
document.getElementById("get-started-btn").addEventListener("click", function() {
    document.getElementById("content-section").scrollIntoView({ behavior: "smooth" });
});

// script.js

window.onscroll = function() {
    makeNavbarSticky();
};

const navbar = document.getElementById("navbar");
const sticky = navbar.offsetTop; // Get the offset position of the navbar

function makeNavbarSticky() {
    if (window.pageYOffset > sticky) {
        navbar.classList.add("sticky"); // Add the sticky class when you reach its scroll position
    } else {
        navbar.classList.remove("sticky"); // Remove the sticky class when you leave the scroll position
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const userIcon = document.getElementById('user-icons');
    const modal = document.getElementById('logoutModal');
    const closeModal = () => (modal.style.display = 'none');

    if (userIcon && modal) {
        // Show modal only when clicking the user icon
        userIcon.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('User icon clicked');
            modal.style.display = 'flex';
        });

        // Close modal only when 'x' close button or 'Cancel' button is clicked
        document.querySelector('.close-button')?.addEventListener('click', function(e) {
            e.stopPropagation(); // Prevent event bubbling
            closeModal();
        });

        document.getElementById('cancelLogout')?.addEventListener('click', function(e) {
            e.stopPropagation(); // Prevent event bubbling
            closeModal();
        });

        // Perform logout and redirect when 'Confirm' button is clicked
        document.getElementById('confirmLogout')?.addEventListener('click', function() {
            console.log('Confirm button clicked');
            // Perform logout operations here

            // Redirect to the homepage
            window.location.href = 'homepage-products.html';
        });
    } else {
        console.error('User icon or modal not found');
    }

    // Ensure clicking other navbar links does not affect the modal
    document.querySelectorAll('.navbar-link').forEach(link => {
        link.addEventListener('click', function(e) {
            console.log('Navbar link clicked');
            // Do not close the modal when other navbar links are clicked
        });
    });
});

function toggleFlip(card) {
    card.classList.toggle('flip');
}



const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

