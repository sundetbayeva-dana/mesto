const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

const popupProfileSelector = document.querySelector('.popup-profile'); //попап пользователя 
const editProfileButton = document.querySelector('.button_type_edit'); //кнопка открытия попапа пользователя 
const profileFormElement = popupProfileSelector.querySelector('.popup__form-profile') //форма попапа пользователя 
const profileName = document.querySelector('.profile__info-name'); //имя пользователя 
const profileActivity = document.querySelector('.profile__info-activity'); //деятельности пользователя 
const nameInput = document.querySelector('.popup__form-text_type_name'); //имя пользователя в инпуте  
const activityInput = document.querySelector('.popup__form-text_type_activity'); //деятельность пользователя в инпуте 
const avatarPicture = document.querySelector('.profile__avatar');
const popupEditAvatarPictureSelector = document.querySelector('.popup-avatar-change');
const popupWithSubmitDeletingSelector = document.querySelector('.popup-confirm-delete')


const popupPlaceSelector = document.querySelector('.popup-place'); //попап места 
const addPlaceButton = document.querySelector('.button_type_add'); //кнопка открытия попапа места 
 
const placeFormElement = popupPlaceSelector.querySelector('.popup__form-place'); 
const itemNameFormElement = placeFormElement.querySelector('.popup__form-text_type_name-pic'); 
const itemPicFormElement = placeFormElement.querySelector('.popup__form-text_type_link'); 
 
const popups = Array.from(document.querySelectorAll('.popup')); 
 
const elementsList = document.querySelector('.elements__list');

const popupShowPicture = document.querySelector('.popup-card');
const picture = popupShowPicture.querySelector('.popup-card__pic');
const pictureName = popupShowPicture.querySelector('.popup-card__picname');

const likeCount = document.querySelector('.card__like-count')

const trashIcon = document.querySelector('.button_type_delete')


const config = { 
  formSelector: '.popup__form', 
  inputSelector: '.popup__form-text', 
  submitButtonSelector: '.button_type_save', 
  inactiveButtonClass: 'button_type_invalid', 
  inputErrorClass: 'popup__form-text-error', 
  errorClass: 'popup__form-text-error_active', 
} 

export { initialCards, popupProfileSelector, editProfileButton, profileFormElement, profileName, 
  profileActivity, nameInput, activityInput, popupPlaceSelector, addPlaceButton, placeFormElement, itemNameFormElement, 
  itemPicFormElement, popups, elementsList, popupShowPicture, picture, pictureName, config, avatarPicture, popupEditAvatarPictureSelector, likeCount, trashIcon, popupWithSubmitDeletingSelector}

