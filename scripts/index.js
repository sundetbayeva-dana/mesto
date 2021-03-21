let popup = document.querySelector('.popup');
let editButton = document.querySelector('.button_type_edit');
let closeButton = document.querySelector('.button_type_close');
let formElement = document.querySelector('.popup__form')
let profileName = document.querySelector('.profile__info-name');
let profileActivity = document.querySelector('.profile__info-activity');
let nameInput = document.querySelector('.popup__form-text_type_name');
let activityInput = document.querySelector('.popup__form-text_type_activity');

//let likeButton = document.querySelectorAll('.element__list-like');
//let likeButtonActive = document.querySelector(.'element__list-like_active')






function openPopup() {
    popup.classList.add('popup_opened');
    
    nameInput.value = profileName.textContent;
    activityInput.value = profileActivity.textContent;
}

editButton.addEventListener('click', openPopup);

function closePopup() {
    popup.classList.remove('popup_opened');
}

closeButton.addEventListener('click', closePopup);

function formSubmitHandler (evt) {
    evt.preventDefault();

    profileName.textContent = nameInput.value;
    profileActivity.textContent = activityInput.value;

    closePopup(); 
}

formElement.addEventListener('submit', formSubmitHandler);