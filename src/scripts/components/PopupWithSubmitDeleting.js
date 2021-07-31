import Popup from './Popup.js'
import { config} from '../utils/constants.js';  

class PopupWithSubmitDeleting extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
    }

    setEventListeners() {
        super.setEventListeners();
        this.popupSelector.querySelector(config.formSelector).addEventListener('submit', (evt) => {
            evt.preventDefault();
        })
    }
}

export default {PopupWithSubmitDeleting}