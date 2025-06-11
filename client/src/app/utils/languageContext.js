import {createContext, useState} from 'react';

export const translations = {
    en: {
        fields: {
            login_label: "username or email",
            username: "username",
            email: "email",
            password: "password",
        },

        buttons: {
            sign_in: "sign in",
            sign_up: "sign up",
            continue: "continue",
            search: "search",
            next: "next",
        },

        status: {
            online: "online",
            offline: "offline",
        },

        errors: {
            invalid_credentials: "invalid login or password",
            empty_username: "username cannot be empty",
            username_taken: "this username is already taken",
            invalid_email: "please enter a valid email",
            email_taken: "this email is already taken",
            password_too_short: "password must contain at least 8 characters",
            all_fields_required: "please fill in all fields"
        },

        sign_in: {
            title: "sign in to deadin.site",
            forgot_password: "forgot password?",
            new_user_prompt: "new to deadin.site?",
        },

        sign_up: {
            title: "sign up for deadin.site",
            existing_user_prompt: "already have an account?",

            email_confirmation: {
                title: "confirm your email address",
                sent_notice: "we sent a 6-digit code to your email: ",
                instruction: "please enter it below to complete the registration",
                explanation: "we need to confirm that you are the owner of this email",
                resend_prompt: "did not receive the code?",
                resend_button: "resend",
            },
        },

        home: {
            chat: {
                textarea_placeholder: "start typing..."
            },

            profile: {
                my_profile: "my profile",
                settings: "settings",
                log_out: "log out",
            },
        },
    },
    ru: {
        fields: {
            login_label: "юзернейм или email",
            username: "юзернейм",
            email: "email",
            password: "пароль",
        },

        buttons: {
            sign_in: "войти",
            sign_up: "зарегистрироваться",
            continue: "продолжить",
            search: "поиск",
            next: "далее",
        },

        status: {
            online: "онлайн",
            offline: "оффлайн",
        },

        errors: {
            invalid_credentials: "некорректный логин или пароль",
            empty_username: "юзернейм не может быть пустым",
            username_taken: "этот юзернейм уже занят",
            invalid_email: "некорректный e-mail",
            email_taken: "этот e-mail уже занят",
            password_too_short: "пароль должен содержать минимум 8 символов",
            all_fields_required: "пожалуйста, заполните все поля",
        },

        sign_in: {
            title: "вход в deadin.site",
            forgot_password: "забыли пароль?",
            new_user_prompt: "впервые на deadin.site?",
        },

        sign_up: {
            title: "регистрация в deadin.site",
            existing_user_prompt: "уже зарегистрированы?",

            email_confirmation: {
                title: "подтверждение адреса электронной почты",
                sent_notice: "мы отправили 6-значный код на ваш email: ",
                instruction: "пожалуйста, введите его ниже, чтобы завершить регистрацию",
                explanation: "нужно убедиться, что вы действительно являетесь владельцем этой почты",
                resend_prompt: "не получили код?",
                resend_button: "отправить еще раз",
            },
        },

        home: {
            chat: {
                textarea_placeholder: "начните печатать..."
            },

            profile: {
                my_profile: "мой профиль",
                settings: "настройки",
                log_out: "выйти",
            },
        },
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