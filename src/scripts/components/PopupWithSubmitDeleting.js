import Popup from './Popup.js' 

class PopupWithSubmitDeleting extends Popup {
    constructor(popupSelector, {deleteCard} ) {
        super(popupSelector);
        this.deleteCard = deleteCard;
    }

    setEventListeners() {
        super.setEventListeners();
        this._popupSelector.querySelector('.button_type_submit').addEventListener('click', this.handleDeleteCard);        
    }

    handleDeleteCard = () => {
        this.deleteCard()
    }

    removeEventListeners() {
        this._popupSelector.querySelector('.button_type_submit').removeEventListener('click', this.handleDeleteCard)
    }

    qwedeleteCard(data) {  
        data.remove();
        data = null;
        this.removeEventListeners();
    }
}

export default PopupWithSubmitDeleting