//переменные использующиеся в попапе пользователя
const popupProfile = document.querySelector('.popup-profile'); //попап пользователя
const editButtonProfile = document.querySelector('.button_type_edit'); //кнопка открытия попапа пользователя
const closeButtonProfile = popupProfile.querySelector('.button_type_close'); //кнопка закрытия попапа пользователя
const formElementProfile = document.querySelector('.popup__form') //форма попапа пользователя
let profileName = document.querySelector('.profile__info-name'); //имя пользователя
let profileActivity = document.querySelector('.profile__info-activity'); //деятельности пользователя
let nameInput = document.querySelector('.popup__form-text_type_name'); //имя пользователя в инпуте 
let activityInput = document.querySelector('.popup__form-text_type_activity'); //деятельность пользователя в инпуте
//переменные использующиеся  в попапе места
const popupPlace = document.querySelector('.popup-place'); //попап места
const addButtonPlace = document.querySelector('.button_type_add'); //кнопка открытия попапа места
const closeButtonPlace = popupPlace.querySelector('.button_type_close'); //кнопка закрытия попапа места
//переменные для добавления карточек
const formElementPlace = popupPlace.querySelector('.popup__form-place');
let formElementItemName = formElementPlace.querySelector('.popup__form-text_type_name-pic');
let formElementItemPic = formElementPlace.querySelector('.popup__form-text_type_link');

//переменные для загрузки существующих карточек 
const elementsList = document.querySelector('.elements__list');
let cardTemplate = document.querySelector('.elements__list-template').content;
const popupCard = document.querySelector('.popup-card');


const closeButtonCard = popupCard.querySelector('.button_type_close-pic');
let picName = popupCard.querySelector('.popup-card__picname');


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

editButtonProfile.addEventListener('click', () => {
  openPopup(popupProfile);
  addProfileData();
});
addButtonPlace.addEventListener('click', () => openPopup(popupPlace));
closeButtonProfile.addEventListener('click', () => closePopup(popupProfile));
closeButtonPlace.addEventListener('click', () => closePopup(popupPlace));
closeButtonCard.addEventListener('click', () => closePopup(popupCard));

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
  picName.textContent = cardData.name;
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

initialCards.forEach((card) => {
  const cardElement = createCard(card);
  elementsList.append(cardElement);
});


function handleFormCardSubmit(event) {
  event.preventDefault();
  let name = formElementItemName.value;
  let imageSrc = formElementItemPic.value;
  const cardElement = createCard({name: name,link: imageSrc});
  elementsList.prepend(cardElement);  

  closePopup(popupPlace);
  formElementItemName.value = '';
  formElementItemPic.value = '';
};
formElementPlace.addEventListener('submit', handleFormCardSubmit);

function handlerFormProfileSubmit(event) {
  event.preventDefault();
  profileName.textContent = nameInput.value;
  profileActivity.textContent = activityInput.value;
  closePopup(popupProfile);
}

formElementProfile.addEventListener('submit', handlerFormProfileSubmit);





