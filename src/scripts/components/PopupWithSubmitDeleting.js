import Popup from './Popup.js'
import { config} from '../utils/constants.js';  

class PopupWithSubmitDeleting extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
    }

    setEventListeners(popupSelector) {
        super.setEventListeners();
        this._popupSelector.querySelector('.submitButtonSelector').addEventListener('submit', () => {
            this.open(popupSelector);
        })
    }

    method() {
        
    }
}

export default {PopupWithSubmitDeleting}