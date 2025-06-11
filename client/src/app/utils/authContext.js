import {createContext, useContext, useState, useEffect, useCallback} from 'react';
import {api} from '../../shared/api/instance';
import {signOut} from '../../features/sign-out/api-sign-out';

const AuthContext = createContext(null)

export function AuthProvider({children}) {
    const [isAuth, setIsAuth] = useState(null);

    useEffect(() => {
        async function checkAuth() {
            const token = localStorage.getItem('accessToken');
            if (!token) {
                setIsAuth(false);
                return;
            }

            try {
                await api.post('/auth/refresh'); // заглушка. сделать users/me
                setIsAuth(true);
            } catch (e) {
                setIsAuth(false);
                signOut(false); // очищаем локальное хранилище, но не редиректим
            }
        }

        checkAuth();
    }, []);

    const updateIsAuth = (value) => {
        setIsAuth(value);
    };

    return (
        <AuthContext.Provider value={{isAuth, updateIsAuth}}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);