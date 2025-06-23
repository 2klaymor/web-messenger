export const SearchResult = ({user, onSelect}) => {
    return (
        <div className="search-result" onClick={onSelect}>
            <img className="contact__pfp" src={user.pfp} alt="avatar"/>
            <div className="search-result__info">
                <p className="contact__name">{user.displayName}</p>
                <p>@{user.name}</p>
            </div>
        </div>
    );
}
