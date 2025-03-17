import {Routes, Route} from "react-router-dom";
import {ThemeProvider} from './theme'
import {LanguageProvider} from './language';

import './styles/styles.sass'

import Page from './Page';
import HeaderGuest from "./components/HeaderGuest";
import HeaderUser from "./components/HeaderUser";
import Start from './components/Start';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import Home from './components/Home';


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
    );
}

export default App;
