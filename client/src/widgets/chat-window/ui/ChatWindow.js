import {useContext, useEffect, useRef} from "react";
import {LanguageContext, translations} from "../../../app/contexts/languageContext";
import {images, ThemeContext} from "../../../app/contexts/themeContext";
import {mockMessages} from "../../../mocks/mockData";
import { MessageSent, MessageReceived,} from "./Message";
import TextareaAutosize from "react-textarea-autosize";

// переместить!
import SvgHeader from "./SvgHeader";

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
            <div className="chat__header">
                <SvgHeader/>
                <div className="chat__recipient-info">
                    <div className="chat__recipient-name">shadow friend</div>
                    <div className="chat__recipient-status">online</div>
                </div>
            </div>

            {/* messages */}
            <div className="chat__history" ref={chatHistoryRef}>

                {/*to be changed*/}
                {[...mockMessages].reverse().map((message, index) => {
                    return message.sender === 'me' ? (
                        <MessageSent
                            key={index}
                            contents={message.contents}
                            time={message.time}
                        />
                    ) : (
                        <MessageReceived
                            key={index}
                            contents={message.contents}
                            time={message.time}
                        />
                    );
                })}

            </div>

            {/* input */}
            <div className="chat__input">
                <label htmlFor="file-input">
                    <img src={images[theme].attach} alt="attach"/>
                    <input type="file" id="file-input" hidden/>
                </label>

                <TextareaAutosize placeholder={t.home.chat.textarea_placeholder}/>
                <img src={images[theme].send} alt="send"/>
            </div>
        </div>
    )

}

export default ChatWindow;