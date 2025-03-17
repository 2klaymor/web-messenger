import {useContext} from 'react';
import {LanguageContext} from '../utils/language';

const Footer = () => {
    const {changeLanguage} = useContext(LanguageContext);

    return (
        <div className="footer">

            <span>2025</span>
            <div className="change-lang">
                <button className="btn" type="button" onClick={() => changeLanguage('en')}>EN</button>
                <button className="btn" type="button" onClick={() => changeLanguage('ru')}>RU</button>
            </div>
            <span className="ms-auto">tg: @bratworth </span>
            <span className="ms-2">@kklaymor</span>

        </div>
    )
}

export default Footer;