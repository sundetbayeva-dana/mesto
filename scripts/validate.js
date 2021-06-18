const popups = Array.from(document.querySelectorAll('.popup'));
const overlayClose = Array.from(document.querySelectorAll('.popup__overlay'));
const closeButton = Array.from(document.querySelectorAll('.button_type_close'));



const showError = (formElement, inputElement, errorMessage) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add('popup__form-text-error');
    errorElement.textContent = errorMessage;
    errorElement.classList.add('popup__form-text-error_active');
}
  
const hideError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove('popup__form-text-error');
  errorElement.classList.remove('popup__form-text-error_active');
  errorElement.textContent = ''
};
  
const checkInputValidity = (formElement, inputElement) => {

  if (!inputElement.validity.valid) {
    showError(formElement, inputElement, inputElement.validationMessage);

    console.log(inputElement.validity)
    } else {    
    hideError(formElement, inputElement) 
  };
  
};
  
  
const setEventListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll('.popup__form-text'));
  const buttonElement =  formElement.querySelector('.button_type_save');
  toggleButtonState(inputList, buttonElement)
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function() {
      checkInputValidity(formElement, inputElement);
      toggleButtonState(inputList, buttonElement)
    })
  })

}



function enableValidation() {
  let formList = Array.from(document.querySelectorAll('.popup__form-place'));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (event) => {
      event.preventDefault();
    });
    setEventListeners(formElement);
  })
  }
  enableValidation();

  function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
}

function toggleButtonState(inputList, buttonElement) {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add('button_type_invalid');
    buttonElement.setAttribute('disabled', 'disabled')
  }
  else {
    buttonElement.classList.remove('button_type_invalid');
    buttonElement.removeAttribute('disabled');
  }
}



const setButtonProfile = () => {
  const popupProfile = document.querySelector('.popup-profile');
  const buttonElement =  popupProfile.querySelector('.button_type_save');
  const inputList =  Array.from(popupProfile.querySelectorAll('.popup__form-text'));
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function() {
      if (hasInvalidInput(inputList)) {
        buttonElement.classList.add('button_type_invalid');
      } else {
        buttonElement.classList.remove('button_type_invalid');
      }
    });
  });
}
  
setButtonProfile();
