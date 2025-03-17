import {createContext, useState, useEffect} from 'react';

const ThemeContext = createContext();

const ThemeProvider = ({children}) => {
    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark');

    const handleThemeChange = () => {
        const newTheme = theme === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);};

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
    }, [theme]);

    return (
        <ThemeContext.Provider value={{theme, handleThemeChange}}>
            {children}
        </ThemeContext.Provider>
    );
};

export {ThemeProvider, ThemeContext};

export const images = {
    light: {
        favicon: '/favicon-white.png',
        logo: '/logo-white.png',
        logo_blur: '/logo-white-blur.png',
        logo_blur_stretched: '/logo-white-blur-stretched.png',
        theme_logo: '/theme-white.png',
        attach: '/attach-white.png',
        send: '/send-white.png',
    },
    dark: {
        favicon: '/favicon-black.png',
        logo: '/logo-black.png',
        logo_blur: '/logo-black-blur.png',
        logo_blur_stretched: '/logo-black-blur-stretched.png',
        theme_logo: '/theme-black.png',
        attach: '/attach-black.png',
        send: '/send-black.png',
    },
};