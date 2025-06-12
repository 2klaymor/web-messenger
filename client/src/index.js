import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter} from "react-router-dom";

import {ThemeProvider} from './app/contexts/themeContext'
import {LanguageProvider} from './app/contexts/languageContext';
import {AuthProvider} from './app/contexts/authContext';
import App from './app/App';

const root = ReactDOM.createRoot(
    document.getElementById('root')
);

root.render(
    // <React.StrictMode>
        <LanguageProvider>
            <ThemeProvider>
                <AuthProvider>
                    <BrowserRouter>
                        <App/>
                    </BrowserRouter>
                </AuthProvider>
            </ThemeProvider>
        </LanguageProvider>
    // </React.StrictMode>

);