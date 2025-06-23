import {createContext, useState, useEffect} from 'react';

import favicon_l from '../../assets/logos/favicon-light.png';
import logo_l from '../../assets/logos/logo-light.png';
import logo_blur_l from '../../assets/logos/logo-light-blur.png';
import logo_blur_stretched_l from '../../assets/logos/logo-light-blur-stretched.png';
import signup_bg_l from '../../assets/signup-bg-light.png'
import theme_l from '../../assets/icons/theme-light.png';
import menu_l from '../../assets/icons/menu-light.png'
import chat_l from '../../assets/icons/chat-light.png'
import profile_l from '../../assets/icons/profile-light.png'
import settings_l from '../../assets/icons/settings-light.png'
import security_l from '../../assets/icons/security-light.png'
import appearance_l from '../../assets/icons/appearance-light.png'
import logout_l from '../../assets/icons/logout-light.png'
import attach_l from '../../assets/icons/attach-light.png'
import send_l from '../../assets/icons/send-light.png'
import arrow_l from '../../assets/icons/down-arrow-light.png'
import close_l from '../../assets/icons/close-light.png'
import block_l from '../../assets/icons/block-light.png'


import favicon_d from '../../assets/logos/favicon-dark.png';
import logo_d from '../../assets/logos/logo-dark.png';
import logo_blur_d from '../../assets/logos/logo-dark-blur.png';
import logo_blur_stretched_d from '../../assets/logos/logo-dark-blur-stretched.png';
import signup_bg_d from '../../assets/signup-bg-dark.png'
import theme_d from '../../assets/icons/theme-dark.png';
import menu_d from '../../assets/icons/menu-dark.png'
import chat_d from '../../assets/icons/chat-dark.png'
import profile_d from '../../assets/icons/profile-dark.png'
import settings_d from '../../assets/icons/settings-dark.png'
import security_d from '../../assets/icons/security-dark.png'
import appearance_d from '../../assets/icons/appearance-dark.png'
import logout_d from '../../assets/icons/logout-dark.png'
import attach_d from '../../assets/icons/attach-dark.png'
import send_d from '../../assets/icons/send-dark.png'
import arrow_d from '../../assets/icons/down-arrow-dark.png'
import close_d from '../../assets/icons/close-dark.png'
import block_d from '../../assets/icons/block-dark.png'


import show from '../../assets/icons/show.png'
import hide from '../../assets/icons/hide.png'
import read from '../../assets/icons/read.png'
import unread from '../../assets/icons/unread.png'
import pfp_placeholder from '../../assets/icons/pfp-placeholder.png'
import edit from '../../assets/icons/edit.png'

export const images = {
    static : {
        show: show, hide: hide,
        read: read, unread: unread,
        pfp_placeholder: pfp_placeholder,
        edit: edit,
    },

    light: {
        favicon: favicon_l,
        logo: logo_l, logo_blur: logo_blur_l, logo_blur_stretched: logo_blur_stretched_l,
        signup_bg: signup_bg_l,
        theme: theme_l,
        menu: menu_l,
        chat: chat_l, profile: profile_l, settings: settings_l, logout: logout_l,
        security: security_l, appearance: appearance_l,
        arrow: arrow_l, close: close_l, attach: attach_l, send: send_l, block: block_l,
    },

    dark: {
        favicon: favicon_d,
        logo: logo_d, logo_blur: logo_blur_d, logo_blur_stretched: logo_blur_stretched_d,
        signup_bg: signup_bg_d,
        theme: theme_d,
        menu: menu_d,
        chat: chat_d, profile: profile_d, settings: settings_d, logout: logout_d,
        security: security_d, appearance: appearance_d,
        arrow: arrow_d, close: close_d, attach: attach_d, send: send_d, block: block_d,
    },
};

const ThemeContext = createContext();

const ThemeProvider = ({children}) => {

    const getTheme = () => {
        const savedTheme = localStorage.getItem("theme");
        if (savedTheme) return savedTheme;
        const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
        return prefersDark ? "dark" : "light";
    };

    const [theme, setTheme] = useState(getTheme);

    useEffect(() => {
        document.documentElement.setAttribute("data-theme", theme);
        localStorage.setItem("theme", theme);
    }, [theme]);


    const handleThemeChange = () => {
        const newTheme = theme === "dark" ? "light" : "dark";
        setTheme(newTheme);
    };

    return (
        <ThemeContext.Provider value={{theme, handleThemeChange}}>
            {children}
        </ThemeContext.Provider>
    )
}

export {ThemeContext, ThemeProvider};

