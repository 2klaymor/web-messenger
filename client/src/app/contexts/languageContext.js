import {createContext, useState} from 'react';

export const translations = {
    en: {
        fields: {
            login_label: "username or email",
            username: "username",
            display_name: "name",
            email: "email",
            password: "password",
            about_me: "bio",
        },

        buttons: {
            sign_in: "sign in",
            sign_up: "sign up",
            continue: "continue",
            search: "search",
            next: "next",
            finish: "finish",
            save: "save",
            cancel: "cancel",
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
            all_fields_required: "please fill in all fields",
            fill_display_name: "name cannot be empty",
            access_denied: "it seems you don't have access to this page",
            not_found: "this page doesnt exist",

            success: "✓ saved",
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

        setup: {
            title: "getting started",
            dota_rank: "dota 2 rank",
            ranks: {
                not_a_player: "i dont play dota",
                uncalibrated: "uncalibrated",
                herald: "herald",
                guardian: "guardian",
                crusader: "crusader",
                archon: "archon",
                legend: "legend",
                ancient: "ancient",
                divine: "divine",
                immortal: "immortal",
            },
        },

        settings: {
            account: "account",
            security: "security",
            blocked_users: "blocked users",
            appearance: "appearance",
            change_password: "change password",
            new_password: "new password",
            delete_account: "delete account",
            language: "language",
            theme: "theme",
            change_theme: "change theme",
        },

        home: {
            chat: {
                textarea_placeholder: "start typing..."
            },

            contacts: {
                add: "add to contacts",
                remove: "remove from contacts",
                in_contacts: "in contacts",
                block: "block",
                unblock: "unblock",
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
            display_name: "имя",
            email: "email",
            password: "пароль",
            about_me: "био",
        },

        buttons: {
            sign_in: "войти",
            sign_up: "зарегистрироваться",
            continue: "продолжить",
            search: "поиск",
            next: "далее",
            finish: "завершить",
            save: "сохранить",
            cancel: "отмена",
            add_to_contacts: "добавить в контакты",
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
            fill_display_name: "имя не может быть пустым",
            access_denied: "кажется, у вас нет доступа к этой странице",
            not_found: "такая страница не найдена",

            success: "✓ сохранено",
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

        setup: {
            title: "дополните свой профиль",
            dota_rank: "ранг в доте",
            ranks: {
                not_a_player: "не играю в доту",
                uncalibrated: "на калибровке",
                herald: "рекрут",
                guardian: "страж",
                crusader: "рыцарь",
                archon: "герой",
                legend: "легенда",
                ancient: "властелин",
                divine: "божество",
                immortal: "титан",
            },
        },

        settings: {
            account: "аккаунт",
            security: "безопасность",
            blocked_users: "заблокированные",
            appearance: "внешний вид",
            change_password: "изменить пароль",
            new_password: "новый пароль",
            delete_account: "удалить аккаунт",
            language: "язык",
            theme: "тема",
            change_theme: "сменить тему",
        },

        home: {
            chat: {
                textarea_placeholder: "начните печатать..."
            },

            contacts: {
                add: "добавить в контакты",
                removes: "удалить из контактов",
                in_contacts: "в контактах",
                block: "заблокировать",
                unblock: "разблокировать",
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