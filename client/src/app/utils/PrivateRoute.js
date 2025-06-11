import { Navigate } from "react-router-dom";
import {useAuth} from "./authContext";

export default function PrivateRoute({children}) {
    const {isAuth} = useAuth();

    if (isAuth === null) {
        return <div>Загрузка...</div>; // пока не известен статус авторизации
    }

    return isAuth ? children : <Navigate to="/signin" replace/>; // replace - записывает в историю браузера
}