import './../../../src/pages/index.css' 
import FormValidator  from '../components/FormValidator.js';  
import Card from '../components/Card.js'; 
import Section from '../components/Section.js'; 
import UserInfo from '../components/UserInfo.js'; 
import PopupWithForm from '../components/PopupWithForm.js'; 
import PopupWithImage from '../components/PopupWithImage.js';
import Api from '../components/Api.js';
  
import {  initialCards, popupProfileSelector, editProfileButton, profileFormElement, profileName,  
profileActivity, popupPlaceSelector, addPlaceButton, placeFormElement,   
elementsList, popupShowPicture, config, avatarPicture, popupEditAvatarPictureSelector} from '../utils/constants.js'; 
 
const editFormValidator = new FormValidator(config, profileFormElement);  
const cardFormValidator = new FormValidator(config, placeFormElement);  
 
const dataFromFormProfile = {name: profileName, about:profileActivity}; 
 
const popupWithImage = new PopupWithImage(popupShowPicture); 
popupWithImage.setEventListeners(); 




const api = new Api({
  url: 'https://mesto.nomoreparties.co/v1/cohort-26',
  headers: {
    authorization: '7193839f-c244-42ce-8d35-bd3460436d94'
  }
})
 
const addCard = (item) => { 
  const card = new Card({ 
    item:item,  
    cardSelector: '.elements__list-template', 
    handleCardClick: () => { 
      popupWithImage.open(item); 
    }
    
  });
  return card
} 

/////
/*const popupProfile = new PopupWithForm({ 
  handleFormSubmit: (item) => { 
    userInfoProfile.setUserInfo(item); 
    popupProfile.close(); 
  }   
}, popupProfileSelector) 



const popupAddPlace = new PopupWithForm({ 
 
  handleFormSubmit: (item) => { 
  addCard(item); 
  popupAddPlace.close(); 
  } 
 
}, popupPlaceSelector); 
*/
////////

const popupEditAvatarPicture = new PopupWithForm({
  handleFormSubmit: (item) => {
    avatarPicture.src = item.link;
    popupEditAvatarPicture.close();
    api.setUserAvatar(item.link)
  }
}, popupEditAvatarPictureSelector)

popupEditAvatarPicture.setEventListeners()

 
avatarPicture.addEventListener('click', () => {
  popupEditAvatarPicture.open();
})




editFormValidator.enableValidation();  
cardFormValidator.enableValidation();
 
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






//пример из слака

let cardsArray = [];
let cardList = null;

Promise.all([
  api.getUserInformation(),
  api.getCards()
])
.then(([res, cards]) => {

  console.log('Информация о пользователе с сервера');
  const userInfoProfile = new UserInfo({data: res}) 

  userInfoProfile.getUserInfoFromServer()
  userInfoProfile.getUserAvatarFromServer();

 
  const popupProfile = new PopupWithForm({ 
    handleFormSubmit: (res) => { 
      userInfoProfile.setUserInfo(res);
      popupProfile.close();
      api.setUserInfo(res)
  
    }   
  }, popupProfileSelector) 
  
  
  
  popupProfile.setEventListeners(); 
 

  editProfileButton.addEventListener('click', () => { 
    popupProfile.open(); 
    userInfoProfile.getUserInfo(); 
    userInfoProfile.ableSubmitButtonOpeningPopupProfile(); 
  }) 


  //userInfoProfile.setUserAvatar(res.avatar);
  //userInfoProfile.setUserId(res._id);
  
  cardsArray = cards.map(item => {
    return {      
      name: item.name, 
      link: item.link,
      likes: item.likes,
      owner: item.owner._id,
      id: item._id,      
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
          else {
            console.log('qweqweqweqweqwe')
          }
        }
        
      });


      const cardElement = card.generateCard(); 
      cardList.addItem(cardElement);
      card.getLike(item, res)
      card.showLikeCount(item)
    } 
  }, elementsList)
  cardList.renderItems();
  
})






//старая версия реализации инишл кард
/*
.then((qwe) => {
  const item = qwe.map((item) => {
      let qweqwe = {}
      return qweqwe = {name: item.name, link: item.link}
  })
  let renderedCard = new Section({ 
    items: item,  
    renderer: (item) => { 
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
  }, elementsList) 

  renderedCard.renderItems();*/

/*
  const popupProfile = new PopupWithForm({ 
    handleFormSubmit: (item) => { 
      userInfoProfile.setUserInfo(item); 
      popupProfile.close();
      api.setUserInfo(item)
    }   
  }, popupProfileSelector) 
   
  popupProfile.setEventListeners(); 


  editProfileButton.addEventListener('click', () => { 
    popupProfile.open(); 
    userInfoProfile.getUserInfo(); 
    userInfoProfile.ableSubmitButtonOpeningPopupProfile(); 
  }) 
  
})
*/


