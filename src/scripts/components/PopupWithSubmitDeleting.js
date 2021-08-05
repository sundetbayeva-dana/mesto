import Popup from './Popup.js'
import { config} from '../utils/constants.js';  

class PopupWithSubmitDeleting extends Popup {
    constructor(popupSelector, {deleteCard} ) {
        super(popupSelector);
        this.deleteCard = deleteCard;
    }

    setEventListeners() {
        super.setEventListeners();
        /*this._popupSelector.querySelector('.button_type_save').addEventListener('click', () => {
            this.deleteCard()
        })*/
        this._popupSelector.querySelector('.button_type_save').addEventListener('click', this.handleDeleteCard)

        
    }

    handleDeleteCard = () => {
        this.deleteCard()
    }

    removeEventListeners() {
        /*this._popupSelector.querySelector('.button_type_save').removeEventListener('click', () => {
            this.deleteCard()
        })*/
        this._popupSelector.querySelector('.button_type_save').removeEventListener('click', this.handleDeleteCard)

    }

    qwedeleteCard(data) {
        console.log(data)
        data.remove();
        data = null;
        this.removeEventListeners();
    }


}

export default PopupWithSubmitDeleting