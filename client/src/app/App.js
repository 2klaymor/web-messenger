import {Routes, Route} from "react-router-dom";

import '../shared/styles/styles.sass'

import PageLayout from '../shared/layout/PageLayout';
import HeaderGuest from "../shared/layout/HeaderGuest";
import HeaderUser from "../shared/layout/HeaderUser";
import StartPage from '../pages/start-page/ui/StartPage';
import SignInPage from '../pages/sign-up/ui/SignInPage';
import SignUpPage from '../pages/sign-in/ui/SignUpPage';
import HomePage from '../pages/home/ui/HomePage';

function App() {
    return (
        <Routes>

            <Route path="/"
                element={
                <PageLayout components={[<HeaderGuest/>, <StartPage/>]} />
                }
            />

            <Route path="/signin"
               element={
                <PageLayout components={[<HeaderGuest/>, <SignInPage/>]}/>
               }
            />

            <Route path="/signup"
               element={
                <PageLayout components={[<HeaderGuest/>, <SignUpPage/>]}/>
               }
            />

            <Route path="/home"
               element={
                <PageLayout components={[<HeaderUser/>, <HomePage/>]}/>
               }
            />

        </Routes>
    )
}

export default App;
