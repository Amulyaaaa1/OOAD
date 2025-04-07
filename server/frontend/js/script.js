const apiUrl = "http://localhost:8080/api/rentals/users";  // Your backend API

// Register user
document.getElementById("registerForm")?.addEventListener("submit", async function (event) {
    event.preventDefault();
    
    const user = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        password: document.getElementById("password").value,
        phone_number: document.getElementById("phone").value
    };

    try {
        const response = await fetch(apiUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(user)
        });

        if (!response.ok) {
            throw new Error("Failed to register user.");
        }

        alert("Registration successful!");
        window.location.href = "login.html";
    } catch (error) {
        alert(error.message);
    }
});

// Login user
document.getElementById("loginForm")?.addEventListener("submit", async function (event) {
    event.preventDefault();
    
    const name = document.getElementById("name").value;
    const password = document.getElementById("password").value;

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error("Failed to fetch users.");
        }

        const users = await response.json();
        const user = users.find(u => u.name === name && u.password === password);

        if (user) {
            alert("Login successful!");
        } else {
            alert("Invalid credentials!");
        }
    } catch (error) {
        alert(error.message);
    }
});
