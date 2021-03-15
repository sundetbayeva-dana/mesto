const popup = document.querySelector('.popup');
const editButton = document.querySelector('.edit-button');
const closeButton = document.querySelector('.popup__button-close');
const popupOverlay = document.querySelector('.popup__overlay');

let nameInput = document.querySelector('popup__name');
let profileName = document.querySelector('.profile__info-name');
let activityInput = document.querySelector('popup__activity');
let profileActivity = document.querySelector('.profile__info-activity');

editButton.addEventListener('click', function() {
    openPopup();
});
closeButton.addEventListener('click', function() {
    closePopup();  
});

function openPopup() {
    popup.classList.add('popup_visible');
    profileName.textContent = nameInput.value;
    profileActivity.value = activityInput.textContent;
}

function closePopup() {
    popup.classList.remove('popup_visible')
}

popupOverlay.addEventListener('click', function() {
    closePopup();
});

let formElement = document.querySelector('.input');

//let nameInput = document.querySelector('popup__name');

function formSubmitHandler (evt) {
    evt.preventDefault();   

    nameInput.value='';
    activityInput.value=''; 

           
    nameInput.value = profileName.textContent;
    
    profileActivity.textContent = activityInput.value;

    closePopup();
}

formElement.addEventListener('submit', formSubmitHandler); 

