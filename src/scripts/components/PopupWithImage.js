import Popup from './Popup.js'
import {picture, pictureName} from '../utils/constants.js'

class PopupWithImage extends Popup {

    constructor(popupSelector) {
        super(popupSelector);
    }    

    open(item) {  
        super.open();
        picture.src = item.link;
        picture.alt = item.name;
        pictureName.textContent = item.name;
    }
}

export default PopupWithImage;
