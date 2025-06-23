import {useContext} from "react";
import {translations, LanguageContext} from "../../../app/contexts/languageContext";
import {images, ThemeContext} from "../../../app/contexts/themeContext";
import {useSelectedContact} from "../../../entities/contacts/useSelectedContact";
import {useChatInput} from "../model/useChatInput";
import TextareaAutosize from "react-textarea-autosize";

export const ChatInput= () => {
    const {language} = useContext(LanguageContext);
    const t = translations[language];
    const {theme} = useContext(ThemeContext);
    const {selectedContact} = useSelectedContact();
    const {text, setText, handleKeyDown, sendMessage} = useChatInput();

    return (
        <div className="chat__input">
            {selectedContact ? (
                <>
                    <label htmlFor="file-input">
                        <img src={images[theme].attach} alt="attach"/>
                        <input type="file" id="file-input" hidden/>
                    </label>

                    <TextareaAutosize
                        value={text}
                        onChange={e => setText(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder={t.home.chat.textarea_placeholder}
                    />
                    <img
                        onClick={sendMessage}
                        src={images[theme].send}
                        alt="send"/>
                </>
            ) : (
                <div></div>
            )}
        </div>
)
}