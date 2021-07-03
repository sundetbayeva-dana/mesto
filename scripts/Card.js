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

const popupCard = document.querySelector('.popup-card');
const pic = popupCard.querySelector('.popup-card__pic');
const pictureName = popupCard.querySelector('.popup-card__picname');

import { handleEscUp } from './index.js'

class Card {    
  constructor(data, cardSelector) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
  }

  _getTemplate() {    
    const cardElement = document.querySelector(this._cardSelector).content.querySelector('.card').cloneNode(true);
    return cardElement;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._element.querySelector('.card__name').textContent = this._name;
    this._element.querySelector('.card__pic').src = this._link; 
    this._setEventListeners();
    return this._element;
  }

  _setEventListeners() {
    this._element.querySelector('.card__pic').addEventListener('click', () => {
      this._handleOpenPopupCard();
      document.addEventListener('keydown', handleEscUp);
    })

    this._element.querySelector('.button_type_delete').addEventListener('click', () => {
      this._handleDeleteCardClick();
    })

    this._element.querySelector('.button_type_like').addEventListener('click', () => {
      this._handleLikeCardClick();
    })
  }

  _handleOpenPopupCard() {    
    pic.src = this._link;
    popupCard.classList.add('popup_opened');
    pic.alt = this._name;
    pictureName.textContent = this._name;
  }
  
  _handleDeleteCardClick = () => {
    this._element.remove();
  }

  _handleLikeCardClick = () => {
    this._element.querySelector('.button_type_like').classList.toggle('button_type_like-active')
  }
}
export { Card, initialCards }
