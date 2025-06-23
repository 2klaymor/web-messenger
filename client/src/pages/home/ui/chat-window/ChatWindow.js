import {ChatHeader} from "./ChatHeader";
import {ChatHistory} from "../../../../features/chat-history/ui/ChatHistory";
import {ChatInput} from "../../../../features/send-message/ui/ChatInput";

const ChatWindow = () => {
    return (
        <div className="chat">
            <ChatHeader/>
            <ChatHistory/>
            <ChatInput/>
        </div>
    )

}

export default ChatWindow;