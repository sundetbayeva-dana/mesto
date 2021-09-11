import Popup from './Popup.js' 

class PopupWithSubmitDeleting extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
    }

    setSubmitAction(callback) {
        this.callbackSubmitAction = callback;
    }

    setEventListeners() {
        super.setEventListeners();        
        this._popupSelector.querySelector('.button_type_submit').addEventListener('click', () => this.callbackSubmitAction());
    }
}

export default PopupWithSubmitDeleting