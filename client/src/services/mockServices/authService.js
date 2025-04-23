import {mockUsers} from '../../mocks/mockUsers';

// авторизация
export const userExists = (login, password) => {
    login = login.toLowerCase();
    return mockUsers.find(user =>
        (user.email.toLowerCase() === login || user.name.toLowerCase() === login)
        && user.passwordHash === password);
};

// проверка занятости юзернейма
export const findUserByUsername = (username) => {
    return mockUsers.find(user =>
        user.name.toLowerCase() === username.toLowerCase());
}

// проверка занятости e-mail
export const findUserByEmail = (email) => {
    return mockUsers.find(user =>
        user.email.toLowerCase() === email.toLowerCase());
}
