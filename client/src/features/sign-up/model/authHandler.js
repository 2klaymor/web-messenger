import {userExists} from '../api/authService';
import {findUserByUsername, findUserByEmail} from "../api/authService";

// вход
export const handleSignIn = (login, password) => {
    const user = userExists(login, password);

    if (user) {
        return {success: true};
    } else {
        return {success: false};
    }
};

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