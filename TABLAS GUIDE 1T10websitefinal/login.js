function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Example credentials
    const correctUsername = "admin";
    const correctPassword = "12345";

    if (username === correctUsername && password === correctPassword) {
        alert("Login successful!");
        window.location.href = "index.html"; // Redirect to index.html
    } else {
        alert("Invalid username or password. Try again.");
    }
}
