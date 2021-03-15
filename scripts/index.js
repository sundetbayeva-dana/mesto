/*let popup = document.querySelector('.popup');
let editButton = document.querySelector('.edit-button');
let closeButton = document.querySelector('.popup__button-close');
let popupOverlay = document.querySelector('.popup__overlay');

let nameInput = document.querySelector('popup__name');
let profileName = document.querySelector('.profile__info-name');
let activityInput = document.querySelector('popup__activity');
let profileActivity = document.querySelector('.profile__info-activity');
let formElement = document.querySelector('.input');



editButton.addEventListener('click', openPopup);
closeButton.addEventListener('click', closePopup);
popupOverlay.addEventListener('click', closePopup);
formElement.addEventListener('submit', formSubmitHandler);

function openPopup() {
    popup.classList.add('popup_opened');
    //profileName.textContent = nameInput.value;
    //profileName.textContent = nameInput;
    //activityInput.value = profileActivity;
}

function formSubmitHandler (evt) {
    evt.preventDefault();
    nameInput.value = profileName.textContent;
    
    profileActivity.textContent = activityInput.value;

    closePopup();
}



function closePopup() {
    popup.classList.remove('popup_opened')
}



console.log(profileName);
*/


let popup = document.querySelector('.popup');
let openPopupBtn = document.querySelector('.edit-button');
let closePopupBtn = document.querySelector('.popup__button-close');
let formElement = document.querySelector('.input')
let profileName = document.querySelector('.profile__info-name');
let profileStatus = document.querySelector('.profile__info-activity');
let nameInput = document.querySelector('.popup__name')
let statusInput = document.querySelector('.popup__activity');

openPopupBtn.addEventListener('click', openPopup);
closePopupBtn.addEventListener('click', closePopup);
formElement.addEventListener('submit', formSubmitHandler);


function openPopup() {
    popup.classList.add('popup_opened');
    nameInput.value = profileName.textContent;
    statusInput.value = profileStatus.textContent;
}

function closePopup() {
    popup.classList.remove('popup_opened');
}

function formSubmitHandler (evt) {
    evt.preventDefault();
    /*profileName.textContent = nameInput.value;
    profileStatus.textContent = statusInput.value;*/
    profileName.textContent = nameInput.value;
    profileStatus.textContent = statusInput.value;

    closePopup(); 
}
