import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter} from "react-router-dom";

import {ThemeProvider} from './app/utils/themeContext'
import {LanguageProvider} from './app/utils/languageContext';
import {AuthProvider} from './app/utils/authContext';
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