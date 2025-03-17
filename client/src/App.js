import {Routes, Route} from "react-router-dom";

import './styles/styles.sass'

import {ThemeProvider} from './utils/theme'
import {LanguageProvider} from './utils/language';

import Page from './utils/Page';
import HeaderGuest from "./layout/HeaderGuest";
import HeaderUser from "./layout/HeaderUser";
import Start from './pages/Start';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Home from './pages/Home';

function App() {
    return (
        <LanguageProvider>
        <ThemeProvider>
        <Routes>

            <Route path="/"
                element={
                <Page components={[<HeaderGuest/>, <Start/>]} />
                }
            />

            <Route path="/signin"
               element={
                <Page components={[<HeaderGuest/>, <SignIn/>]}/>
               }
            />

            <Route path="/signup"
               element={
                <Page components={[<HeaderGuest/>, <SignUp/>]}/>
               }
            />

            <Route path="/home"
               element={
                <Page components={[<HeaderUser/>, <Home/>]}/>
               }
            />

        </Routes>
        </ThemeProvider>
        </LanguageProvider>
    )
}

export default App;
