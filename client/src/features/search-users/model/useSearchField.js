import {useState, useEffect} from 'react';
import {searchUsers} from '../api-search-users'
import {getUserPublicData} from "../../../entities/user/api-get-user-public-data";
import {useAuth} from "../../../app/contexts/authContext";

export const useSearchField = () => {
    const [query, setQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const {user: currentUser} = useAuth();
    const [selectedUser, setSelectedUser] = useState(null);

    useEffect(() => {
        if (!query.trim()) {
            setSearchResults([]);
            return;
        }

        const delay = setTimeout(() => {
            searchUsers(query.trim())
                .then(setSearchResults)
                .catch((err) => {
                    console.error("error searching users", err);
                    setSearchResults([]);
                });
        }, 300);

        return () => clearTimeout(delay);
    }, [query]);

    const handleErase = () => {
        setQuery('');
        setSearchResults([]);
    };

    const handleResultClick = async (user) => {
        const fullUser = await getUserPublicData(user.name);
        setSelectedUser(fullUser);
        console.log(fullUser);
    }

    return {
        query, setQuery,
        searchResults, handleErase,
        selectedUser, setSelectedUser, handleResultClick,
    };
}

