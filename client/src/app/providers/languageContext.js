import {createContext, useState} from 'react';

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
            next: "next",
        },

        errors: {
            invalid_data: "invalid login or password",
            empty_username: "username cannot be empty",
            username_taken: "this username is already taken",
            invalid_email: "invalid e-mail",
            email_taken: "this e-mail is already taken",
            short_password: "password must contain at least 8 characters",
            fill_all_fields: "please fill all fields"
        },

        signup: {
            confirm_email: "confirm your e-mail address",
            we_sent: "we sent a 6-digit code to your e-mail: ",
            please_enter: "please enter it below to complete the registration",
            have_to_confirm: "we need to confirm that you are the owner of this email",
            did_not_receive: "did not receive the code?",
            resend: "resend",
        },

        signin_welcome: "sign in to deadin.site",
        signup_welcome: "sign up to deadin.site",
        username: "username",
        email: "email",
        login: "username or email",
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
            online: "онлайн",
            offline: "оффлайн",
            next: "далее",
        },

        errors: {
            invalid_data: "некорректный логин или пароль",
            empty_username: "юзернейм не может быть пустым",
            username_taken: "этот юзернейм уже занят",
            invalid_email: "некорректный e-mail",
            email_taken: "этот e-mail уже занят",
            short_password: "пароль должен содержать минимум 8 символов",
            fill_all_fields: "пожалуйста, заполните все поля"
        },

        signup: {
            confirm_email: "подтверждение адреса электронной почты",
            we_sent: "мы отправили 6-значный код на ваш e-mail:",
            please_enter: "пожалуйста, введите его ниже, чтобы завершить регистрацию",
            have_to_confirm: "нужно убедиться, что вы действительно являетесь владельцем этой почты",
            did_not_receive: "не получили код?",
            resend: "отправить повторно",
        },

        signin_welcome: "вход в deadin.site",
        signup_welcome: "регистрация в deadin.site",
        username: "юзернейм",
        email: "e-mail",
        login: "юзернейм или e-mail",
        password: "пароль",
        forgot_password: "забыли пароль?",
        new_user: "впервые на deadin.site?",
        old_user: "уже зарегистрированы?",
        create_account: "создать аккаунт",
        start_typing: "начните печатать..."
    },
};

export const LanguageContext = createContext();

export const LanguageProvider = ({children}) => {
    const [language, setLanguage] = useState(
        localStorage.getItem('language') || 'ru'
    );

    const changeLanguage = (lng) => {
        setLanguage(lng);
        localStorage.setItem('language', lng);
    };

    return (
        <LanguageContext.Provider value={{language, changeLanguage}}>
            {children}
        </LanguageContext.Provider>
    )
}