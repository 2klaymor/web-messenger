import TextareaAutosize from "react-textarea-autosize";

import ContactPlaceholder from "../placeholders/contact";

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
                        <span>SHADOW FIEND</span><span> • </span><span className="online-status">online</span>
                    </div>

                    {/* messages */}
                    <div className="chat-history">321</div>

                    {/* input */}
                    <div className="chat-input">
                        <input type="file" id="file-input" title=" "/>
                        <TextareaAutosize/>
                        <button className="btn" type="button">
                            <img src="/send.png"/>
                        </button>

                    </div>
                </div>
            </div>

        </div>
    );
}

export default Home;