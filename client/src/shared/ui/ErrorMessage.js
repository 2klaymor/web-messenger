import {useContext} from "react";
import {LanguageContext, translations} from '../../app/contexts/languageContext';

const ErrorMessage = ({errorKey, success = false}) => {
    const { language } = useContext(LanguageContext);
    const t = translations[language];

    if (!errorKey) return null;

    return <p className={`error-message ${success ? 'error-message_success' : ''}`}>{t.errors[errorKey]}</p>;
};

export default ErrorMessage;