// a reusable page layout component
// wraps the main content with a header and a footer

import {useAuth} from "../../../app/contexts/authContext";
import HeaderUser from "./HeaderUser";
import HeaderGuest from "./HeaderGuest";
import Footer from "./Footer";

const PageLayout = ({ withHeader = true, withFooter = true, children }) => {
    const {user} = useAuth();
    const header = user ? <HeaderUser/> : <HeaderGuest/>;

    return (
    <div className="d-column" style={{height: "100vh", width: "100vw", maxWidth: "100vw"}}>
        {withHeader && header}
        <div className="d-flex flex-grow-1 overflow-y-auto">
            {children}
        </div>
        {withFooter && <Footer/>}
    </div>
    )
};

export default PageLayout;