import {mockMessages} from "../../../mocks/mockData";
import { MessageSent, MessageReceived,} from "./Message";
import {images, ThemeContext} from "../../../app/contexts/themeContext";
import TextareaAutosize from "react-textarea-autosize";
import {useContext, useEffect, useRef} from "react";
import {LanguageContext, translations} from "../../../app/contexts/languageContext";

const ChatWindow = () => {
    const {theme} = useContext(ThemeContext);
    const {language} = useContext(LanguageContext);
    const t = translations[language];

    const chatHistoryRef = useRef(null);

    useEffect(() => {
        if (chatHistoryRef.current) {
            chatHistoryRef.current.scrollTop = chatHistoryRef.current.scrollHeight;
        }
    }, []);

    return (
        <div className="chat">
            {/* top bar */}
            <div className="chat__info">
                <div className="name">shadow friend</div>
                <div className="online-status">online</div>
            </div>

            {/* messages */}
            <div className="chat__history" ref={chatHistoryRef}>
                {mockMessages.map((message, index) => (
                    <div key={index}>
                        {message.sender === 'me' ? (
                            <MessageSent contents={message.contents} time={message.time}/>
                        ) : (
                            <MessageReceived contents={message.contents} time={message.time}/>
                        )}
                    </div>
                ))}
            </div>

            {/* input */}
            <div className="chat__input">
                <label htmlFor="file-input">
                    <img src={images[theme].attach}/>
                    <input type="file" id="file-input"/>
                </label>

                <TextareaAutosize placeholder={t.home.chat.textarea_placeholder}/>
                <img src={images[theme].send}/>
            </div>
        </div>
    )

}

export default ChatWindow;