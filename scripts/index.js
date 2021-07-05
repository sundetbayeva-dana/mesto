import FormValidator  from './FormValidator.js';
import initialCards from './constants.js';
import Card from './Card.js';

const popupProfile = document.querySelector('.popup-profile'); //попап пользователя
const editProfileButton = document.querySelector('.button_type_edit'); //кнопка открытия попапа пользователя
const profileFormElement = document.querySelector('.popup__form') //форма попапа пользователя
const profileName = document.querySelector('.profile__info-name'); //имя пользователя
const profileActivity = document.querySelector('.profile__info-activity'); //деятельности пользователя
const nameInput = document.querySelector('.popup__form-text_type_name'); //имя пользователя в инпуте 
const activityInput = document.querySelector('.popup__form-text_type_activity'); //деятельность пользователя в инпуте

const popupPlace = document.querySelector('.popup-place'); //попап места
const addPlaceButton = document.querySelector('.button_type_add'); //кнопка открытия попапа места

const placeFormElement = popupPlace.querySelector('.popup__form-place');
const itemNameFormElement = placeFormElement.querySelector('.popup__form-text_type_name-pic');
const ItemPicFormElement = placeFormElement.querySelector('.popup__form-text_type_link');

const popups = Array.from(document.querySelectorAll('.popup'));
const popupOverlays = Array.from(document.querySelectorAll('.popup__overlay'));
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

const editFormValidator = new FormValidator(config, profileFormElement);
const cardFormValidator = new FormValidator(config, placeFormElement);

function openPopup(modal) {
  modal.classList.add('popup_opened');
  document.addEventListener('keydown', handleEscUp);
  cardFormValidator.enableValidation();
  editFormValidator.enableValidation();
  placeFormElement.reset();
}

function closePopup(modal) {
  modal.classList.remove('popup_opened');
  document.removeEventListener('keydown', handleEscUp); 
}

function handleFormCardSubmit(event) {
  event.preventDefault();
  const name = itemNameFormElement.value;
  const imageSrc = ItemPicFormElement.value;
  const data = {name:name, link:imageSrc}
  newCardFromClassCard(data);
  closePopup(popupPlace);
  placeFormElement.reset();
};

function newCardFromClassCard(item) {
  const card = new Card(item, '.elements__list-template');
  const cardElement = card.generateCard(); 
  elementsList.prepend(cardElement); 
}

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
  newCardFromClassCard(item)
})

editProfileButton.addEventListener('click', () => {
  openPopup(popupProfile);
  nameInput.value = profileName.textContent;
  activityInput.value = profileActivity.textContent;
});

popups.forEach((popupElement) => {
  popupOverlays.forEach((itemElement) => {
    itemElement.addEventListener('click', () => closePopup(popupElement));
  });
  closeButton.forEach((itemElement) => {
    itemElement.addEventListener('click', () => closePopup(popupElement));
  })
})


placeFormElement.addEventListener('submit', handleFormCardSubmit);
profileFormElement.addEventListener('submit', handlerFormProfileSubmit);
addPlaceButton.addEventListener('click', () => openPopup(popupPlace));

editFormValidator.enableValidation();
cardFormValidator.enableValidation();

export { handleEscUp }