// Funkcja do rejestracji użytkownika
function registerUser() {
    // Pobierz dane z formularza rejestracji
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Wykonaj fetch do backendu
    fetch('http://localhost:8080/register', { // Zmień adres, jeśli jest inny
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, email, password })
    })
    .then(response => {
        if (response.ok) {
            alert('Użytkownik zarejestrowany!');
            // Możesz dodać logikę do przełączenia na formularz logowania
            showLoginForm();
        } else {
            alert('Błąd podczas rejestracji!');
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

// Funkcja do logowania użytkownika
function loginUser() {
    // Pobierz dane z formularza logowania
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    // Wykonaj fetch do backendu
    fetch('http://localhost:8080/login', { // Zmień adres, jeśli jest inny
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    })
    .then(response => {
        if (response.ok) {
            document.getElementById('login-form').classList.add('hidden'); // Ukryj formularz logowania
            document.getElementById('welcomeGif').classList.remove('hidden'); // Pokaż GIF
            alert('Zalogowano pomyślnie!');
        } else {
            alert('Błąd podczas logowania!');
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

// Funkcja do przełączania na formularz logowania
function showLoginForm() {
    document.getElementById('register-form').classList.add('hidden');
    document.getElementById('login-form').classList.remove('hidden');
}

// Funkcja do przełączania na formularz rejestracji
function showRegisterForm() {
    document.getElementById('login-form').classList.add('hidden');
    document.getElementById('register-form').classList.remove('hidden');
}
