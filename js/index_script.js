/////////////////////// Function to initialize the page ///////////////////////////////////
function init() {
    startAnimation();
    getContactsFromStorage();
}


//////////////////////// Function to start the animation //////////////////////////////////
function startAnimation() {
    if (window.innerWidth < 510) {
        logo.src = "../img/joinlogomobil.png";
    }
    setTimeout(() => {
        let logo = document.getElementById("logo");
        let background = document.getElementById('startBackground');

        setTimeout(() => { logo.src = "../img/joinlogo.png"; }, 80)

        logo.classList.add('imgLogo');

        // Fades out the startBackground div gradually
        background.style.backgroundColor = "rgba(246, 247, 248, 0%)";

        // Remove the image from the DOM after the animation
        setTimeout(() => {
            if (background && background.parentNode) {
                background.parentNode.removeChild(background);
            }
        }, 500); // Wait for 0.5 seconds (same duration as the animation) before removing the image
        handleMaxWidthChange();
    }, 500); // Wait for 0.5 seconds before starting the animation
}


//////////////////////////////////// Function to toggle password visibility ////////////////////////////////
function togglePasswordVisibility(i) {
    let passwordInput = document.getElementById('passwordInput');
    let passwordImage = document.getElementById('passwordImage');
    let passwordInput2 = document.getElementById('passwordInput2');
    let passwordImage2 = document.getElementById('passwordImage2');

    if (passwordInput && i === 1) {
        if (!passwordImage.src.includes('/assets/img/logInSignUp/lock.svg')) {
            if (passwordInput.type === 'password') {
                passwordInput.type = 'text'; // Show password
                passwordImage.src = './assets/img/logInSignUp/eye.svg';
            } else {
                passwordInput.type = 'password'; // Hide password
                passwordImage.src = './assets/img/logInSignUp/hiddeneye.svg';
            }
        }
    }
    if (passwordInput2 && i === 2) {
        if (!passwordImage2.src.includes('/assets/img/logInSignUp/lock.svg')) {
            if (passwordInput2.type === 'password') {
                passwordInput2.type = 'text'; // Show password
                passwordImage2.src = './assets/img/logInSignUp/eye.svg';
            } else {
                passwordInput2.type = 'password'; // Hide password
                passwordImage2.src = './assets/img/logInSignUp/hiddeneye.svg';
            }
        }
    }
}


/////////////////////////////////// Function to add event listeners for the password field ////////////////////////
function setupPasswordInputEventListeners() {
    const passwordInputs = document.querySelectorAll('.passwordInput');

    function updatePasswordImageSrc(passwordInput, passwordImage) {
        if (passwordInput.value.trim().length > 0 && passwordInput.type === 'password' || 'text') {
            passwordImage.src = './assets/img/logInSignUp/hiddeneye.svg';
        } else {
            passwordImage.src = './assets/img/logInSignUp/lock.svg';
        }
    }

    passwordInputs.forEach((passwordInput) => {
        const passwordImage = passwordInput.nextElementSibling;

        passwordInput.addEventListener('focus', function () {
            updatePasswordImageSrc(passwordInput, passwordImage);
        });

        passwordInput.addEventListener('input', function () {
            updatePasswordImageSrc(passwordInput, passwordImage);
        });

        passwordInput.addEventListener('focusout', function () {
            updatePasswordImageSrc(passwordInput, passwordImage);
        });
    });
}


////////////////////// Function to add event listeners after the DOM has loaded ////////////////////////
function setupEventListenersAfterDOMLoaded() {
    setupPasswordInputEventListeners();
}


///////////////////// Function called when the "Remember Me" button is clicked /////////////////////////
function checkBox() {
    let rememberMeImg = document.getElementById('rememberMe');

    if (rememberMeImg.classList.contains('uncheckBox')) {
        rememberMeImg.classList.remove('uncheckBox');
        rememberMeImg.classList.add('checkBox');
    } else {
        rememberMeImg.classList.add('uncheckBox');
        rememberMeImg.classList.remove('checkBox');
    }
}

