import {useContext, useState} from "react";
import {LanguageContext, translations} from '../../../app/contexts/languageContext';
import {useAuth} from "../../../app/contexts/authContext";
import AccountSection from "./AccountSection";
import SecuritySection from "./SecuritySection";
import AppearanceSection from "./AppearanceSection";
import BulletPoint from "../../../shared/ui/BulletPoint";

export default function SettingsPage() {
    const {language} = useContext(LanguageContext);
    const t = translations[language];
    const [activeTab, setActiveTab] = useState('account');
    const {signOut} = useAuth();

    return (
        <div className="settings">
            <div className="div settings__container">
                <div className="settings__nav">
                    <BulletPoint userClassName={`settings__category 
                    ${activeTab === 'account' ? 'settings__category_active' : ''}`}
                                 wrap="div"
                                 imageKey="profile"
                                 onClick={() => setActiveTab('account')}
                    >
                        {t.settings.account}
                    </BulletPoint>
                    <BulletPoint userClassName={`settings__category 
                    ${activeTab === 'security' ? 'settings__category_active' : ''}`}
                                 wrap="div"
                                 imageKey="security"
                                 onClick={() => setActiveTab('security')}
                    >
                        {t.settings.security}
                    </BulletPoint>

                    {/*<BulletPoint userClassName={`settings__category */}
                    {/*${activeTab === 'blocked' ? 'settings__category_active' : ''}`}*/}
                    {/*             wrap="div"*/}
                    {/*             imageKey="block"*/}
                    {/*             onClick={() => setActiveTab('blocked')}*/}
                    {/*>*/}
                    {/*    {t.settings.blocked_users}*/}
                    {/*</BulletPoint>*/}

                    <BulletPoint userClassName={`settings__category 
                    ${activeTab === 'appearance' ? 'settings__category_active' : ''}`}
                                 wrap="div"
                                 imageKey="appearance"
                                 onClick={() => setActiveTab('appearance')}
                    >
                        {t.settings.appearance}
                    </BulletPoint>

                    <BulletPoint userClassName="settings__logout"
                                 wrap="div"
                                 imageKey="logout"
                                 onClick={signOut}
                    >
                        {t.home.profile.log_out}
                    </BulletPoint>
                </div>

                {activeTab === "account" && (
                    <AccountSection/>
                )}

                {activeTab === "security" && (
                    <SecuritySection/>
                )}

                {activeTab === "blocked" && (
                    <SecuritySection/>
                )}

                {activeTab === "appearance" && (
                    <AppearanceSection/>
                )}
            </div>
        </div>
    )
}