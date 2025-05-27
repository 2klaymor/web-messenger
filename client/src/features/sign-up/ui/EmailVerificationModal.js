import {Link} from "react-router-dom";
import {useContext, useState} from "react";

import {LanguageContext, translations} from "../../../app/providers/languageContext";
import {ThemeContext, images} from "../../../app/providers/themeContext";

const EmailVerificationModal = ({onClose, email}) => {
    const {language} = useContext(LanguageContext);
    const t = translations[language];
    const {theme} = useContext(ThemeContext);

    const [code, setCode] =
        useState(new Array(6).fill(""));

    const handleChange = (value, index) => {
        if (/^\d?$/.test(value)) {
            const newCode = [...code];
            newCode[index] = value;
            setCode(newCode);

            if (value && index < 5) {
                const nextInput =
                    document.getElementById(`code-${index +1}`);
                nextInput?.focus();
            }
        }
    };

    const handleKeyDown = (e, index) => {
        if (e.key === "Backspace" && code[index] === "" && index > 0) {
            const prevInput = document.getElementById(`code-${index - 1}`);
            prevInput?.focus();
        }
    };

    const handleSubmit = () => {
        const fullCode = code.join("");
        console.log("код:", fullCode);
    }

    return (
        <div className="modal-container">
            <div className="modal-content">
                <img className="modal-close" src={images[theme].close} onClick={onClose} alt="close"/>
                <h1>{t.signup.confirm_email}</h1>
                <p>{t.signup.we_sent}<strong>{email}</strong></p>
                <p>{t.signup.please_enter}</p>
                <p className="modal-hint">{t.signup.have_to_confirm}</p>

                <div className="modal-input">
                    {code.map((digit, i) => (
                        <input
                            key={i}
                            id={`code-${i}`}
                            type="text"
                            maxLength="1"
                            value={digit}
                            onChange={(e) => handleChange(e.target.value, i)}
                            onKeyDown={(e) => handleKeyDown(e, i)}
                        />
                    ))}
                </div>

                <button className="modal-button" onClick={handleSubmit}>{t.labels.next} →</button>

                <p>{t.signup.did_not_receive}</p>
                <Link to="#" onClick={() => console.log("sent")}>{t.signup.resend}</Link>

            </div>

        </div>
    )
}

export default EmailVerificationModal;