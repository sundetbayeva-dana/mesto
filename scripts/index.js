const popupProfile = document.querySelector('.popup-profile'); //попап пользователя
const editButtonProfile = document.querySelector('.button_type_edit'); //кнопка открытия попапа пользователя
const formElementProfile = document.querySelector('.popup__form') //форма попапа пользователя
const profileName = document.querySelector('.profile__info-name'); //имя пользователя
const profileActivity = document.querySelector('.profile__info-activity'); //деятельности пользователя
const nameInput = document.querySelector('.popup__form-text_type_name'); //имя пользователя в инпуте 
const activityInput = document.querySelector('.popup__form-text_type_activity'); //деятельность пользователя в инпуте

const popupPlace = document.querySelector('.popup-place'); //попап места
const addButtonPlace = document.querySelector('.button_type_add'); //кнопка открытия попапа места

const formElementPlace = popupPlace.querySelector('.popup__form-place');
const formElementItemName = formElementPlace.querySelector('.popup__form-text_type_name-pic');
const formElementItemPic = formElementPlace.querySelector('.popup__form-text_type_link');

const popups = Array.from(document.querySelectorAll('.popup'));
const overlayClose = Array.from(document.querySelectorAll('.popup__overlay'));
const closeButton = Array.from(document.querySelectorAll('.button_type_close'));

const elementsList = document.querySelector('.elements__list');

const config = {

  formSelector: '.popup__form',
  inputSelector: '.popup__form-text',
  submitButtonSelector: '.button_type_save',
  inactiveButtonClass: 'button_type_invalid',
  inputErrorClass: 'popup__form-text-error',
  errorClass: 'popup__form-text-error_active',

}

const editFormValidator = new FormValidator(config, formElementProfile);
const cardFormValidator = new FormValidator(config, formElementPlace);

import { Card, initialCards } from './Card.js' 
import { FormValidator } from './FormValidator.js'

function openPopup(modal) {
  modal.classList.add('popup_opened');
  document.addEventListener('keydown', handleEscUp);
}

function addProfileData() {
  nameInput.value = profileName.textContent;
  activityInput.value = profileActivity.textContent;
}

function closePopup(modal) {
  modal.classList.remove('popup_opened');
  document.removeEventListener('keydown', handleEscUp); 
}

function handleFormCardSubmit(event) {
  event.preventDefault();
  const name = formElementItemName.value;
  const imageSrc = formElementItemPic.value;
  const data = {name:name, link:imageSrc}
  const cardElement = new Card(data, '.elements__list-template').generateCard();
  elementsList.prepend(cardElement);
  closePopup(popupPlace);
  formElementPlace.reset();
};

function handlerFormProfileSubmit(event) {
  event.preventDefault();  
  profileName.textContent = nameInput.value;
  profileActivity.textContent = activityInput.value;
  closePopup(popupProfile);
}

const handleEscUp = (event) => {
  if (event.key === 'Escape') {
    popups.forEach((popupElement) => {
      if (popupElement.classList.contains('popup_opened')) {  
        closePopup(popupElement);
      }
    })    
  }
}

initialCards.forEach((item) => {
  const card = new Card(item, '.elements__list-template');
  const cardElement = card.generateCard();
  elementsList.prepend(cardElement);
})

editButtonProfile.addEventListener('click', () => {
  openPopup(popupProfile);
  addProfileData();
});

popups.forEach((popupElement) => {
  overlayClose.forEach((itemElement) => {
    itemElement.addEventListener('click', () => closePopup(popupElement));
  });
  closeButton.forEach((itemElement) => {
    itemElement.addEventListener('click', () => closePopup(popupElement));
  })
})


formElementPlace.addEventListener('submit', handleFormCardSubmit);
formElementProfile.addEventListener('submit', handlerFormProfileSubmit);
addButtonPlace.addEventListener('click', () => openPopup(popupPlace));

editFormValidator.enableValidation();
cardFormValidator.enableValidation();

export { handleEscUp }
