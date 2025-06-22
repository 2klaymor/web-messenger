import React, {useContext} from "react";
import {LanguageContext} from "../../app/contexts/languageContext";

export default function SwitchLanguage() {
    const {language, changeLanguage} = useContext(LanguageContext);

    return (
        <div className="switch-language">


            <div className="switch-language__options">
                <div className={`switch-language__slider ${language}`}/>
                <button
                    className={`switch-language__option 
                    ${language === "en" ? "switch-language__option_active" : ""}`}
                    onClick={() => changeLanguage("en")}
                >
                    EN
                </button>

                <button
                    className={`switch-language__option 
                    ${language === "ru" ? "switch-language__option_active" : ""}`}
                    onClick={() => changeLanguage("ru")}
                >
                    RU
                </button>
            </div>
        </div>
    );
}