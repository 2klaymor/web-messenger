import {useEffect, useRef, useContext} from 'react';

import {LanguageContext, translations} from '../utils/language';
import {ThemeContext, images} from '../utils/theme';

import TextareaAutosize from "react-textarea-autosize";
import ContactPlaceholder from "../features/chat/contact";
import MessageSent from "../features/chat/MessageSent";
import MessageReceived from "../features/chat/MessageReceived";

import {mockContacts, mockMessages} from '../mocks/mockData'

const Home = () => {

    const {language} = useContext(LanguageContext);
    const t = translations[language];
    const {theme} = useContext(ThemeContext);
    const chatHistoryRef = useRef(null);

    useEffect(() => {
        if (chatHistoryRef.current) {
            chatHistoryRef.current.scrollTop = chatHistoryRef.current.scrollHeight;
        }
    }, []);

    return (
        <div className="home">

            {/* contacts */}
            <div className="contacts">
                {mockContacts.map((contact, index) => (
                    <ContactPlaceholder key={index} path={"/pfp.png"}
                                        name={contact.name} lastMessage={contact.lastMessage}/>
                ))}
            </div>

            {/* chat */}
            <div className="chat">
                {/* top bar */}
                <div className="chat-info">
                    <div className="name">shadow friend</div>
                    <div className="online-status">online</div>
                </div>

                {/* messages */}
                <div className="chat-history" ref={chatHistoryRef}>
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
                <div className="chat-input">
                    <label htmlFor="file-input">
                        <img src={images[theme].attach}/>
                        <input type="file" id="file-input" />
                    </label>

                    <TextareaAutosize placeholder={t.start_typing}/>
                    <img src={images[theme].send}/>
                </div>
            </div>
        </div>
    )
}

export default Home;