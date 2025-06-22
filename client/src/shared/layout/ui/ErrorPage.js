import {useContext} from "react";
import {translations, LanguageContext} from "../../../app/contexts/languageContext";
import PageLayout from "./PageLayout";

export default function ErrorPage({code, errorKey, children}) {
    const {language} = useContext(LanguageContext);
    const t = translations[language];

    return (
        <PageLayout>
            <div className="error-page">
                <h1 className="error-page__code">{code}</h1>
                <p className="error-page__message">{t.errors[errorKey]}</p>
                {children}
            </div>
        </PageLayout>
    );
}