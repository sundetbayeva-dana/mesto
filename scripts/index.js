let popup = document.querySelector('.popup');
let editButton = document.querySelector('.edit-button');
let closeButton = document.querySelector('.popup__button-close');
let formElement = document.querySelector('.input')
let profileName = document.querySelector('.profile__info-name');
let profileActivity = document.querySelector('.profile__info-activity');
let nameInput = document.querySelector('.popup__name')
let activityInput = document.querySelector('.popup__activity');

//let likeButton = document.querySelectorAll('.element__list-like');
//let likeButtonActive = document.querySelector(.'element__list-like_active')

editButton.addEventListener('click', openPopup);
closeButton.addEventListener('click', closePopup);
formElement.addEventListener('submit', formSubmitHandler);


function openPopup() {
    popup.classList.add('popup_opened');
    
    nameInput.value = profileName.textContent;
    activityInput.value = profileActivity.textContent;
}

function closePopup() {
    popup.classList.remove('popup_opened');
}

function formSubmitHandler (evt) {
    evt.preventDefault();

    profileName.textContent = nameInput.value;
    profileActivity.textContent = activityInput.value;

    closePopup(); 
}