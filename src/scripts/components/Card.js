class Card {
  constructor({item, cardSelector, handleCardClick, handleLikeClick, handleDeleteCard}) {  
    this._name = item.name; 
    this._link = item.link;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._likeCount = item.likes;
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
  

  getLike(data, res) {
    this._isLiker = data.likes.filter((item) => {
      return item._id == res._id
    })
    .length > 0;
    if (this._isLiker) {
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

  showTrashIcon(data, res) {
    if ((data.owner == res._id) || (data.name == res.name)) {
      console.log(data)
      console.log(res)
      console.log('aaa')
      this._element.querySelector('.button_type_delete').classList.add('popup_opened')
    } 
  }

  _setEventListeners() {
    this._element.querySelector('.card__pic').addEventListener('click', () => {
      this._handleCardClick(); 
    })

    this._element.querySelector('.button_type_delete').addEventListener('click', () => {
      this._handleDeleteCard();
      //document.querySelector('.popup-confirm-delete').classList.add('popup_opened');
    })    

    this._element.querySelector('.button_type_like').addEventListener('click', () => {
      if (this._element.querySelector('.button_type_like').classList.contains('button_type_like-active')) {
        this._handleLikeClick(true)
      } else {
        this._handleLikeClick(false)
      }  
    })
  }

  _handleDeleteCardClick = () => {
    this._element.remove();
    this._element = null;
  }

  showLikeCount = () => {    
    this._element.querySelector('.card__like-count').textContent = this._likeCount.length
  }

  showLikeCountFromServer = (res) => {
    this._element.querySelector('.card__like-count').textContent = res.likes.length
  }

  _handleLikeCardClick = () => {
    this._element.querySelector('.button_type_like').classList.toggle('button_type_like-active')
  }
}

export default Card