// import {useEffect} from "react";
import {Routes, Route} from "react-router-dom";
// import {socket} from "../shared/socket/socket";
// import {socketListeners} from "../shared/socket/socketListeners";
// import {useAuth} from "./contexts/authContext";
import PublicRoute from "./routes/PublicRoute";
import PrivateRoute from "./routes/PrivateRoute";
import ProfileSetupRoute from "./routes/ProfileSetupRoute";

import '../shared/styles/styles.sass'

import ErrorPage from "../shared/layout/ui/ErrorPage";
import PageLayout from '../shared/layout/ui/PageLayout';
import StartPage from '../pages/start-page/ui/StartPage';
import SignInPage from '../pages/sign-in/ui/SignInPage';
import SignUpPage from '../pages/sign-up/ui/SignUpPage';
import ProfileSetupPage from "../pages/profile-setup/ui/ProfileSetupPage";
import HomePage from '../pages/home/HomePage';
import SettingsPage from "../pages/settings/ui/SettingsPage";

// import eruda from "eruda";
function App() {
    // // devtools для сафари
    // if (window.location.hostname === '192.168.1.120') {
    //     const script = document.createElement('script');
    //     script.src = 'https://cdn.jsdelivr.net/npm/eruda';
    //     document.body.appendChild(script);
    //     script.onload = function () {
    //         eruda.init();
    //     };
    //

    // const {user} = useAuth();
    // useEffect(() => {
    //     if (!user?.name) return;
    //
    //     socketListeners(user.name);
    //
    //     return () => {
    //         socket.off("message");
    //         socket.off("connect");
    //         socket.off("disconnect");
    //     };
    // }, [user?.name]);


    return (
        <Routes>

            <Route path="/"
                   element={<PageLayout> <StartPage/> </PageLayout>}
            />

            <Route path="/signin"
               element={
                   <PublicRoute>
                       <PageLayout> <SignInPage/> </PageLayout>
                   </PublicRoute>
               }
            />

            <Route path="/signup"
               element={
                   <PublicRoute>
                       <PageLayout> <SignUpPage/> </PageLayout>
                   </PublicRoute>
               }
            />

            <Route path="/setup"
                   element={
                <ProfileSetupRoute>
                    <PageLayout withHeader={false} withFooter={false}> <ProfileSetupPage/> </PageLayout>
                </ProfileSetupRoute>
                }
            />

            <Route path="/home"
               element={
                   <PrivateRoute>
                       <PageLayout withFooter={false}> <HomePage/> </PageLayout>
                   </PrivateRoute>
               }
            />

            <Route path="/settings"
                   element={
                    <PrivateRoute>
                        <PageLayout withFooter={false}> <SettingsPage/></PageLayout>
                    </PrivateRoute>
                }
            />

            <Route path="*" element={<ErrorPage code="404" errorKey="not_found"/>}/>

        </Routes>
    )
}

export default App;
