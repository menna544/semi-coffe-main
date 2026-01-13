const sign_in_btn = document.querySelector("#sign-in-btn");
const sign_up_btn = document.querySelector("#sign-up-btn");
const container = document.querySelector(".container");
var emailfield = document.getElementById("email-field");
var emailerror = document.getElementById("email-error");
var passerror = document.getElementById("password-error");
var emaillabel = document.getElementById("email-label");
var passwordlabel = document.getElementById("password-label");

function validateEmail() {
    emaillabel.style.bottom = "45px";
    if (!emailfield.value.match(/^[A-Za-z\._\-0-9]*[@][A-Za-z]*[\.][a-z]{2,4}$/)) {
        emailerror.innerHTML = "Email is not valid";
        emailfield.style.borderBottomColor = "red";
        return false;
    }
    emailerror.innerHTML = "";
    emailfield.style.borderBottomColor = "green";
    return true;
}

function verifyPassword() {
    var passfield = document.getElementById("password-field").value;
    passwordlabel.style.bottom = "45px";
    if (passfield.length < 6) {
        document.getElementById("password-error").innerHTML = "Enter at least 6 letters";
        return false;
    }
    passerror.innerHTML = "";
    return true;
}

function validateAll() {
    if (validateEmail() == true && verifyPassword() == true) {
       localStorage.setItem("userEmail",emailfield.value);
        location.href ="product.html";
    }else{
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Enter valid Email or password!",
            
          });
    }
    
}


function contact() {
    location.replace("signinup.html");
}

function goback() {
    location.replace("index.html");
}

sign_up_btn.addEventListener("click", () => {
    container.classList.add("sign-up-mode");
});

sign_in_btn.addEventListener("click", () => {
    container.classList.remove("sign-up-mode");
});

function validateForm() {
    // Clear any previous error messages
    const errorElements = document.querySelectorAll(".error");
    errorElements.forEach((element) => (element.textContent = ""));

    const username = document.getElementById("username").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const password = document.getElementById("password").value.trim();
    const checkbox = document.getElementById("checkbox").checked;

    let isValid = true;

    if (username === "") {
        document.getElementById("username-error").textContent = "Name is required";
        isValid = false;
    }
    if (email === "") {
        document.getElementById("email-error").textContent = "Email is required";
        isValid = false;
    }
    if (phone === "") {
        document.getElementById("phone-error").textContent = "Phone is required";
        isValid = false;
    }
    if (password === "") {
        document.getElementById("password-error").textContent = "Password is required";
        isValid = false;
    }
    if (!checkbox) {
        document.getElementById("checkbox-error").textContent = "You must agree to the terms";
        isValid = false;
    }

    if (isValid) {
        localStorage.setItem("userEmail",emailfield.value);
        Swal.fire({
            title: "Good job!",
            text: "Account created successfully!",
            icon: "success"
          });
          location.replace("product.html")
    }else{
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "you must enter all inputs!",
            
          });
    }
}
function storeUserEmail(email) {
    localStorage.setItem("userEmail", email);
}
// Retrieve the user's email from local storage
function retrieveUserEmail() {
    return localStorage.getItem("userEmail");
}
