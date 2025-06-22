import ChatWindow from "../../../widgets/chat-window/ui/ChatWindow";
import ContactList from "../../../widgets/contact-list/ui/ContactList";

const HomePage = () => {
    return (
        <div className="home">
            <ContactList/>
            <ChatWindow/>
        </div>
    )
}

export default HomePage;