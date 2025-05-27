import {images} from "../../app/providers/themeContext";
import {useContext} from "react";

const ToggleVisibility = ({state, setState}) => {

    const togglePasswordVisibility = () => {
        setState(prevState => !prevState); // Переключаем состояние отображения пароля
    };

    return <img className="toggle-visibility-eye" src={state ? images.static.show: images.static.hide}
         alt="show/hide password"
         onClick={togglePasswordVisibility}/>
}

export default ToggleVisibility;