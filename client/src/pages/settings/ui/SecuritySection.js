import {useContext} from "react";
import {LanguageContext, translations} from '../../../app/contexts/languageContext';
import {useSecuritySection} from "../model/useSecuritySection";
import Button from "../../../shared/ui/Button";
import RotatingArrow from "../../../shared/ui/RotatingArrow";
import {ToggleVisibilityIcon} from "../../../widgets/password-toggle/ToggleVisibilityIcon";
import {useToggleVisibility} from "../../../widgets/password-toggle/useToggleVisibility";
import ErrorMessage from "../../../shared/ui/ErrorMessage";

export default function SecuritySection() {
    const {language} = useContext(LanguageContext);
    const t = translations[language];

    const {show, toggle} = useToggleVisibility();

    const {
        showPasswordForm, setShowPasswordForm,
        passwordRef,
        handleUpdatePassword, handleDeleteAccount,
        errorKey, success, handleClosePasswordForm,
        } = useSecuritySection();

    return (
        <div className="security settings__content form">
            <h1>{t.settings.security}</h1>

            {/* UPDATE PASSWORD */}
            <div className="security__update-password">
                {/* КОНТЕЙНЕР СО СТРЕЛКОЙ */}
                <div
                    className="arrow__container"
                    onClick={() => setShowPasswordForm(prev => !prev)}
                >
                    <p>{t.settings.change_password}</p>
                    <RotatingArrow state={showPasswordForm}/>
                </div>

                {/* ФОРМА ИЗМЕНЕНИЯ ПАРОЛЯ*/}
                {showPasswordForm && (
                    <div className="update-form">
                        <div className="toggle-visibility-wrapper">
                            <input type={`${show ? 'text' : 'password'}`}
                                     ref={passwordRef}
                                     placeholder={t.settings.new_password}/>

                            <ToggleVisibilityIcon show={show} onClick={toggle}/>
                        </div>
                        <ErrorMessage errorKey={errorKey} success={success}/>

                        <div className="update-form__buttons">
                            <Button userClassName="button_success" onClick={handleUpdatePassword}>
                                {t.buttons.save}
                            </Button>
                            <Button onClick={handleClosePasswordForm}>
                                {t.buttons.cancel}
                            </Button>
                        </div>

                    </div>
                )}
            </div>

            {/* DELETE ACCOUNT */}
            {/*<Button*/}
            {/*    className="button_danger"*/}
            {/*    onClick={handleDeleteAccount}*/}
            {/*>*/}
            {/*    {t.settings.delete_account}*/}
            {/*</Button>*/}
        </div>
    )
}