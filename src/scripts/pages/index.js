import './../../../src/pages/index.css' 
import FormValidator  from '../components/FormValidator.js';  
import Card from '../components/Card.js'; 
import Section from '../components/Section.js'; 
import UserInfo from '../components/UserInfo.js'; 
import PopupWithForm from '../components/PopupWithForm.js'; 
import PopupWithImage from '../components/PopupWithImage.js';
import Api from '../components/Api.js';
import PopupWithSubmitDeleting from '../components/PopupWithSubmitDeleting.js';
  
import {  popupProfileSelector, editProfileButton, profileFormElement, 
popupPlaceSelector, addPlaceButton, placeFormElement,   
elementsList, popupShowPicture, config, avatarPicture, popupEditAvatarPictureSelector, 
popupWithSubmitDeletingSelector, saveButtons, avatarFormElement} from '../utils/constants.js'; 
 
const editFormValidator = new FormValidator(config, profileFormElement);  
const cardFormValidator = new FormValidator(config, placeFormElement);
const avatarFormValidator = new FormValidator(config, avatarFormElement)
const popupWithImage = new PopupWithImage(popupShowPicture); 

let cardsArray = [];
let cardList = null;

popupWithImage.setEventListeners(); 

const api = new Api({
  url: 'https://mesto.nomoreparties.co/v1/cohort-27',
  authorization: 'a3d0e919-8de7-4208-b834-e803f8c056f2'
})

const renderLoading = (isLoading) => {
  if (isLoading) {    
    saveButtons.forEach((item) => {
      item.textContent = 'Сохранение...'
    })
  } else {
    saveButtons.forEach((item) => {
      item.textContent = 'Сохранить'
    })
  }
}

editFormValidator.enableValidation();  
cardFormValidator.enableValidation();
avatarFormValidator.enableValidation();

Promise.all([
  api.getUserInformation(),
  api.getCards()
])
.then(([resOwnerData, cards]) => {
  const userInfoProfile = new UserInfo({data: resOwnerData})  
  userInfoProfile.getUserInfoFromServer()
  userInfoProfile.getUserAvatarFromServer()

  const popupProfile = new PopupWithForm({ 
    handleFormSubmit: (item) => {
      renderLoading(true)     
      api.setUserInfo(item)
      .then(() => {
        userInfoProfile.setUserInfo();
        userInfoProfile.getUserInfoFromServer()
      })
      .then(() => {
        popupProfile.close();
      })      
      .finally(() => {
        renderLoading(false);
      })
    }   
  }, popupProfileSelector)
  popupProfile.setEventListeners(); 
  editProfileButton.addEventListener('click', () => { 
    popupProfile.open(); 
    userInfoProfile.getUserInfo(); 
    userInfoProfile.ableSubmitButtonOpeningPopupProfile(); 
  })

  const addCards = (item, resp) => {
    const card = new Card({ 
      item:item,  
      cardSelector: '.elements__list-template', 
      handleCardClick: () => { 
        popupWithImage.open(item);      
      },
      handleLikeClick: (state) => {          
        if (state === true) {            
          api.removeLikeOnCard(resp._id)
          .then((resp) => {
            return card.showLikeCountFromServer(resp.likes)
          })    
          .then(() => {
            return card.removeLike()
          })
        } else if (state === false) {
          api.setLikeOnCard(resp._id)          
          .then((resp) => {
            return card.showLikeCountFromServer(resp.likes)
          })
          .then(() => {              
            return card.activeLike()
          })
        }  
      },      
      handleDeleteCard: () => {        
        const popupWithSubmitDeleting = new PopupWithSubmitDeleting(
          popupWithSubmitDeletingSelector,
          {
            deleteCard: () => {
              api.deleteCard(resp)
              .then(() => {
                popupWithSubmitDeleting.close()
                popupWithSubmitDeleting.deleteCardItem(cardElement)
              })
            }                
          }
        )
        popupWithSubmitDeleting.open()
        popupWithSubmitDeleting.setEventListeners()          
      }
    })
    const cardElement = card.generateCard(); 
    cardList.addItem(cardElement); 
    card.showTrashIcon(resOwnerData, resp);
    card.getLike(resOwnerData, resp)
    card.showLikeCountFromServer(resp.likes)    
  }

  const popupEditAvatarPicture = new PopupWithForm({
    handleFormSubmit: (item) => {      
      renderLoading(true)
      api.setUserAvatar(item)
      .then(() => {
        userInfoProfile.setAvatar(item)
      })
      .then(() => {
        popupEditAvatarPicture.close(); 
      })
      .finally(() => {
        renderLoading(false);        
      })
    }
  }, popupEditAvatarPictureSelector)
  
  popupEditAvatarPicture.setEventListeners()  
   
  avatarPicture.addEventListener('click', () => {
    popupEditAvatarPicture.open();
  })
  
  const popupAddPlace = new PopupWithForm({     
    handleFormSubmit: (item) => { 
      renderLoading(true)
      api.addCards(item.name, item.link)
      .then((resp) => {
        addCards(item, resp);
      })
      .then(() => {
        popupAddPlace.close();
      })
      .finally(() => {
        renderLoading(false)
      })
    }   
  }, popupPlaceSelector); 

  popupAddPlace.setEventListeners();

  addPlaceButton.addEventListener('click', () => {    
    popupAddPlace.open();   
  });  
  cardsArray = cards.map(item => {
    return {      
      name: item.name, 
      link: item.link,
      likes: item.likes,
      owner: item.owner._id,
      _id: item._id,      
    }
  })
  cardList = new Section({ 
    items: cardsArray,  
    renderer: (item) => {           
      addCards(item, item);
    } 
  }, elementsList)
  cardList.renderItems();
})