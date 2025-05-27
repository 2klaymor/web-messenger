// a reusable page layout component
// wraps the main content with a header and footer
import Footer from "./Footer";

const PageLayout = ({ components: [header, content] }) => {
    return (
        <div className="d-column" style={{height: "100vh", maxHeight: "100vh", width: "100vw", maxWidth: "100vw"}}>
            {header}
            <div className="d-flex flex-grow-1 overflow-y-auto">
                {content}
            </div>
            <div className="mt-auto">
                <Footer/>
            </div>
        </div>
    )
};

export default PageLayout;