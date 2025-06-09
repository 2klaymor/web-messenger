import {userExists} from '../api/authService';
import {findUserByUsername, findUserByEmail} from "../api/authService";

// регистрация
export const handleSignUp = (username, email) => {
    const usernameTaken = !!findUserByUsername(username);
    const emailTaken = !!findUserByEmail(email);

    const errors = {};

    if (usernameTaken) errors.username = 'username_taken';
    if (emailTaken) errors.email = 'email_taken';

    if (emailTaken || usernameTaken) {
        return {
            success: false,
            errors
        };
    }

    return {success: true}
}