/////////////////////////////////////////// Log In //////////////////////////////////////////////////

// Function to render the LogIn form
function renderLogIn() {
    let contentbox = document.getElementById('contentbox');

    contentbox.innerHTML = returnLogInHTML();
    setupEventListenersAfterDOMLoaded();
    document.getElementById('headerRight').classList.remove('d-none');
    document.getElementById('footer').classList.remove('d-none');
}





/////////////////////////////////////////// Sign Up //////////////////////////////////////////////////

// Function to render the SignUp form
function renderSignUp() {
    let contentbox = document.getElementById('contentbox');

    contentbox.innerHTML = returnSignUpHTML();
    setupEventListenersAfterDOMLoaded();
    document.getElementById('headerRight').classList.add('d-none');
    document.getElementById('banner').innerHTML = 'You Signed Up succeccfully';
}


// Function to handle SignUp form submission
async function signUpForm() {
    let nameInput = document.getElementById('nameInput');
    let nameArray = nameInput.value.split(' ');
    let firstName = nameArray[0];
    let lastName = nameArray[1];
    let firstTwoLetters = firstName.charAt(0) + lastName.charAt(0);
    let emailInput = document.getElementById('emailInput');
    let password1 = document.getElementById('passwordInput');
    let password2 = document.getElementById('passwordInput2');

    if (checkSamePasswort(password1, password2) && checkEmail(emailInput.value)) {
        let user = {
                    "firstName":  firstName,
                    "lastName":  lastName,
                    "phone":  'Please add phonenumber',
                    "email":  emailInput.value,
                    "color": "black",
                    "firstLetters": firstTwoLetters,
                    "name": nameInput.value,
                    "password": password1.value,
        };
        Contacts.push(user);
        await saveContactsToStorage();
        resetInputField(nameInput, emailInput, password1, password2);
        show();
        setTimeout(() => { renderLogIn() }, 2000)
    }
}

function resetInputField(name, email, password1, password2) {
    name.value = '';
    email.value = '';
    password1.value = '';
    password2.value = '';
}


async function checkEmail(email) { // check if an email exists
    await getContactsFromStorage();
    for (let i = 0; i < Contacts.length; i++) {
        let userEmail = Contacts[i].email;
        if (email.value === userEmail) {
            emailAlert.textContent = "E-Mail bereits vorhanden";
            email.parentElement.classList.add('redInput');
            setTimeout(() => { emailAlert.textContent = ""; email.parentElement.classList.remove('redInput'); }, 3000)
            return false;
        }
    }
    return true;
}


function checkSamePasswort(password1, password2) {

    if (password1.value !== password2.value) {
        passwordAlert.textContent = "Die Passwörter stimmen nicht überein!";
        password2.parentElement.classList.add('redInput');
        setTimeout(() => {
            passwordAlert.textContent = "";
            password2.parentElement.classList.remove('redInput');
        }, 3000);
    } else {
        return true;
    }
}

/////////////////////////////////////////// Forgot Password //////////////////////////////////////////////////

// Function to render the Forgot Password form
function renderForgotPW() {
    let contentbox = document.getElementById('contentbox');

    contentbox.innerHTML = returnForgotPWHTML();
    document.getElementById('headerRight').classList.add('d-none');
    document.getElementById('footer').classList.add('d-none');
    document.getElementById('banner').innerHTML = '<img style="width: 32px" src="../assets/img/logInSignUp/sendCheck.svg">An E-Mail has been sent to you';
}

// Function to check which user Password to reset
function checkResetpassword() {
    let emailInput = document.getElementById('emailInput');
    let emailFound = false;

    for (let i = 0; i < users.length; i++) {
        let userEmail = users[i].email;
        if (emailInput.value === userEmail) {
            renderResetPassword(i);
            emailFound = true;
            break;
        }
    } if (emailFound) {
        console.log('YOOOO wurde mindestens einmal ausgeführt!');
    } else {
        emailAlert.textContent = "E-Mail nicht vorhanden";
        emailInput.parentElement.classList.add('redInput');
        setTimeout(() => { emailAlert.textContent = ""; emailInput.parentElement.classList.remove('redInput'); }, 3000);
    }
}

