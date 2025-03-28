import {createContext, useState, useEffect} from 'react';

import favicon_w from '../assets/favicon-white.png';
import favicon_b from '../assets/favicon-black.png';
import logo_w from '../assets/logo-white.png';
import logo_b from '../assets/logo-black.png';
import logo_blur_w from '../assets/logo-white-blur.png';
import logo_blur_b from '../assets/logo-black-blur.png';
import logo_blur_stretched_w from '../assets/logo-white-blur-stretched.png';
import logo_blur_stretched_b from '../assets/logo-black-blur-stretched.png';
import theme_logo_w from '../assets/theme-white.png';
import theme_logo_b from '../assets/theme-black.png';
import attach_w from '../assets/attach-white.png'
import attach_b from '../assets/attach-black.png'
import send_w from '../assets/send-white.png'
import send_b from '../assets/send-black.png'

export const images = {
    light: {
        favicon: favicon_w,
        logo: logo_w,
        logo_blur: logo_blur_w,
        logo_blur_stretched: logo_blur_stretched_w,
        theme_logo: theme_logo_w,
        attach: attach_w,
        send: send_w,
    },
    dark: {
        favicon: favicon_b,
        logo: logo_b,
        logo_blur: logo_blur_b,
        logo_blur_stretched: logo_blur_stretched_b,
        theme_logo: theme_logo_b,
        attach: attach_b,
        send: send_b,
    },
};

const ThemeContext = createContext();

const ThemeProvider = ({children}) => {
    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark');

    const handleThemeChange = () => {
        const newTheme = theme === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    };

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
    }, [theme]);

    return (
        <ThemeContext.Provider value={{theme, handleThemeChange}}>
            {children}
        </ThemeContext.Provider>
    )
}

export {ThemeProvider, ThemeContext};

