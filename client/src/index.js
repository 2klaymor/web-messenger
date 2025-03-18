import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter} from "react-router-dom";

import {ThemeProvider} from './utils/theme'
import {LanguageProvider} from './utils/language';
import App from './App';

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