// Function to render the Reset Password form
function renderResetPassword(i) {
    let contentbox = document.getElementById('contentbox');

    contentbox.innerHTML = returnResetPasswordHTML(i);
    document.getElementById('headerRight').classList.add('d-none');
    document.getElementById('footer').classList.add('d-none');
    document.getElementById('banner').innerHTML = 'You reset your password';
    setupPasswordInputEventListeners();
}

// Funktion for set new Password
function setNewPassword(i) {
    let user = users[i];
    let password1 = document.getElementById('passwordInput');
    let password2 = document.getElementById('passwordInput2');

    if(checkSamePasswort(password1, password2)) {
        user.password = password1.value;
        show();
        setTimeout(()=> {renderLogIn()}, 2000);
    }
}

// Function to show a banner
function show() {
    let banner = document.getElementById('banner');

    banner.classList.add("visible");
    setTimeout(() => {
        banner.classList.remove("visible");
    }, 2000)
}


// Event listener that calls init() when the DOM is loaded
document.addEventListener('DOMContentLoaded', init);
document.addEventListener('DOMContentLoaded', handleMaxWidthChange);


/////////////////////////////////////// moveElementbyMedia max-width 510px for SignUp Button ///////////////////////////


function moveElementToNewPosition(newParent) {
    let elementToMove = document.getElementById('headerRight');
    let footerElement = document.getElementById('footer');

    if (elementToMove && newParent && footerElement) {
        newParent.insertAdjacentElement('beforebegin', elementToMove);
    }
}

function handleMaxWidthChange() {
    let moveBack = document.getElementById('header');
    let elementToMove = document.getElementById('headerRight');

    if (window.innerWidth < 510) {
        moveElementToNewPosition(document.getElementById('footer'));
    } else {
        if (moveBack && elementToMove)
            // moveElementToNewPosition(document.getElementById('front-main-content'));
            moveBack.appendChild(elementToMove);
    }
}

window.addEventListener('resize', handleMaxWidthChange);


/////////////////////////////////////////////// return HTML //////////////////////////////////////////////////


function returnLogInHTML() {
    return /* html */ `
        <form onsubmit="checkLogIn(); return false;" class="content">
            <div class="headingContainer">
                <h1>Log in</h1>
            </div>
            <div class="blueSeperator"></div>
            <div>
                <div class="inputBox">
                    <div class="inputField">
                        <input required id="emailInput" class="" type="email" placeholder="Email">
                        <img src="./assets/img/logInSignUp/mail.svg" alt="">
                    </div>
                    <div class="inputField">
                        <input required id="passwordInput" class="passwordInput" type="password" placeholder="Password">
                        <img id="passwordImage" class="passwordImage" src="./assets/img/logInSignUp/lock.svg" alt="" onclick="togglePasswordVisibility(1)">
                    </div>
                    <div id="passwordAlert"></div>
                    <div class="rememberMeForgetBox mobilView">
                        <div class="checkBoxLogIn">
                            <div onclick="checkBox()" id="rememberMe" class="uncheckBox"></div>
                            <span>Remember me</span>
                        </div>
                        <a id="fmp" href="#" onclick="renderForgotPW()"> Forget my password</a>
                    </div>
                </div>
            </div>
            <div class="logInButtonBox">
                <button type="onsubmit" class="logInButton">Log in</button>
                <button type="button" onclick="guestLogIn()" class="logInButton guestLogIn">Guest Log in</button>
            </div>
        </form>
    `;
}


