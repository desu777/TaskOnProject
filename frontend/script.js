document.getElementById("registerForm").addEventListener("submit", async function(event) {
    event.preventDefault();
    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const response = await fetch("http://localhost:2137/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password }),
    });

    if (response.ok) {
        alert("Rejestracja udana!");
    } else {
        alert("Błąd rejestracji!");
    }
});

document.getElementById("loginForm").addEventListener("submit", async function(event) {
    event.preventDefault();
    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;

    const response = await fetch("http://localhost:2137/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
        // Ukryj formularze i wyświetl GIF powitania
        document.getElementById("formContainer").style.display = "none";
        document.getElementById("welcomeGif").style.display = "block";
    } else {
        alert("Błędne dane logowania!");
    }
});
