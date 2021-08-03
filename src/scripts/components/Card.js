class Card {
  constructor({item, cardSelector, handleCardClick, handleLikeClick, handleDislikeClick}) {  
    this._name = item.name; 
    this._link = item.link;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._likeCount = item.likes;
    this._handleLikeClick = handleLikeClick;
    this._handleDislikeClick = handleDislikeClick;

    this._currentId = item.likes.filter((item) => {
      return item = item._id
    })
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

  /*isLiked = () => {
    if (this._element.querySelector('.button_type_like').classList.contains('button_type_like-active')) {
      console.log('есть лайк')
      this._element.querySelector('.button_type_like').classList.remove('button_type_like-active');      
    } else {
      console.log('нет лайка')
      this._element.querySelector('.button_type_like').classList.add('button_type_like-active')
    }
  }*/
  

  getLike(data, res) {
    this._isLiker = data.likes.filter((item) => {
      //item - инфа кто ставил лайки
      return item._id == res._id
    })
    .length > 0;

    //this._element.querySelector('.card__like-count').textContent = data.likes.length;
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

  _setEventListeners() {
    this._element.querySelector('.card__pic').addEventListener('click', () => {
      this._handleCardClick();
 
    })

    this._element.querySelector('.button_type_delete').addEventListener('click', () => {
      document.querySelector('.popup-confirm-delete').classList.add('popup_opened');
      //this._handleDeleteCardClick();
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
 console.log(res)
    this._element.querySelector('.card__like-count').textContent = res.likes.length

  }



  _handleLikeCardClick = () => {
    this._element.querySelector('.button_type_like').classList.toggle('button_type_like-active')
  }
}

export default Card