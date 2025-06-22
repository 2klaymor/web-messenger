import {Navigate} from "react-router-dom";
import {useAuth} from "../contexts/authContext";
import {LoadingScreen} from "../../shared/layout/ui/LoadingScreen";

export default function ProfileSetupRoute({children}) {
    const {user, isLoading} = useAuth();
    if (isLoading) return <LoadingScreen/>;
    if (!user) return <Navigate to="/signin" replace/>;
    if (user.displayName) return <Navigate to="/home" replace/>;
    return children;
}