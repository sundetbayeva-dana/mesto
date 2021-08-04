import Popup from './Popup.js'
import { config} from '../utils/constants.js';  

class PopupWithSubmitDeleting extends Popup {
    constructor(popupSelector, {deleteCard} ) {
        super(popupSelector);
        this.deleteCard = deleteCard;
    }

    setEventListeners(popupSelector) {
        super.setEventListeners();
        this._popupSelector.querySelector('.button_type_save').addEventListener('click', (evt) => {
            //this.open(popupSelector);
            console.log('submit')
            this.deleteCard(evt)
        })
    }

    deleteCard() {
       

    }

}

export default PopupWithSubmitDeleting