import {useEffect, useRef} from 'react';
import {useContext} from "react";

import TextareaAutosize from "react-textarea-autosize";
import ContactPlaceholder from "../placeholders/contact";
import MessageSent from "../placeholders/MessageSent";
import MessageReceived from "../placeholders/MessageReceived";

import {LanguageContext, translations} from '../language';
import {ThemeContext, images} from '../theme';


const Home = () => {
    const contacts = [
        {name: 'SHADOW FRIEND', lastMessage: 'Hello'},
        {name: 'kaneki ken.', lastMessage: 'die...die..die'},
        {name: 'roma', lastMessage: ')'},
        {name: 'SHADOW FRIEND', lastMessage: 'Hello'},
        {name: 'kaneki ken.', lastMessage: 'die...die..die'},
        {name: 'roma', lastMessage: ')'},
        {name: 'SHADOW FRIEND', lastMessage: 'Hello'},
        {name: 'kaneki ken.', lastMessage: 'die...die..die'},
        {name: 'roma', lastMessage: ')'},
        {name: 'SHADOW FRIEND', lastMessage: 'Hello'},
        {name: 'kaneki ken.', lastMessage: 'die...die..die'},
        {name: 'roma', lastMessage: ')'}
    ];

    const sentmessages = [
        {contents: 'Привет, как дела?', time: '12:50'},
        {contents: 'Да, я тоже люблю играть в Доту. Какой твой любимый герой?', time: '04:20'},
        {contents: 'Мой любимый герой - Phantom Assassin. Я люблю играть за ассасинов.', time: '20:13'}
        ];

    const receivedmessages = [
        {contents: 'Хорошо, играю в Доту. Ты тоже играешь?', time: '12:50'},
        {contents: 'Мой любимый герой - Anti-Mage. А у тебя?', time: '04:20'},
        {contents: 'Хорошо, я тоже люблю играть за ассасинов. Но Anti-Mage - это что-то особенное. Он такой сильный.', time: '20:13'}
        ];

    const {language} = useContext(LanguageContext);
    const t = translations[language];
    const {theme} = useContext(ThemeContext);
    const chatHistoryRef = useRef(null); // Создаем ссылку на контейнер

    useEffect(() => {
        if (chatHistoryRef.current) {
            chatHistoryRef.current.scrollTop = chatHistoryRef.current.scrollHeight;
        }
    }, []);

    return (
        <div>
            {/* row */}
            <div className="d-flex flex-row">

                {/* contacts */}
                <div className="contacts">
                    {contacts.map((contact, index) => (
                        <ContactPlaceholder key={index} path={"/pfp.png"}
                                            name={contact.name} lastMessage={contact.lastMessage}/>
                    ))}
                </div>

                {/* column */}
                <div className="chat">
                    {/* top bar */}
                    <div className="chat-info">
                        <div>SHADOW FRIEND</div>
                        <div className="online-status">online</div>
                    </div>

                    {/* messages */}
                    <div className="chat-history" ref={chatHistoryRef}>
                        {sentmessages.map((message, index) => (
                            <div key={index}>
                                <MessageSent contents={message.contents} time={message.time}/>
                                {receivedmessages[index] && (
                                    <MessageReceived contents={receivedmessages[index].contents}
                                                     time={receivedmessages[index].time}/>
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
                        <button className="btn" type="button">
                            <img src={images[theme].send}/>
                        </button>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default Home;