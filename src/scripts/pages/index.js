import './../../../src/pages/index.css'
import FormValidator  from '../components/FormValidator.js'; 
import Card from '../components/Card.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js'
 
import {  initialCards, popupProfileSelector, editProfileButton, profileFormElement, profileName, 
profileActivity, popupPlaceSelector, addPlaceButton, placeFormElement,  
elementsList, popupShowPicture, config} from '../utils/constants.js';

const editFormValidator = new FormValidator(config, profileFormElement); 
const cardFormValidator = new FormValidator(config, placeFormElement); 

const dataFromFormProfile = {name: profileName, activity:profileActivity};

const popupWithImage = new PopupWithImage(popupShowPicture);
popupWithImage.setEventListeners();

const addCard = (item) => {
  const card = new Card({
    item:item, 
    cardSelector: '.elements__list-template',
    handleCardClick: () => {
      popupWithImage.open(item);
    }    
  });
  const cardElement = card.generateCard();
  renderedCard.addItem(cardElement);
}

const renderedCard = new Section({
  items: initialCards, 
  renderer: (item) => {
    addCard(item);
  }
}, elementsList)

renderedCard.renderItems();

editFormValidator.enableValidation(); 
cardFormValidator.enableValidation();

const userInfoPopupProfile = new UserInfo({data: dataFromFormProfile})

const popupProfile = new PopupWithForm({
  handleFormSubmit: (item) => {
    userInfoPopupProfile.setUserInfo(item);
    popupProfile.close();
  }  
}, popupProfileSelector)

popupProfile.setEventListeners();

editProfileButton.addEventListener('click', () => {
  popupProfile.open();
  userInfoPopupProfile.getUserInfo();
  userInfoPopupProfile.ableSubmitButtonOpeningPopupProfile();
})

const popupAddPlace = new PopupWithForm({

  handleFormSubmit: (item) => {
  addCard(item);
  popupAddPlace.close();
  }

}, popupPlaceSelector);


popupAddPlace.setEventListeners();
addPlaceButton.addEventListener('click', () => {   
  popupAddPlace.open();  
});

