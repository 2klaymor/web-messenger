import {useState, useContext} from 'react'
import {translations, LanguageContext} from "../../../app/contexts/languageContext";
import {useAuth} from '../../../app/contexts/authContext'
import {useProfileSetupPage} from "../model/useProfileSetupPage";
import Button from '../../../shared/ui/Button'
import SetPfp from "../../../features/set-pfp/SetPfp";
import ErrorMessage from "../../../shared/ui/ErrorMessage";

const ProfileSetupPage = () => {
    const {user} = useAuth();
    const {language} = useContext(LanguageContext);
    const t = translations[language];
    const {
        displayNameRef, bioRef,
        handleSubmit, errorKey
    } = useProfileSetupPage();

    return (
        <div className="setup-page">

            <div className="form">
                <h1>{t.setup.title}</h1>

                <div className="setup-page__pfp-wrapper">
                    <SetPfp/>
                    <p>@{user.name}</p>
                </div>

                <label htmlFor="inputDisplayName">{t.fields.display_name}
                    <input type="text"
                           id="inputDisplayName"
                           ref={displayNameRef}
                           placeholder={user.name}
                    />
                </label>
                <ErrorMessage errorKey={errorKey}></ErrorMessage>

                <label className="d-column" htmlFor="inputAbout">{t.fields.about_me}
                    <textarea id="inputAbout" ref={bioRef} placeholder=""></textarea>
                </label>

                <Button onClick={handleSubmit}>{t.buttons.finish}</Button>
            </div>
        </div>
    );
}

export default ProfileSetupPage;