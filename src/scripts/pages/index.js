import './../../../src/pages/index.css' 
import FormValidator  from '../components/FormValidator.js';  
import Card from '../components/Card.js'; 
import Section from '../components/Section.js'; 
import UserInfo from '../components/UserInfo.js'; 
import PopupWithForm from '../components/PopupWithForm.js'; 
import PopupWithImage from '../components/PopupWithImage.js';
import Api from '../components/Api.js';
import PopupWithSubmitDeleting from '../components/PopupWithSubmitDeleting.js';
  
import {  initialCards, popupProfileSelector, editProfileButton, profileFormElement, profileName,  
profileActivity, popupPlaceSelector, addPlaceButton, placeFormElement,   
elementsList, popupShowPicture, config, avatarPicture, popupEditAvatarPictureSelector, popupWithSubmitDeletingSelector, popup} from '../utils/constants.js'; 
 
const editFormValidator = new FormValidator(config, profileFormElement);  
const cardFormValidator = new FormValidator(config, placeFormElement);  
const popupWithImage = new PopupWithImage(popupShowPicture); 
popupWithImage.setEventListeners(); 

const api = new Api({
  url: 'https://mesto.nomoreparties.co/v1/cohort-27',
  headers: {
    authorization: 'a3d0e919-8de7-4208-b834-e803f8c056f2'
  }
})
const qwe = document.querySelectorAll('.button_type_save');
const renderLoading = (isLoading) => {
  if (isLoading) {    
    qwe.forEach((item) => {
      item.textContent = 'Сохранение...'
    })
  } else {
    qwe.forEach((item) => {
      item.textContent = 'Сохранить'
    })
  }
}

editFormValidator.enableValidation();  
cardFormValidator.enableValidation();

let cardsArray = [];
let cardList = null;

Promise.all([
  api.getUserInformation(),
  api.getCards()
])
.then(([res, cards]) => {
  const userInfoProfile = new UserInfo({data: res}) 

  userInfoProfile.getUserInfoFromServer(res)
  userInfoProfile.getUserAvatarFromServer(res)

  const popupProfile = new PopupWithForm({ 
    handleFormSubmit: (item) => { 
      userInfoProfile.setUserInfo(res);
      userInfoProfile.getUserInfoFromServer(item)
      renderLoading(true)
      api.setUserInfo(item)
      .then((item) => {
        if (item.ok) {
          return item.json();       
        }
      })
      .finally(() => {
        renderLoading(false);
        popupProfile.close();
      })
    }   
  }, popupProfileSelector)   
  popupProfile.setEventListeners(); 
  editProfileButton.addEventListener('click', () => { 
    popupProfile.open(); 
    userInfoProfile.getUserInfo(); 
    userInfoProfile.ableSubmitButtonOpeningPopupProfile(); 
  })

  const popupEditAvatarPicture = new PopupWithForm({
    handleFormSubmit: (item) => {
      userInfoProfile.setAvatar(item)
      
      renderLoading(true)
      api.setUserAvatar(item)
      .then((resp) => {
        if (resp.ok) {
          //renderLoading(false)
        }
      })
      .finally(() => {
        renderLoading(false)
        popupEditAvatarPicture.close(); 
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
      .then((resNewCard) => {
        
        if (resNewCard.ok) {
          return resNewCard.json()

        }
        
        const card = new Card({ 
          item:item,  
          cardSelector: '.elements__list-template', 
          handleCardClick: () => { 
            popupWithImage.open(item);      
          },
          handleLikeClick: (state) => {          
            if (state === true) {            
              api.removeLikeOnCard(resNewCard)  
              .then((resp) => {              
                return card.showLikeCountFromServer(resp)
              })    
              .then(() => {
                return card.removeLike()
              })
            } else if (state === false) {
              api.setLikeOnCard(resNewCard)
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
                  api.deleteCard(resNewCard)
                  popupWithSubmitDeleting.close()
                  popupWithSubmitDeleting.qwedeleteCard(cardElement)
                }                
              }
            )
            popupWithSubmitDeleting.open()
            popupWithSubmitDeleting.setEventListeners()
          
          }
        })
      
      const cardElement = card.generateCard();

      cardList.addItem(cardElement);
      card.showTrashIcon(resNewCard, item)    
      //renderLoading(true)
    })
    .catch((err) => {
      console.log(err)
    })

    .finally(() => {
      renderLoading(false)
      popupAddPlace.close();
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
                popupWithSubmitDeleting.close()

                popupWithSubmitDeleting.qwedeleteCard(cardElement)
              }                
            })
            
          popupWithSubmitDeleting.open()
          popupWithSubmitDeleting.setEventListeners()
        
        }
        
      });

      const cardElement = card.generateCard(); 
      cardList.addItem(cardElement);
      card.getLike(item, res)
      card.showTrashIcon(item, res)
      card.showLikeCount(item)

          } 
  }, elementsList)
  cardList.renderItems();
})





