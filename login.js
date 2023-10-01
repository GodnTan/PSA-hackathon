let signup = document.querySelector(".signup");
let login = document.querySelector(".login");
let slider = document.querySelector(".slider");
let formSection = document.querySelector(".form-section");
var registeredUsers = [
    { email: "admin@gmail.com", password: "admin123" },
    { email: "user1@example.com", password: "password1" },
    { email: "user2@example.com", password: "password2" }
]; 
signup.addEventListener("click", () => {
    slider.classList.add("moveslider");
    formSection.classList.add("form-section-move");
});
 
login.addEventListener("click", () => {
    slider.classList.remove("moveslider");
    formSection.classList.remove("form-section-move");
});
function auth() {
    var email = document.querySelector(".email-login").value;
    var password = document.querySelector(".password-login").value;

    // Check if the provided email and password match any registered user
    var matchedUser = registeredUsers.find(function(user) {
        return user.email === email && user.password === password;
    });

    if (matchedUser) {
        alert("Login Successful");
        window.location.href = "lawyer.html";
    } else {
        alert("Invalid Information");
        return;
    }
}
function register() {
    var email = document.querySelector(".email-signup").value;
    var password = document.querySelector(".password-signup").value;

    // Check if the email is already registered
    var isEmailRegistered = registeredUsers.some(function(user) {
        return user.email === email;
    });

    if (isEmailRegistered) {
        alert("Email is already registered");
        return;
    }

    // Add the new user to the registeredUsers array
    registeredUsers.push({ email: email, password: password });

    alert("Registration successful! Please log in.");
}
