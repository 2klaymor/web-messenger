import {Routes, Route} from "react-router-dom";

import '../shared/styles/styles.sass'

import PageLayout from '../shared/layout/PageLayout';
import HeaderGuest from "../shared/layout/HeaderGuest";
import HeaderUser from "../shared/layout/HeaderUser";
import Footer from "../shared/layout/Footer";
import StartPage from '../pages/start-page/ui/StartPage';
import SignInPage from '../pages/sign-in/ui/SignInPage';
import SignUpPage from '../pages/sign-up/SignUpPage';
import HomePage from '../pages/home/ui/HomePage';

import Test from "../api-test/Test";

function App() {
    return (
        <Routes>

            <Route path="/"
                element={
                <PageLayout components={[<HeaderGuest/>, <StartPage/>, <Footer/>]} />
                }
            />

            <Route path="/signin"
               element={
                <PageLayout components={[<HeaderGuest/>, <SignInPage/>, <Footer/>]}/>
               }
            />

            <Route path="/signup"
               element={
                <PageLayout components={[<HeaderGuest/>, <SignUpPage/>, <Footer/>]}/>
               }
            />

            <Route path="/home"
               element={
                <PageLayout components={[<HeaderUser/>, <HomePage/>]}/>
               }
            />

            <Route path="/test"
                   element={
                       <Test/>
                   }
            />

        </Routes>
    )
}

export default App;
