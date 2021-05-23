//переменные использующиеся в попапе пользователя
let popupProfile = document.querySelector('.popup__profile'); //переменная попапа пользователя
let editButtonProfile = document.querySelector('.button_type_edit'); //переменная открытия попапа пользователя
let closeButtonProfile = popupProfile.querySelector('.button_type_close'); //переменная закрытия попапа пользователя
let formElementProfile = document.querySelector('.popup__form') //переменная формы попапа пользователя
let profileName = document.querySelector('.profile__info-name'); //переменная имени пользователя
let profileActivity = document.querySelector('.profile__info-activity'); //переменная деятельности пользователя
let nameInput = document.querySelector('.popup__form-text_type_name'); //переменная имени пользователя в попапе 
let activityInput = document.querySelector('.popup__form-text_type_activity'); //переменная деятельности пользователя в попапе
//переменные использующиеся  в попапе места
let popupPlace = document.querySelector('.popup__place'); //переменная попапа места
let addButtonPlace = document.querySelector('.button_type_add') //переменная открытия попапа места
let closeButtonPlace = popupPlace.querySelector('.button_type_close') //переменная закрытия попапа места
//переменные для добавления карточек
let formElementPlace = popupPlace.querySelector('.popup__form-place');
let formElementItemName = formElementPlace.querySelector('.popup__form-text_type_name-pic');
let formElementItemPic = formElementPlace.querySelector('.popup__form-text_type_link');

//переменные для загрузки существующих карточек 
const elementsList = document.querySelector('.elements__list');
const cardTemplate = document.querySelector('.elements__list-template').content;
const popupCard = document.querySelector('.popup__card');

//
const closeButtonCard = popupCard.querySelector('.button_type_close-pic');


function openPopup(modal) {
  modal.classList.add('popup_opened');      
    nameInput.value = profileName.textContent;
    activityInput.value = profileActivity.textContent;
}

function closePopup(modal) {
  modal.classList.remove('popup_opened');
}

editButtonProfile.addEventListener('click', () => openPopup(popupProfile));
addButtonPlace.addEventListener('click', () => openPopup(popupPlace));
closeButtonProfile.addEventListener('click', () => closePopup(popupProfile));
closeButtonPlace.addEventListener('click', () => closePopup(popupPlace));
closeButtonCard.addEventListener('click', () => closePopup(popupCard));

function onCardLike(event) {
  event.target.classList.toggle('button_type_like-active');
}



function deleteCard(event) {
  event.target.closest(".card").remove();
}
function createCard(cardData) {
  const card = cardTemplate.cloneNode(true);
  const titleElement = card.querySelector('.card__name');
  const imageElement = card.querySelector('.card__pic');
  const likeIconElement = card.querySelector('.button_type_like');
  const removeIconElement = card.querySelector('.button_type_delete');

  titleElement.textContent = cardData.name;
  imageElement.src = cardData.link;
  likeIconElement.addEventListener('click', onCardLike);
  imageElement.addEventListener('click', onCardImagePopup);
  removeIconElement.addEventListener('click', deleteCard);


  return card;

}


const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

initialCards.forEach((card) => {
  const cardElement = createCard(card);
  elementsList.append(cardElement);
});


function onFormSubmit(event) {
  event.preventDefault();
  const name = formElementItemName.value;
  const imageSrc = formElementItemPic.value;

  const cardData = {
    name: name,
    link: imageSrc,
  };

  const cardElement = createCard(cardData);
  elementsList.prepend(cardElement);  

  closePopup(popupPlace);
};
formElementPlace.addEventListener('submit', onFormSubmit);

function formSubmitHandlerProfile (event) {
  event.preventDefault();
  profileName.textContent = nameInput.value;
  profileActivity.textContent = activityInput.value;
  closePopup(popupProfile);
}

formElementProfile.addEventListener('submit', formSubmitHandlerProfile);
let picName = popupCard.querySelector('.popup__card-picname');

function onCardImagePopup(event) {
  let pic = popupCard.querySelector('.popup__card-pic');
  pic.src = event.target.src;
  openPopup(popupCard);
  //console.log(event.target)
  const parent = event.target.parentNode;
  const titleElement = parent.querySelector('.card__text');
  const title = titleElement.textContent;
  picName.textContent = title;
  pic.alt = title;

  
}
