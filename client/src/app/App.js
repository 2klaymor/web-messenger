import {Routes, Route} from "react-router-dom";
import PublicRoute from "./utils/PublicRoute";
import PrivateRoute from "./utils/PrivateRoute";
import {useAuth} from './utils/authContext'

import '../shared/styles/styles.sass'

import PageLayout from '../shared/layout/ui/PageLayout';
import HeaderGuest from "../shared/layout/ui/HeaderGuest";
import HeaderUser from "../shared/layout/ui/HeaderUser";
import Footer from "../shared/layout/ui/Footer";
import StartPage from '../pages/start-page/ui/StartPage';
import SignInPage from '../pages/sign-in/ui/SignInPage';
import SignUpPage from '../pages/sign-up/SignUpPage';
import HomePage from '../pages/home/ui/HomePage';

// import Test from "../api-test/Test";
// import eruda from "eruda";

function App() {
    const {isAuth} = useAuth();

    // devtools для сафари
    // if (window.location.hostname === '192.168.1.120') {
    //     const script = document.createElement('script');
    //     script.src = 'https://cdn.jsdelivr.net/npm/eruda';
    //     document.body.appendChild(script);
    //     script.onload = function () {
    //         eruda.init();
    //     };
    // }

    return (
        <Routes>

            <Route path="/"
                   element={
                    <PageLayout
                        components={[isAuth ? <HeaderUser/> : <HeaderGuest/>, <StartPage/>, <Footer/>]}
                    />
                }
            />

            <Route path="/signin"
               element={
                   <PublicRoute>
                       <PageLayout components={[<HeaderGuest/>, <SignInPage/>, <Footer/>]}/>
                   </PublicRoute>
               }
            />

            <Route path="/signup"
               element={
                   <PublicRoute>
                       <PageLayout components={[<HeaderGuest/>, <SignUpPage/>, <Footer/>]}/>
                   </PublicRoute>
               }
            />

            <Route path="/home"
               element={
                   <PrivateRoute>
                       <PageLayout components={[<HeaderUser/>, <HomePage/>]}/>
                   </PrivateRoute>
               }
            />

            {/*<Route path="/test"*/}
            {/*       element={*/}
            {/*           <Test/>*/}
            {/*       }*/}
            {/*/>*/}

        </Routes>
    )
}

export default App;
