import {images} from "../../../app/contexts/themeContext";

export const SearchResult = ({user, onSelect}) => {
    return (
        <div className="search-result" onClick={onSelect}>
            <img className="contact__pfp" src={user.pfp || images.static.pfp_placeholder} alt="avatar"/>
            <div className="search-result__info">
                <p className="contact__name">{user.displayName}</p>
                <p>@{user.name}</p>
            </div>
        </div>
    );
}
