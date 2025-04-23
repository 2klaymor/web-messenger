import {createContext, useState, useEffect} from 'react';

import favicon_l from '../assets/logos/favicon-light.png';
import logo_l from '../assets/logos/logo-light.png';
import logo_blur_l from '../assets/logos/logo-light-blur.png';
import logo_blur_stretched_l from '../assets/logos/logo-light-blur-stretched.png';
import theme_logo_l from '../assets/icons/theme-light.png';
import attach_l from '../assets/icons/attach-light.png'
import send_l from '../assets/icons/send-light.png'
import arrow_l from '../assets/icons/down-arrow-light.png'
import close_l from '../assets/icons/close-light.png'

import favicon_d from '../assets/logos/favicon-dark.png';
import logo_d from '../assets/logos/logo-dark.png';
import logo_blur_d from '../assets/logos/logo-dark-blur.png';
import logo_blur_stretched_d from '../assets/logos/logo-dark-blur-stretched.png';
import theme_logo_d from '../assets/icons/theme-dark.png';
import attach_d from '../assets/icons/attach-dark.png'
import send_d from '../assets/icons/send-dark.png'
import arrow_d from '../assets/icons/down-arrow-dark.png'
import close_d from '../assets/icons/close-dark.png'

import show from '../assets/icons/show-light.png'
import hide from '../assets/icons/hide-light.png'

export const images = {
    static : {
      show: show,
      hide: hide,
    },

    light: {
        favicon: favicon_l,
        logo: logo_l,
        logo_blur: logo_blur_l,
        logo_blur_stretched: logo_blur_stretched_l,
        theme_logo: theme_logo_l,
        attach: attach_l,
        send: send_l,
        arrow: arrow_l,
        close: close_l,
    },
    dark: {
        favicon: favicon_d,
        logo: logo_d,
        logo_blur: logo_blur_d,
        logo_blur_stretched: logo_blur_stretched_d,
        theme_logo: theme_logo_d,
        attach: attach_d,
        send: send_d,
        arrow: arrow_d,
        close: close_d,
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

export {ThemeProvider, ThemeContext};

