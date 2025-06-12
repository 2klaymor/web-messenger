import {useState, useContext} from 'react'
import {translations, LanguageContext} from "../../../app/contexts/languageContext";
import {useAuth} from '../../../app/contexts/authContext'
import {useProfileSetupPage} from "../modal/useProfileSetupPage";
import Button from '../../../shared/ui/Button'
import SetPfp from "../../../features/set-pfp/SetPfp";
import ErrorMessage from "../../../shared/ui/ErrorMessage";

const ProfileSetupPage = () => {
    const {user} = useAuth();
    const {language} = useContext(LanguageContext);
    const t = translations[language];
    const {displayNameRef, handleSubmit, errorKey} = useProfileSetupPage();

    const [selectedRank, setSelectedRank] = useState('');
    const ranks = t.setup.ranks;

    return (
        <div className="setup-page">

            <div className="form">
                <h1>{t.setup.title}</h1>

                <div className="setup-page__pfp-wrapper">
                    <SetPfp/>
                    <p>@{user.name}</p>
                </div>

                <div>
                    <label htmlFor="inputDisplayName">{t.setup.name}</label>
                    <input type="text"
                           id="inputDisplayName"
                           ref={displayNameRef}
                    />
                </div>
                <ErrorMessage errorKey={errorKey}></ErrorMessage>

                <div className="d-column">
                    <label htmlFor="inputAbout">{t.setup.about_me}</label>
                    <textarea id="inputAbout" placeholder=""></textarea>
                </div>

                <div className="d-column">
                    <label htmlFor="selectDotaRank">{t.setup.dota_rank}</label>
                    <select id="selectDotaRank"
                            value={selectedRank}
                            onChange={(e) =>
                                setSelectedRank(e.target.value)}>

                        {Object.entries(ranks).map(([translationKey, translation], index) => (
                            <option key={index} value={translationKey}>{translation}</option>
                        ))}

                    </select>
                </div>

                <Button onClick={handleSubmit}>{t.setup.finish}</Button>
            </div>
        </div>
    );
}

export default ProfileSetupPage;