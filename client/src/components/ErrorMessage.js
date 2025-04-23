import {useContext} from "react";
import {LanguageContext, translations} from '../utils/language';

const ErrorMessage = ({errorKey}) => {
    const { language } = useContext(LanguageContext);
    const t = translations[language];

    if (!errorKey) return null;

    return <p className="error-message">{t.errors[errorKey]}</p>;
};

export default ErrorMessage;