function returnSignUpHTML() {
    return /* html */ `
        <form onsubmit="signUpForm(); return false;" class="content">
            <div class="headingContainer">
                <div onclick="renderLogIn()" class="imgHeadingContainer backArrow"></div>
                <h1>Sign Up</h1>
                <div class="imgHeadingContainer"></div>
            </div>
            <div class="blueSeperator"></div>
            <div>
                <div class="inputBox">
                    <div class="inputField">
                        <input required id="nameInput" class="" type="text" placeholder="Vor- und Nachname">
                        <img src="./assets/img/logInSignUp/person.svg" alt="">
                    </div>
                    <div class="inputField">
                        <input required id="emailInput" class="" type="email" placeholder="Email">
                        <img src="./assets/img/logInSignUp/mail.svg" alt="">
                    </div>
                    <div id="emailAlert"></div>
                    <div class="inputField">
                        <input required id="passwordInput" class="passwordInput" type="password" placeholder="Password">
                        <img id="passwordImage" class="passwordImage" src="./assets/img/logInSignUp/lock.svg" alt="" onclick="togglePasswordVisibility(1)">
                    </div>
                    <div class="inputField">
                        <input required id="passwordInput2" class="passwordInput" type="password" placeholder="Password">
                        <img id="passwordImage2" class="passwordImage" src="./assets/img/logInSignUp/lock.svg" alt="" onclick="togglePasswordVisibility(2)">
                    </div>
                    <div id="passwordAlert"></div>
                    <div class="rememberMeForgetBox">
                        <div class="checkBoxSignIn">
                            <input type="checkbox" id="rememberMe" class="uncheckBox" required>
                            <span>I accept the </span>
                        </div>
                        <a id="fmp" href="#"> Privacy policy</a>
                    </div>
                </div>
            </div>
            <div class="logInButtonBox">
                <button id="signUp" type="onsubmit" class="logInButton">Sign up</button>
            </div>
        </form>
    `;
}


function returnForgotPWHTML() {
    return /* html */ `
        <form onsubmit="checkResetpassword(); return false;" class="content forgotPW">
            <div class="headingContainer">
                <div onclick="renderLogIn()" class="imgHeadingContainer backArrow"></div>
                <h1>I forgot my password</h1>
                <div class="imgHeadingContainer"></div>
            </div>
            <div class="blueSeperator"></div>
            <h2>Don't worry! We will send you an email with the instructions to reset your password.</h2>
            <div>
                <div class="inputBox">
                    <div class="inputField">
                        <input required id="emailInput" class="" type="email" placeholder="Email">
                        <img src="./assets/img/logInSignUp/mail.svg" alt="">
                    </div>
                    <div id="emailAlert"></div>
                </div>
            </div>
            <div class="logInButtonBox">
                <button id="signUp" type="onsubmit" class="sendEmailButton">Send me the email</button>
            </div>
        </form>
    `;
}


function returnResetPasswordHTML(i) {
    return /* html */ `
        <form onsubmit="setNewPassword('${i}'); return false;" class="content forgotPW">
            <div class="headingContainer">
                <div onclick="renderLogIn()" class="imgHeadingContainer backArrow"></div>
                <h1>Reset your password</h1>
                <div class="imgHeadingContainer"></div>
            </div>
            <div class="blueSeperator"></div>
            <h2>Change your account password</h2>
            <div>
                <div class="inputBox">
                    <div class="inputField">
                        <input required id="passwordInput" class="passwordInput" type="password" placeholder="Password">
                        <img id="passwordImage" class="passwordImage" src="./assets/img/logInSignUp/lock.svg" alt="" onclick="togglePasswordVisibility(1)">
                    </div>
                    <div class="inputField">
                        <input required id="passwordInput2" class="passwordInput" type="password" placeholder="Password">
                        <img id="passwordImage2" class="passwordImage" src="./assets/img/logInSignUp/lock.svg" alt="" onclick="togglePasswordVisibility(2)">
                    </div>
                    <div id="passwordAlert"></div>
                </div>
            </div>
            <div class="logInButtonBox">
                <button id="signUp" type="onsubmit" class="continueButton">Continue</button>
            </div>
        </form>
    `;
}