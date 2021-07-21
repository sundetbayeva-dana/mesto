import Popup from './Popup.js'
import { placeFormElement, itemNameFormElement, itemPicFormElement} from '../utils/constants.js'; 
  

class PopupWithForm extends Popup {
    constructor({ handleFormCardSubmit}, popupSelector ) {
        super(popupSelector);
        this._handleFormCardSubmit = handleFormCardSubmit;
        this.handleSubmitValues = this.handleSubmitValues.bind(this)
    }

    _getInputValues() {
        const name = itemNameFormElement.value; 
        const imageSrc = itemPicFormElement.value; 
        const data = {name:name, link:imageSrc};
        return data;
    }

    handleSubmitValues = (evt) => {
        evt.preventDefault();
        this._handleFormCardSubmit(this._getInputValues());
    }

    setEventListeners() {
        super.setEventListeners();        
        placeFormElement.addEventListener('submit', this.handleSubmitValues)
    }   

    removeEventListeners() {
        placeFormElement.removeEventListener('submit', this.handleSubmitValues)
    }

    close() {
        super.close();
        placeFormElement.reset();
        this.removeEventListeners();
    }
}

export default PopupWithForm