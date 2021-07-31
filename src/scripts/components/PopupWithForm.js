import Popup from './Popup.js'
import { placeFormElement, config} from '../utils/constants.js';  

class PopupWithForm extends Popup {
    constructor({ handleFormSubmit}, popupSelector ) {
        super(popupSelector);
        this.popupSelector = popupSelector;
        this._handleFormSubmit = handleFormSubmit;
    }

    _getInputValues() {
        this._inputList = this.popupSelector.querySelectorAll('.popup__form-text');
        this._formValues = {};
        this._inputList.forEach(input => this._formValues[input.name] = input.value);
        return this._formValues;  
    }

    setEventListeners() {
        super.setEventListeners();        
        this.popupSelector.querySelector(config.formSelector).addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._handleFormSubmit(this._getInputValues());
        })
    }

    close() {
        super.close();
        placeFormElement.reset();
    }
}

export default PopupWithForm