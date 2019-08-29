const nameFormContainer = document.querySelector('.js-nameForm');
const nameInput = nameFormContainer.querySelector('input');
const greetings = document.querySelector(".js-greetings");

const USER_LS = 'currentUser';
const SHOWING_CN = 'showing';

function saveUserName(userName) {
    localStorage.setItem(USER_LS, userName);
}

function handleSubmit(event) {
    event.preventDefault();
    
    const currentValue = nameInput.value;
    if (currentValue !== null) {
        paintGreetings(currentValue);
        saveUserName(currentValue);
    }
}

function askFormUserName() {
    nameFormContainer.classList.add(SHOWING_CN);
    nameFormContainer.addEventListener('submit', handleSubmit);
}

function paintGreetings(userName) {
    nameFormContainer.classList.remove(SHOWING_CN);
    greetings.classList.add(SHOWING_CN);
    greetings.innerHTML = `Hello ${userName}`;
}

function loadName() {
    const currentUserName = localStorage.getItem(USER_LS);
    if (currentUserName === null) {
        askFormUserName();
    } else {
        paintGreetings(currentUserName);
    }
}

function init() {
    loadName();
}

init();
