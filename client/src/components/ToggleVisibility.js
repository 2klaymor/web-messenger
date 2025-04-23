import {images} from "../utils/theme";
import {useContext} from "react";

const ToggleVisibility = ({state, image_key1, image_key2, setState}) => {

    const togglePasswordVisibility = () => {
        setState(prevState => !prevState); // Переключаем состояние отображения пароля
    };

    return <img className="visibility-switch" src={state ? images.static[image_key1]: images.static[image_key2]}
         alt="show/hide"
         onClick={togglePasswordVisibility}/>
}

export default ToggleVisibility;