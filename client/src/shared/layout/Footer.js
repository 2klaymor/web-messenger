import {useContext} from 'react';
import {LanguageContext} from '../../app/providers/languageContext';

const Footer = () => {
    const {changeLanguage} = useContext(LanguageContext);

    return (
        <div className="footer">

            <p>2025</p>
            <div className="ml-2">
                <button type="button" onClick={() => changeLanguage('en')}>EN</button>
                <button type="button" onClick={() => changeLanguage('ru')}>RU</button>
            </div>
            <p className="ml-auto">tg:</p>
            <p className="ml-1">@bratworth </p>
            <p className="ml-1">@kklaymor</p>

        </div>
    )
};

export default Footer;