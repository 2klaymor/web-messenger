import {useContext} from "react";
import {Link} from "react-router-dom";
import {images, ThemeContext} from "../../../app/contexts/themeContext";
import {LanguageContext, translations} from "../../../app/contexts/languageContext";
import SignInForm from "../../../features/sign-in/ui/SignInForm";

export default function SignInPage() {
    const {language} = useContext(LanguageContext);
    const t = translations[language];
    const {theme} = useContext(ThemeContext);

    return (
        <div className="signin">

            {/* top */}
            <img className="signin__logo" src={images[theme].logo_blur} alt="logo"/>
            <h1>{t.sign_in.title}</h1>

            {/* form */}
            <SignInForm/>

            <div className="form__auth-link">
                <p className="">{t.sign_in.new_user_prompt}&nbsp;</p>
                <Link to="/signup">{t.buttons.sign_up}</Link>
            </div>

        </div>
    )
}