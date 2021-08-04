import { popupProfileSelector, nameInput, activityInput, config, profileName, profileActivity, avatarPicture } from '../utils/constants.js'
class UserInfo {
    constructor ({data}) {

        this._profileNameSelector = data.name;
        this._profileActivitySelector = data.about;
        this._profilePictureSelector = data.avatar;  
        this._profileId = data._id;

    }

    getUserInfo = () => {
        nameInput.value = this._profileNameSelector;
        activityInput.value = this._profileActivitySelector;        
    }

    getUserInfoFromServer = () => {
        
        profileName.textContent = this._profileNameSelector;
        profileActivity.textContent = this._profileActivitySelector

    }

    getUserAvatarFromServer = () => {
        avatarPicture.src = this._profilePictureSelector;

    }

    setAvatar = (item) => { 
        avatarPicture.src = item.link; 
    }


    setUserInfo = () => {
        this._profileNameSelector = nameInput.value; 
        this._profileActivitySelector = activityInput.value;
    }

    ableSubmitButtonOpeningPopupProfile = () => {
        const submitButtonPopupProfile = popupProfileSelector.querySelector(config.submitButtonSelector);
        submitButtonPopupProfile.classList.remove(config.inactiveButtonClass); 
        submitButtonPopupProfile.removeAttribute('disabled');
    }
}
export default UserInfo