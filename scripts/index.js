//переменные использующиеся в попапе пользователя
const popupProfile = document.querySelector('.popup-profile'); //попап пользователя
const editButtonProfile = document.querySelector('.button_type_edit'); //кнопка открытия попапа пользователя
const closeButtonProfile = popupProfile.querySelector('.button_type_close'); //кнопка закрытия попапа пользователя
const formElementProfile = document.querySelector('.popup__form') //форма попапа пользователя
const profileName = document.querySelector('.profile__info-name'); //имя пользователя
const profileActivity = document.querySelector('.profile__info-activity'); //деятельности пользователя
const nameInput = document.querySelector('.popup__form-text_type_name'); //имя пользователя в инпуте 
const activityInput = document.querySelector('.popup__form-text_type_activity'); //деятельность пользователя в инпуте
//переменные использующиеся  в попапе места
const popupPlace = document.querySelector('.popup-place'); //попап места
const addButtonPlace = document.querySelector('.button_type_add'); //кнопка открытия попапа места
const closeButtonPlace = popupPlace.querySelector('.button_type_close'); //кнопка закрытия попапа места
//переменные для добавления карточек
const formElementPlace = popupPlace.querySelector('.popup__form-place');
const formElementItemName = formElementPlace.querySelector('.popup__form-text_type_name-pic');
const formElementItemPic = formElementPlace.querySelector('.popup__form-text_type_link');

//переменные для загрузки существующих карточек 
const elementsList = document.querySelector('.elements__list');
const cardTemplate = document.querySelector('.elements__list-template').content;
const popupCard = document.querySelector('.popup-card');

const closeButtonCard = popupCard.querySelector('.button_type_close-pic');
const pictureName = popupCard.querySelector('.popup-card__picname');





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


////////////////////////////

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
  const inputList =  Array.from(formElement.querySelectorAll('.popup__form-text'));
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
////////////////////////////


/*
function enableValidation(config) {
  const form = document.querySelector(config.form);

  form.addEventListener('submit', handleFormSubmit);
  form.addEventListener('input', (event) => handleFormInput(event, config));
}

function handleFormSubmit(event) {
  event.preventDefault();
  const form = event.currentTarget;
  const isValid = form.checkValidity();

  if (isValid) {
    alert ('Форма валидна');
    form.reset();
  }
  else {
    alert('Форма невалидна')
  }
}
function handleFormInput(event, config) {
  const input = event.target;
  const form = event.currentTarget;

  setCustomError(input, config);  
  setSubmitButtonState(form, config);
}

function setCustomError(input, config) {
  const validity = input.validity;

  input.setCustomValidity('');

  if (validity.tooShort || validity.tooLong) {
    const currentLength = input.value.length;
    const min = input.getAttribute('minlength');
    const max = input.getAttribute('maxlength');  
    input.setCustomValidity(
      `Строка имеет неверную длину. Введено ${currentLength}, а должно быть от ${min} до ${max}`
    );
  }

  if (validity.typeMismatch) {
    input.setCustomValidity(config.mismatchErrorMessage);
  }

}

function setFieldError(input) {
  const span = document.querySelector(`.${name-place.id}-error`);
  span.textContent = input.validationMessage;
}

function setSubmitButtonState(form, config) {
  const button = form.querySelector(config.submitButton);
  const isValid = form.checkValidity();

  if (isValid) {
    button.classList.add(config.popupIsValid);
    button.classList.remove(config.popupIsInvalid);
    button.removeAttribute('disabled');
  } else {
    button.classList.remove(config.popupIsValid);
    button.classList.add(config.popupIsInvalid);
    button.setAttribute('disabled', 'disabled')
  }
}

const configs = [
  {
    form: '.popup__form-place[name="place"]',
    submitButton: '.button_type_save[name="place"]',
    mismatchErrorMessage: 'Вы пропустили это поле',
    popupIsValid: 'popup__button_valid',
    popupIsInvalid: 'button_type_invalid'
  
  }
];
configs.forEach(config => enableValidation(config));
*/


////////////////
initialCards.forEach((card) => {
  const cardElement = createCard(card);
  elementsList.append(cardElement);
});

editButtonProfile.addEventListener('click', () => {
  openPopup(popupProfile);
  addProfileData();
});
addButtonPlace.addEventListener('click', () => openPopup(popupPlace));
closeButtonProfile.addEventListener('click', () => closePopup(popupProfile));
closeButtonPlace.addEventListener('click', () => closePopup(popupPlace));
closeButtonCard.addEventListener('click', () => closePopup(popupCard));

formElementPlace.addEventListener('submit', handleFormCardSubmit);

formElementProfile.addEventListener('submit', handlerFormProfileSubmit);


const setButtonProfile = () => {
  const buttonElement =  popupProfile.querySelector('.button_type_save');
  const inputList =  Array.from(popupProfile.querySelectorAll('.popup__form-text'));
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function() {
      toggleButtonState(inputList, buttonElement)
    });
  });
}

setButtonProfile();

