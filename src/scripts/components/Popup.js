class Popup {
    constructor(popupSelector) {
        this._popupSelector = popupSelector;
    }

    open() {
        this._popupSelector.classList.add('element_visible');
        document.addEventListener('keydown', this._handleEscClose); 
    }

    close() {
        this._popupSelector.classList.remove('element_visible'); 
        document.removeEventListener('keydown', this._handleEscClose);
    }

    _handleEscClose = (event) => {
        if (event.key === 'Escape') {
            if (this._popupSelector.classList.contains('element_visible')) {
                this.close();
            }
        }
    }

    setEventListeners() {
        this._popupSelector.querySelector('.popup__overlay').addEventListener('click', () => {
            this.close();
        })
        this._popupSelector.querySelector('.button_type_close').addEventListener('click', () => {
            this.close();
        })
    }
}

export default Popup;