import { handleEscUp } from './index.js'
const popupShowPicture = document.querySelector('.popup-card');
const picture = popupShowPicture.querySelector('.popup-card__pic');
const pictureName = popupShowPicture.querySelector('.popup-card__picname');

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
    const cardElementName = this._element.querySelector('.card__name');
    const cardElementLink = this._element.querySelector('.card__pic');
    cardElementName.textContent = this._name;
    cardElementLink.src = this._link;    
    cardElementLink.alt = this._name;
    this._setEventListeners();
    return this._element;
  }

  _setEventListeners() {
    this._element.querySelector('.card__pic').addEventListener('click', () => {
      this._handleOpenpopupShowPicture();
      document.addEventListener('keydown', handleEscUp);
    })

    this._element.querySelector('.button_type_delete').addEventListener('click', () => {
      this._handleDeleteCardClick();
    })

    this._element.querySelector('.button_type_like').addEventListener('click', () => {
      this._handleLikeCardClick();
    })
  }

  _handleOpenpopupShowPicture() {    
    picture.src = this._link;
    popupShowPicture.classList.add('popup_opened');
    picture.alt = this._name;
    pictureName.textContent = this._name;
  }
  
  _handleDeleteCardClick = () => {
    this._element.remove();
    this._element = null;
  }

  _handleLikeCardClick = () => {
    this._element.querySelector('.button_type_like').classList.toggle('button_type_like-active')
  }
}

export default Card