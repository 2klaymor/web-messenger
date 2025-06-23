import {useContext} from "react";
import {translations, LanguageContext} from "../../../app/contexts/languageContext";
import {images, ThemeContext} from "../../../app/contexts/themeContext";
import {useSearchField} from "../model/useSearchField";
import {SearchResult} from "./SearchResult";
import ProfileModal from "../../../widgets/profile-modal/ProfileModal";
import Button from "../../../shared/ui/Button";

export default function SearchField() {
    const {language} = useContext(LanguageContext);
    const t = translations[language];
    const {theme} = useContext(ThemeContext);

    const {
        query, results, setQuery,
        handleErase,
        currentUser, selectedUser, setSelectedUser,
    } = useSearchField();

    return (
        <div className="search-field">
            <div className="search-field__input-wrapper">
                <input type="text"
                       value={query}
                       onChange={e => setQuery(e.target.value)}
                       placeholder={`${t.fields.search}...`}/>

                <Button className="search-field__close button_no-style" type="button">
                    <img src={images[theme].close}
                         onClick={handleErase}
                         alt="close"/>
                </Button>
            </div>

            {results.length > 0 && (
                <div className="search-field__results">
                    {results.map(user => (
                        <SearchResult
                            key={user.id}
                            user={user}
                            onSelect={() => {
                                const type = user.name === currentUser.name ? "me" : "contact";
                                setSelectedUser({userInfo: user, type});
                            }}
                        />
                    ))}
                </div>
            )}
            {selectedUser && (
                <ProfileModal
                    userType={selectedUser.type}
                    userInfo={selectedUser.userInfo}
                    onClose={() => setSelectedUser(null)}
                />
            )}

        </div>
    );
}