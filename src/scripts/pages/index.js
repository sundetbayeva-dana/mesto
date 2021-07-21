import './../../../src/pages/index.css'
import FormValidator  from '../components/FormValidator.js'; 
import Card from '../components/Card.js';
import Section from '../components/Section.js';
import Popup from '../components/Popup.js'
import UserInfo from '../components/UserInfo.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js'
 
import {  initialCards, popupProfileSelector, editProfileButton, profileFormElement, profileName, 
profileActivity, popupPlaceSelector, addPlaceButton, placeFormElement,  
elementsList, popupShowPicture, config} from '../utils/constants.js';

const editFormValidator = new FormValidator(config, profileFormElement); 
const cardFormValidator = new FormValidator(config, placeFormElement); 

const dataFromFormProfile = {name: profileName, activity:profileActivity};

const addCard = (item) => {
  const card = new Card({
    item:item, 
    cardSelector: '.elements__list-template',
    handleCardClick: () => { 
      const popupWithImage = new PopupWithImage(popupShowPicture);
      popupWithImage.open(item);
      popupWithImage.setEventListeners();
    }  
  });
  const cardElement = card.generateCard();
  renderedCard.addItem(cardElement);
}

const renderedCard = new Section({
  items: initialCards, renderer: (item) => {
    addCard(item);
  }
}, elementsList)

renderedCard.renderItems();

editFormValidator.enableValidation(); 
cardFormValidator.enableValidation();

const popupProfile = new Popup(popupProfileSelector)
const userInfoPopupProfile = new UserInfo({data: dataFromFormProfile})
editProfileButton.addEventListener('click', () => {
  popupProfile.open();
  popupProfile.setEventListeners();
  userInfoPopupProfile.getUserInfo();
  userInfoPopupProfile.ableSubmitButtonOpeningPopupProfile();
})
const handlerFormProfileSubmit = (evt) => { 
  evt.preventDefault();  
  userInfoPopupProfile.setUserInfo();
  popupProfile.close();
}; 
profileFormElement.addEventListener('submit', handlerFormProfileSubmit);

const popupWithForm = new PopupWithForm({
  handleFormCardSubmit: () => {    
    const data = popupWithForm._getInputValues();
    addCard(data)
    popupWithForm.close();
  }
}, popupPlaceSelector);

addPlaceButton.addEventListener('click', () => {   
  popupWithForm.open();
  popupWithForm.setEventListeners();
});