import {useContext} from "react";
import {LanguageContext, translations} from '../../../app/contexts/languageContext';
import {useAccountSection} from "../model/useAccountSection";
import {useAuth} from "../../../app/contexts/authContext";
import SetPfp from "../../../features/set-pfp/SetPfp";
import ErrorMessage from "../../../shared/ui/ErrorMessage";
import Button from "../../../shared/ui/Button";

export default function AccountSection() {
    const {language} = useContext(LanguageContext);
    const t = translations[language];
    const {user} = useAuth();

    const {
        usernameRef, displayNameRef, aboutRef,
        handleSubmit, errorKeys, success,
    } = useAccountSection(user);

    return (
        <div className={`settings__content form `}>
            <h1>{t.settings.account}</h1>
            <SetPfp/>

            <label htmlFor="inputUsername">{t.fields.username}
                <input id="inputUsername"
                       type="text"
                       ref={usernameRef}
                />
            </label>
            <ErrorMessage errorKey={errorKeys.username}/>

            <label htmlFor="inputDisplayName">{t.fields.display_name}
                <input id="inputDisplayName"
                       type="text"
                       ref={displayNameRef}
                />
            </label>
            <ErrorMessage errorKey={errorKeys.displayName}/>

            <label className="d-column" htmlFor="inputAbout">{t.fields.about_me}
                <textarea
                    id="inputAbout"
                    ref={aboutRef}
                />
            </label>

            <Button onClick={handleSubmit}> {t.buttons.save}
            </Button>
            <ErrorMessage errorKey={errorKeys.submit} success={success}/>
        </div>
    )
}