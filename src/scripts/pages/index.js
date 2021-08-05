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
elementsList, popupShowPicture, config, avatarPicture, popupEditAvatarPictureSelector, popupWithSubmitDeletingSelector} from '../utils/constants.js'; 
 
const editFormValidator = new FormValidator(config, profileFormElement);  
const cardFormValidator = new FormValidator(config, placeFormElement);  
const popupWithImage = new PopupWithImage(popupShowPicture); 
popupWithImage.setEventListeners(); 

const api = new Api({
  url: 'https://mesto.nomoreparties.co/v1/cohort-26',
  headers: {
    authorization: '7193839f-c244-42ce-8d35-bd3460436d94'
  }
})

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

  const popupEditAvatarPicture = new PopupWithForm({
    handleFormSubmit: (item) => {
      userInfoProfile.setAvatar(item)
      popupEditAvatarPicture.close();      
      api.setUserAvatar(item)
    }
  }, popupEditAvatarPictureSelector)
  
  popupEditAvatarPicture.setEventListeners()  
   
  avatarPicture.addEventListener('click', () => {
    popupEditAvatarPicture.open();
  })

  const popupAddPlace = new PopupWithForm({     
    handleFormSubmit: (item) => {
      api.addCards(item.name, item.link)
      .then((resNewCard) => {
        console.log(resNewCard)
      
      const card = new Card({ 
        item:item,  
        cardSelector: '.elements__list-template', 
        handleCardClick: () => { 
          popupWithImage.open(item);
          console.log(cards)       
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
              console.log(resp)
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
              }                
            })
          popupWithSubmitDeleting.open()
          popupWithSubmitDeleting.setEventListeners()
        
        }



      });
      const cardElement = card.generateCard();
      console.log(cardElement)
      cardList.addItem(cardElement);
      card.showTrashIcon(resNewCard, item)    

    })




      

    
  

    /*api.addCards(item.name, item.link)
    .then((res) => {      
      card.showTrashIcon(res, item)
      
    })*/

  
    popupAddPlace.close();
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
                console.log(item)
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





