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

popupWithImage.setEventListeners(); 

const api = new Api({
  url: 'https://mesto.nomoreparties.co/v1/cohort-27'  
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
      .then((resp) => {
        if (resp.ok) {
          return resp.json();
        }
        return Promise.reject(`Ошибка: ${resp.status}`)
      })
      .catch((err) => {
        console.log(err)
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
          return resp.json();
        }
        return Promise.reject(`Ошибка: ${resp.status}`)
      })
      .catch((err) => {
        console.log(err)
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
      .then((resp) => {        
        if (resp.ok) {
          return resp.json()
        }
        return Promise.reject(`Ошибка: ${resp.status}`);
      })
      .then((resp) => {        
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
                if (resp.ok) {
                  return resp.json()
                }
                return Promise.reject(`Ошибка: ${resp.status}`);
              })
              .then((resp) => {              
                return card.showLikeCountFromServer(resp)
              })    
              .then(() => {
                return card.removeLike()
              })
              .catch((err) => {
                console.log(err)
              })
            } else if (state === false) {
              api.setLikeOnCard(resp)
              .then((resp) => {
                if (resp.ok) {
                  return resp.json();
                }
                return Promise.reject(`Ошибка: ${resp.status}`);
              })
              .then((resp) => {
                return card.showLikeCountFromServer(resp)
              })
              .then(() => {              
                return card.activeLike()
              })
              .catch((err) => {
                console.log(err)
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
        card.showTrashIcon(resp, item)
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
              if (resp.ok) {
                return resp.json()
              }
              return Promise.reject(`Ошибка: ${resp.status}`);
            })
            .then((resp) => {              
              return card.showLikeCountFromServer(resp)
            }) 
            .then(() => {
              return card.removeLike()
            })
            .catch((err) => {
              console.log(err)
            })   
          
          } else if (state === false) {
            api.setLikeOnCard(item)
            .then((resp) => {
              if (resp.ok) {
                return resp.json();
              }
              return Promise.reject(`Ошибка: ${resp.status}`);
            })
            .then((resp) => {
              return card.showLikeCountFromServer(resp)
            })
            .then(() => {              
              return card.activeLike()
            })
            .catch((err) => {
              console.log(err)
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

      const cardElement = card.generateCard(); 
      cardList.addItem(cardElement);
      card.getLike(item, res)
      card.showTrashIcon(item, res)
      card.showLikeCountFromServer(item)
    } 
  }, elementsList)
  cardList.renderItems();
})
.catch((err) => {
  console.log(err)
})