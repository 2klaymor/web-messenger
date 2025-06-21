import {createContext, useContext, useState, useEffect} from 'react';
import {getUserMe} from '../../entities/user/api-user-entity';
const AuthContext = createContext(null);

export function AuthProvider({children}) {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const signOut = (shouldRedirect = true) => {
        setIsLoading(true);
        localStorage.removeItem("accessToken");
        setUser(null);
        if (shouldRedirect) {
            window.location.href = "/signin";
        } else {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        const loadUser = async () => {
            try {
                const data = await getUserMe();
                setUser(data);
            } catch (e) {
                signOut(false);
            } finally {
                setIsLoading(false);
            }
        };
        loadUser();
    }, []);

    return (
        <AuthContext.Provider value={{user, setUser, isLoading, signOut}}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);