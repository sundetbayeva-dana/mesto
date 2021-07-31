class Card {
  constructor({item, cardSelector, handleCardClick}) {  
    this._name = item.name; 
    this._link = item.link;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
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
      this._handleCardClick();
    })

    this._element.querySelector('.button_type_delete').addEventListener('click', () => {
      this._handleDeleteCardClick();
    })

    this._element.querySelector('.button_type_like').addEventListener('click', () => {
      this._handleLikeCardClick();
    })
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