// Function to open the popup
function openForm() {
    document.getElementById("formPopup").style.display = "flex";
}

// Close the forms
document.getElementById("closeLoginForm").addEventListener("click", () => {
    document.getElementById("formPopup").style.display = "none";
});
document.getElementById("closeRegisterForm").addEventListener("click", () => {
    document.getElementById("formPopup").style.display = "none";
});

// Switch to Register form
document.getElementById("switchToRegister").addEventListener("click", (event) => {
    event.preventDefault();
    document.getElementById("loginForm").style.display = "none";
    document.getElementById("registerForm").style.display = "block";
});

// Switch to Login form
document.getElementById("switchToLogin").addEventListener("click", (event) => {
    event.preventDefault();
    document.getElementById("registerForm").style.display = "none";
    document.getElementById("loginForm").style.display = "block";
});

// Register form submission
document.getElementById("registerForm").addEventListener("submit", async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());

    const response = await fetch("/client_form", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });

    const result = await response.json();
    if (response.ok) {
        alert("Registration successful!");
        document.getElementById("loginForm").style.display = "block";
        document.getElementById("registerForm").style.display = "none";
    } else {
        alert(result.error);
    }
});

// Login form submission
document.getElementById("loginForm").addEventListener("submit", async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());

    const response = await fetch("/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });

    const result = await response.json();
    if (response.ok) {
        window.location.href = result.redirectUrl;
    } else {
        alert(result.error);
    }
});
