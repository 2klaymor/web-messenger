import {Routes, Route} from "react-router-dom";

import './styles/styles.sass'

import Page from './layout/page';
import HeaderGuest from "./layout/HeaderGuest";
import HeaderUser from "./layout/HeaderUser";
import Start from './pages/Start';
import SignIn from './features/auth/SignIn';
import SignUp from './features/auth/SignUp';
import Home from './pages/Home';

function App() {
    return (

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

    )
}

export default App;
