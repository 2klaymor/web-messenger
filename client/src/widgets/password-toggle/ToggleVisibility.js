import {images} from "../../app/providers/themeContext";

const ToggleVisibility = ({state, setState}) => {

    const togglePasswordVisibility = () => {
        setState(prevState => !prevState);
    };

    return <img className="toggle-visibility-eye" src={state ? images.static.show: images.static.hide}
         alt="show/hide password"
         onClick={togglePasswordVisibility}/>
}

export default ToggleVisibility;