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

  userInfoProfile.getUserInfoFromServer(resOwnerData)
  userInfoProfile.getUserAvatarFromServer(resOwnerData)

  const popupProfile = new PopupWithForm({ 
    handleFormSubmit: (item) => { 
      userInfoProfile.setUserInfo(resOwnerData);
      userInfoProfile.getUserInfoFromServer(item)
      renderLoading(true)
      api.setUserInfo(item)      
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
          api.removeLikeOnCard(resp)
          .then((resp) => {              
            return card.showLikeCountFromServer(resp)
          })    
          .then(() => {
            return card.removeLike()
          })
        } else if (state === false) {
          api.setLikeOnCard(resp)          
          .then((resp) => {
            return card.showLikeCountFromServer(resp)
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
              popupWithSubmitDeleting.close()
              popupWithSubmitDeleting.deleteCardItem(cardElement)
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
    card.showLikeCountFromServer(resp)    
  }

  const popupEditAvatarPicture = new PopupWithForm({
    handleFormSubmit: (item) => {
      userInfoProfile.setAvatar(item)      
      renderLoading(true)
      api.setUserAvatar(item)
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
        popupAddPlace.close();
        addCards(item, resp);
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
      
      const card = new Card({ 
        item:item,  
        cardSelector: '.elements__list-template', 
        handleCardClick: () => { 
          popupWithImage.open(item); 
        },
        handleLikeClick: (state) => {
          if (state === true) {
            api.removeLikeOnCard(item)            
            .then((resp) => {              
              return card.showLikeCountFromServer(resp)
            }) 
            .then(() => {
              return card.removeLike()
            })
          } else if (state === false) {
            api.setLikeOnCard(item)            
            .then((resp) => {
              return card.showLikeCountFromServer(resp)
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
                api.deleteCard(item)
                popupWithSubmitDeleting.close();
                popupWithSubmitDeleting.deleteCardItem(cardElement)
              }                
            })
            
          popupWithSubmitDeleting.open()
          popupWithSubmitDeleting.setEventListeners()        
        }        
      });      
      addCards(item, item);
    } 
  }, elementsList)
  cardList.renderItems();
})