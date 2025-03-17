import {createContext, useState} from 'react';


export const LanguageContext = createContext();

export const LanguageProvider = ({children}) => {
    const [language, setLanguage] = useState(
        localStorage.getItem('language') || 'en'
    );


    const changeLanguage = (lng) => {
        setLanguage(lng);
        localStorage.setItem('language', lng);
    };

    return (
        <LanguageContext.Provider value={{language, changeLanguage}}>
            {children}
        </LanguageContext.Provider>
    );
};

export const translations = {
    en: {
        labels: {
            signin: "sign in",
            signup: "sign up",
            continue: "continue",
            search: "search",
            my_profile: "my profile",
            settings: "settings",
            logout: "logout",
            online: "online",
            offline: "offline",
        },

        signin_welcome: "sign in to deadin.site",
        signup_welcome: "sign up to deadin.site",
        username: "username",
        email: "email",
        username_email: "username or email",
        password: "password",
        forgot_password: "forgot password?",
        new_user: "new to deadin.site?",
        old_user: "already have an account?",
        create_account: "create an account",
        start_typing: "start typing..."
    },
    ru: {
        labels: {
            signin: "войти",
            signup: "зарегистрироваться",
            continue: "продолжить",
            search: "поиск",
            my_profile: "мой профиль",
            settings: "настройки",
            logout: "выход",
        },

        signin_welcome: "вход в deadin.site",
        signup_welcome: "регистрация в deadin.site",
        username: "юзернейм",
        email: "почта",
        username_email: "юзернейм или почта",
        password: "пароль",
        forgot_password: "забыли пароль?",
        new_user: "впервые на deadin.site?",
        old_user: "уже зарегистрированы?",
        create_account: "создать аккаунт",
        start_typing: "начните печатать..."
    },
};