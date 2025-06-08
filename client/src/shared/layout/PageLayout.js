// a reusable page layout component
// wraps the main content with a header and a footer

const PageLayout = ({ components: [header, content, footer] }) => {
    return (
        // <div className="d-column" style={{height: "100vh", width: "100vw", maxWidth: "100vw"}}>
        <div className="d-column" style={{height: "100vh", width: "100vw", maxWidth: "100vw"}}>
            {header}
            <div className="d-flex flex-grow-1 overflow-y-auto">
                {content}
            </div>
            {footer}
        </div>
    )
};

export default PageLayout;