// a reusable page layout component
// wraps the main content with a header and footer
import Footer from "../layout/Footer";

const Page = ({ components: [header, content] }) => {
    return (
        <div className="d-flex flex-column min-vh-100">
            {header}
            <div className="flex-grow-1" style={{marginTop: '60px'}}>
                {content}
            </div>
            <div className="mt-auto">
                <Footer/>
            </div>
        </div>
    )
}

export default Page;