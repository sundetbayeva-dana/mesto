class Card {
  constructor({item, cardSelector, handleCardClick, handleLikeClick, handleDeleteCard}) {  
    this._name = item.name; 
    this._link = item.link;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._handleLikeClick = handleLikeClick;
    this._handleDeleteCard = handleDeleteCard;
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

  getLike(resDataOwner, resp) {
    this._isLiked = resp.likes.filter((item) => {
      return item._id == resDataOwner._id      
    })
    .length > 0;
    if (this._isLiked) {
      this._element.querySelector('.button_type_like').classList.add('button_type_like-active');
    } else {
      this._element.querySelector('.button_type_like').classList.remove('button_type_like-active');
    }    
  }

  removeLike() {
    this._element.querySelector('.button_type_like').classList.remove('button_type_like-active');
  }

  activeLike() {
    this._element.querySelector('.button_type_like').classList.add('button_type_like-active');    
  }

  showTrashIcon(resDataOwner, resp) {
    if ((resDataOwner._id == resp.owner) || (resDataOwner._id == resp.owner._id))  {
      this._element.querySelector('.button_type_delete').classList.add('element_visible')
    } 
  }

  _setEventListeners() {
    this._element.querySelector('.card__pic').addEventListener('click', () => {
      this._handleCardClick(); 
    })

    this._element.querySelector('.button_type_delete').addEventListener('click', () => {
      this._handleDeleteCard();
    })    

    this._element.querySelector('.button_type_like').addEventListener('click', () => {
      if (this._element.querySelector('.button_type_like').classList.contains('button_type_like-active')) {
        this._handleLikeClick(true)
      } else {
        this._handleLikeClick(false)
      }  
    })
  }

  showLikeCountFromServer = (res) => {
    this._element.querySelector('.card__like-count').textContent = res.likes.length
  }
}

export default Card