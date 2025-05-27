import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter} from "react-router-dom";

import {ThemeProvider} from './app/providers/themeContext'
import {LanguageProvider} from './app/providers/languageContext';
import App from './app/App';

const root = ReactDOM.createRoot(
    document.getElementById('root')
);

root.render(
    <React.StrictMode>
        <LanguageProvider>
            <ThemeProvider>
                <BrowserRouter>
                    <App/>
                </BrowserRouter>
            </ThemeProvider>
        </LanguageProvider>
    </React.StrictMode>

);