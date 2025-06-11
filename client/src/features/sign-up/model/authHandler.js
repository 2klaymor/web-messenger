import {userExists} from '../api/api-sign-up';
import {findUserByUsername, findUserByEmail} from "../api/api-sign-up";

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