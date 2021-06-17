//переменные использующиеся в попапе пользователя
const popupProfile = document.querySelector('.popup-profile'); //попап пользователя
const editButtonProfile = document.querySelector('.button_type_edit'); //кнопка открытия попапа пользователя
const formElementProfile = document.querySelector('.popup__form') //форма попапа пользователя
const profileName = document.querySelector('.profile__info-name'); //имя пользователя
const profileActivity = document.querySelector('.profile__info-activity'); //деятельности пользователя
const nameInput = document.querySelector('.popup__form-text_type_name'); //имя пользователя в инпуте 
const activityInput = document.querySelector('.popup__form-text_type_activity'); //деятельность пользователя в инпуте
//переменные использующиеся  в попапе места
const popupPlace = document.querySelector('.popup-place'); //попап места
const addButtonPlace = document.querySelector('.button_type_add'); //кнопка открытия попапа места

//переменные для добавления карточек
const formElementPlace = popupPlace.querySelector('.popup__form-place');
const formElementItemName = formElementPlace.querySelector('.popup__form-text_type_name-pic');
const formElementItemPic = formElementPlace.querySelector('.popup__form-text_type_link');

//переменные для загрузки существующих карточек 
const elementsList = document.querySelector('.elements__list');
const cardTemplate = document.querySelector('.elements__list-template').content;
const popupCard = document.querySelector('.popup-card');


const pictureName = popupCard.querySelector('.popup-card__picname');
//const closeButton = document.querySelectorAll('.button_type_close');

const popups = Array.from(document.querySelectorAll('.popup'));
const overlayClose = Array.from(document.querySelectorAll('.popup__overlay'));
const closeButton = Array.from(document.querySelectorAll('.button_type_close'));


function openPopup(modal) {
  modal.classList.add('popup_opened');
}

function addProfileData() {
  nameInput.value = profileName.textContent;
  activityInput.value = profileActivity.textContent;
}

function closePopup(modal) {
  modal.classList.remove('popup_opened');
}

function handleLikeCardClick(event) {
  event.target.classList.toggle('button_type_like-active');
}

function handleDeleteCardClick(event) {
  event.target.closest('.card').remove();
}

function handleClickCard(cardData) {
  const pic = popupCard.querySelector('.popup-card__pic');
  pic.src = cardData.link;
  openPopup(popupCard);
  pictureName.textContent = cardData.name;
  pic.alt = cardData.name;  
}

function createCard(cardData) {
  const card = cardTemplate.cloneNode(true);
  const titleElement = card.querySelector('.card__name');
  const imageElement = card.querySelector('.card__pic');
  const likeIconElement = card.querySelector('.button_type_like');
  const removeIconElement = card.querySelector('.button_type_delete');

  titleElement.textContent = cardData.name;
  imageElement.src = cardData.link;
  imageElement.alt = cardData.name;
  likeIconElement.addEventListener('click', handleLikeCardClick);
  imageElement.addEventListener('click', () => handleClickCard(cardData));
  removeIconElement.addEventListener('click', handleDeleteCardClick);
  return card;
}

function handleFormCardSubmit(event) {
  event.preventDefault();
  const name = formElementItemName.value;
  const imageSrc = formElementItemPic.value;
  const cardElement = createCard({name: name,link: imageSrc});
  elementsList.prepend(cardElement);  

  closePopup(popupPlace);
  formElementPlace.reset();
};

function handlerFormProfileSubmit(event) {
  event.preventDefault();
  profileName.textContent = nameInput.value;
  profileActivity.textContent = activityInput.value;
  closePopup(popupProfile);
}

const showError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add('popup__form-text-error');
  errorElement.textContent = errorMessage;
  errorElement.classList.add('popup__form-text-error_active');
}

const hideError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove('popup__form-text-error');
  errorElement.classList.remove('popup__form-text-error_active');
  errorElement.textContent = ''
};

const checkInputValidity = (formElement, inputElement) => {

  if (!inputElement.validity.valid) {
    showError(formElement, inputElement, inputElement.validationMessage);

    console.log(inputElement.validity)
   } else {    
    hideError(formElement, inputElement) 
  };
  
};


const setEventListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll('.popup__form-text'));
  const buttonElement =  formElement.querySelector('.button_type_save');
  toggleButtonState(inputList, buttonElement)
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function() {
      checkInputValidity(formElement, inputElement);
      toggleButtonState(inputList, buttonElement)
    })
  })

}



function enableValidation() {
  let formList = Array.from(document.querySelectorAll('.popup__form-place'));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (event) => {
      event.preventDefault();
    });
    setEventListeners(formElement);
  })
 }
 enableValidation();

 function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
}

function toggleButtonState(inputList, buttonElement) {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add('button_type_invalid');
    buttonElement.setAttribute('disabled', 'disabled')
  }
  else {
    buttonElement.classList.remove('button_type_invalid');
    buttonElement.removeAttribute('disabled');
  }
}

function handleEscUp(event) {
  if (event.key === 'Escape') {
    popups.forEach((popupElement) => {
      closePopup(popupElement);
    })    
  }
}

const setButtonProfile = () => {
  const buttonElement =  popupProfile.querySelector('.button_type_save');
  const inputList =  Array.from(popupProfile.querySelectorAll('.popup__form-text'));
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function() {
      if (hasInvalidInput(inputList)) {
        buttonElement.classList.add('button_type_invalid');
      } else {
        buttonElement.classList.remove('button_type_invalid');
      }
    });
  });
}

setButtonProfile();



initialCards.forEach((card) => {
  const cardElement = createCard(card);
  elementsList.append(cardElement);
});

editButtonProfile.addEventListener('click', () => {
  openPopup(popupProfile);
  addProfileData();
});
addButtonPlace.addEventListener('click', () => openPopup(popupPlace));


popups.forEach((popupElement) => {
  overlayClose.forEach((overlayElement) => {
    overlayElement.addEventListener('click', () => closePopup(popupElement));
  });
  closeButton.forEach((overlayElement) => {
    overlayElement.addEventListener('click', () => closePopup(popupElement));
  })  
})

formElementPlace.addEventListener('submit', handleFormCardSubmit);
formElementProfile.addEventListener('submit', handlerFormProfileSubmit);
document.addEventListener('keydown', handleEscUp);

