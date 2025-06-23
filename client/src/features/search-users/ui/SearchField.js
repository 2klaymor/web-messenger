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
        query, setQuery,
        searchResults, handleErase,
        selectedUser, setSelectedUser, handleResultClick,
    } = useSearchField();

    return (
        <div className="search-field">
            {/* search field */}
            <div className="search-field__input-wrapper">
                <input type="text"
                       value={query}
                       onChange={e => setQuery(e.target.value)}
                       placeholder={`${t.fields.search}...`}
                />
                <Button className="search-field__close button_no-style"
                        type="button"
                        onClick={handleErase}
                >
                    <img src={images[theme].close} alt="close"/>
                </Button>
            </div>

            {/* search results */}
            {searchResults.length > 0 && (
                <div className="search-field__results">
                    {searchResults.map(user => (
                        <SearchResult
                            key={user.id}
                            user={user}
                            onSelect={() => handleResultClick(user)}
                        />
                    ))}
                </div>
            )}

            {/* profile modal */}
            {selectedUser && (
                <ProfileModal
                    userType="other"
                    user={selectedUser}
                    onClose={() => setSelectedUser(null)}
                />
            )}
        </div>
    );
}