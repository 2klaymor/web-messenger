import {useContext} from 'react';
import {Link} from 'react-router-dom';
import {LanguageContext, translations} from '../../../app/contexts/languageContext';
import {ThemeContext, images} from '../../../app/contexts/themeContext';
import {useAuth} from "../../../app/contexts/authContext";
import useHeaderUser from "../model/useHeaderUser";
import ProfileModal from "../../../widgets/profile-modal/ProfileModal";
import SwitchLanguage from "../../../widgets/switch-language/SwitchLanguage";
import BulletPoint from "../../ui/BulletPoint";
import RotatingArrow from "../../ui/RotatingArrow";

const HeaderUser = () => {
    const { language } = useContext(LanguageContext);
    const t = translations[language];
    const {theme, handleThemeChange} = useContext(ThemeContext)
    const {user, signOut} = useAuth();

    const {
        isMenuOpen, setIsMenuOpen,
        isProfileModalOpen, setIsProfileModalOpen,
    } = useHeaderUser();

    // const userInfo = {
    //     username: user.name, displayName: user.displayName,
    //     about: localStorage.getItem('about')};

    return (
        <nav className="header header-user">

            <Link to="/" className="header__logo">
                <img src={images[theme].favicon} alt="logo"/>
                deadin.site
            </Link>

            <img className="header__theme"
                 src={images[theme].theme}
                 onClick={handleThemeChange}
                 alt="toggle theme icon"/>

            {/* dropdown container */}
            <div className="header-user__dropdown dropdown">

                <div className="header-user__toggle-dropdown"
                     onClick={() => setIsMenuOpen(prev => !prev)}
                >
                    <img className="header-user__pfp"
                         src={user.pfp}
                         alt="pfp"/>
                    <RotatingArrow state={isMenuOpen}/>
                </div>

                <div className={`header-user__dropdown-menu dropdown__menu ${isMenuOpen ? 'dropdown__menu_show' : ''}`}>

                    <li>
                        <Link to="/home">
                            <img className="header-user__dropdown-menu-pfp" src={user.pfp} alt="pfp"></img>
                            <p className="header-user__username">{user.displayName}</p>
                            <p className="header-user__handle">@{user.name}</p>
                        </Link>
                    </li>

                    <hr></hr>

                    <div className="header-user__dropdown-list-items">
                        <BulletPoint wrap="div"
                                     onClick={() => setIsProfileModalOpen(true)}
                                     imageKey="profile"
                        >
                            {t.home.profile.my_profile}
                        </BulletPoint>
                        <BulletPoint wrap="link"
                                     to="/home"
                                     imageKey="chat"
                        >
                            {t.buttons.chat}
                        </BulletPoint>
                        <BulletPoint wrap="link"
                                     to="/settings"
                                     imageKey="settings"
                        >
                            {t.home.profile.settings}
                        </BulletPoint>
                        <BulletPoint wrap="div"
                                     onClick={signOut}
                                     imageKey="logout"
                        >
                            {t.home.profile.log_out}
                        </BulletPoint>
                    </div>
                </div>

                {isProfileModalOpen && (
                    <ProfileModal
                        userType = 'self'
                        user={user}
                        onClose={() => setIsProfileModalOpen(false)}/>
                )}

            </div>

        </nav>
    )
};

export default HeaderUser;