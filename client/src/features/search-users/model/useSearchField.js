import {useState, useEffect} from 'react';
import {searchUsers} from '../api-search-users'
import {useAuth} from "../../../app/contexts/authContext";

export const useSearchField = () => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const {user: currentUser} = useAuth();

    useEffect(() => {
        const delay = setTimeout(() => {
            if (query.trim()) {
                searchUsers(query.trim())
                    .then(users => setResults(users))
                    .catch(error => {
                        console.error("Ошибка при поиске пользователей:", error);
                        setResults([]);
                    });
            } else {
                setResults([]);
            }
        }, 300);
        return () => clearTimeout(delay);
    }, [query]);

    const handleErase = () => {
        setQuery('');
        setResults([]);
    };

    const [selectedUser, setSelectedUser] = useState(null);

    return {
        query, results, setQuery,
        handleErase,
        currentUser, selectedUser, setSelectedUser,
    };
}

