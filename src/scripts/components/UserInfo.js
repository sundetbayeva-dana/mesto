import { popupProfileSelector, nameInput, activityInput, config } from '../utils/constants.js'
class UserInfo {
    constructor ({data}) {
        this._profileNameSelector = data.name;
        this._profileActivitySelector = data.activity
    }

    getUserInfo = () => {
        nameInput.value = this._profileNameSelector.textContent;
        activityInput.value = this._profileActivitySelector.textContent;
    }

    setUserInfo = () => {
        this._profileNameSelector.textContent = nameInput.value;        
        this._profileActivitySelector.textContent = activityInput.value;
    }

    ableSubmitButtonOpeningPopupProfile = () => {
        const submitButtonPopupProfile = popupProfileSelector.querySelector(config.submitButtonSelector);
        submitButtonPopupProfile.classList.remove(config.inactiveButtonClass); 
        submitButtonPopupProfile.removeAttribute('disabled');
    }
}
export default UserInfo