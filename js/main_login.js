let currentUser;
loadcurrentUser();

// Function to check the login credentials
function checkLogIn() {
    getContactsFromStorage();
    let emailInput = document.getElementById('emailInput');
    let passwordInput = document.getElementById('passwordInput');

    let isLoggedIn = false; // Variable to track if the login check was successful

    for (let i = 0; i < Contacts.length; i++) {
        let email = Contacts[i].email;
        let password = Contacts[i].password;

        if (emailInput.value === email && passwordInput.value === password) {
            isLoggedIn = true;

            currentUser = i;
            console.log(currentUser);
            localStorage.setItem('currentUser', currentUser);
            window.location.href = 'summary.html';
            break; // Exit the loop since no further checking is needed
        }
    }

    if (!isLoggedIn) { // If the login check is successful, call the function test()
        // If the login check fails, display an error message and highlight the password input field
        passwordAlert.textContent = "Wrong password Ups! Try again";
        passwordInput.parentElement.classList.add('redInput');

        setTimeout(() => { // Clear the error message and remove the red highlight after 3 seconds
            passwordAlert.textContent = "";
            passwordInput.parentElement.classList.remove('redInput');
        }, 3000);
    }
}


function loadcurrentUser() {
    let storedCurrentUser = localStorage.getItem('currentUser');
    if (storedCurrentUser !== null) {
        currentUser = parseInt(storedCurrentUser);
        console.log(currentUser);
    }
}


function guestLogIn() {
    localStorage.setItem('currentUser', 1000);
    window.location.href = 'summary.html';
}