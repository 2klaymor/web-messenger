import React from 'react';
import {Navigate} from 'react-router-dom';
import {useAuth} from "./authContext";

/**
 * Если пользователь НЕ залогинен —
 *   показываем переданный маршрут (signin/signup/start),
 * иначе — редирект на /home
 */
export default function PublicRoute({children}) {
    const {isAuth} = useAuth();
    return !isAuth
        ? children
        : <Navigate to="/home" replace/>;
}