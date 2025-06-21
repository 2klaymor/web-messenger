import {useContext} from "react";
import {translations, LanguageContext} from "../../../app/contexts/languageContext";
import {ThemeContext} from "../../../app/contexts/themeContext";
import Button from "../../../shared/ui/Button";

export default function AppearanceSection() {
    const {language, changeLanguage} = useContext(LanguageContext);
    const t = translations[language];
    const {theme, handleThemeChange} = useContext(ThemeContext);


    return (
        <div className="appearance settings__content form">
            <h1>{t.settings.appearance}</h1>
            <p>{t.settings.language}</p>
            <div className="appearance__language-options">
                <Button onClick={() => changeLanguage("ru")}>русский</Button>
                <Button onClick={() => changeLanguage("en")}>english</Button>
            </div>

            <p>{t.settings.theme}</p>
            <Button userClassName="appearance__change-theme"
                    onClick={() => handleThemeChange()}>{t.settings.change_theme}</Button>
        </div>
    )
}