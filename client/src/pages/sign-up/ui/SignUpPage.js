import {useContext} from "react";
import {images, ThemeContext} from "../../../app/contexts/themeContext";
import SignUpForm from "../../../features/sign-up/ui/SignUpForm";
// import EmailVerificationModal from "../../features/sign-up/ui/EmailVerificationModal";

export default function SignUpPage() {
    const {theme} = useContext(ThemeContext);

    return (
        <div className="signup">

            {/* row element 1 */}
            {/*<img className="" } alt="logo"/>*/}

            {/* row element 2 */}
            <img className="signup__logo" src={images[theme].signup_bg}/>
            <SignUpForm/>
            <img className="signup__logo" src={images[theme].signup_bg}/>


            {/*{showVerification && <EmailVerificationModal*/}
            {/*    email={userData.email}*/}
            {/*    onClose={() => setShowVerification(false)}/>}*/}
        </div>
    )
}