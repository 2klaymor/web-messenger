import {useAuth} from "../contexts/authContext";
import {LoadingScreen} from "../../shared/layout/ui/LoadingScreen";
import ErrorPage from "../../shared/layout/ui/ErrorPage";

export default function PrivateRoute({children}) {
    const {user, isLoading} = useAuth();

    if (isLoading) return <LoadingScreen/>;
    if (!user)
        return (
            <ErrorPage code={403} errorKey="access_denied"/>
        );
    return children;
}