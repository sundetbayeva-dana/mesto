class FormValidator { 
  constructor(config, formElement) { 
    this._formSelector = config.formSelector; 
    this._inputSelector = config.inputSelector; 
    this._submitButtonSelector = config.submitButtonSelector; 
    this._inactiveButtonClass = config.inactiveButtonClass; 
    this._inputErrorClass = config.inputErrorClass; 
    this._errorClass = config.errorClass; 
    this._formElement = formElement; 
  } 
 
  _showError = (inputElement, errorMessage) => { 
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`); 
    inputElement.classList.add(this._inputErrorClass); 
    errorElement.textContent = errorMessage; 
    errorElement.classList.add(this._errorClass); 
  } 
   
  _hideError = (inputElement) => { 
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`); 
    inputElement.classList.remove(this._inputErrorClass); 
    errorElement.classList.remove(this._errorClass); 
    errorElement.textContent = '' 
  }; 
 
  _checkInputValidity = (inputElement) => { 
    if (!inputElement.validity.valid) { 
      this._showError(inputElement, inputElement.validationMessage); 
    } else {     
      this._hideError(inputElement)  
    };   
  }; 
 
  _setEventListeners = () => { 
    const inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector)); 
    const buttonElement =  this._formElement.querySelector(this._submitButtonSelector);
    this._toggleButtonState(inputList, buttonElement)
    inputList.forEach((inputElement) => { 
      inputElement.addEventListener('input', () => {        
        this._checkInputValidity(inputElement); 
        this._toggleButtonState(inputList, buttonElement);
      }) 
    }) 
  } 
 
  _toggleButtonState(inputList, buttonElement) { 
    if (this._hasInvalidInput(inputList)) { 
      buttonElement.classList.add(this._inactiveButtonClass);
      buttonElement.setAttribute('disabled', true); 
    } else { 
      buttonElement.classList.remove(this._inactiveButtonClass);
      buttonElement.removeAttribute('disabled'); 
    } 
  } 
 
  enableValidation() { 
    this._formElement.addEventListener('submit', (event) => { 
      event.preventDefault(); 
    }); 
    this._setEventListeners();    
  } 
 
  _hasInvalidInput(inputList) { 
    return inputList.some((inputElement) => { 
      return !inputElement.validity.valid; 
    }); 
  }

  disableSubmitButton = () => {
    this._setEventListeners();
  }
} 
 
export default FormValidator 
