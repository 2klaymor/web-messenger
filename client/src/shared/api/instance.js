import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

export const api = axios.create({
    baseURL: API_URL,
    withCredentials: true,
});

api.interceptors.request.use(config => {
    const token = localStorage.getItem("accessToken");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

api.interceptors.response.use(
    response => response,
    error => Promise.reject(error)
);

// // добавление токена в заголовок
// api.interceptors.request.use(config => {
//     const token = localStorage.getItem("accessToken");
//     if (token && config.headers) {
//         config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
// });

// обработка 401
// api.interceptors.response.use(
//     response => response,
//     async error => {
//         const originalRequest = error.config;
//
//         const isAuthRequest =
//             originalRequest.url?.includes("/auth/login") ||
//             originalRequest.url?.includes("/auth/signup");
//
//         // если это попытка войти/зарегистрироваться - не трогаем
//         if (isAuthRequest) {
//             return Promise.reject(error);
//         }



        // // не трогаем запрос на рефреш
        // if (
        //     error.response?.status === 401 &&
        //     originalRequest.url?.includes("/auth/refresh")
        // ) {
        //     return Promise.reject(error);
        // }


        // если accessToken истёк, пробуем рефреш
//         const token = localStorage.getItem("accessToken");
//         if (error.response?.status === 401 && !originalRequest._retry && token) {
//             originalRequest._retry = true;
//
//             try {
//                 const {data: newAccessToken} = await api.post("/auth/refresh");
//                 localStorage.setItem("accessToken", newAccessToken);
//                 originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
//                 return api.request(originalRequest);
//             } catch (refreshError) {
//                 // токен не восстановился — чистим и редиректим
//                 localStorage.removeItem("accessToken");
//                 return Promise.reject(refreshError);
//             }
//         }
//
//         return Promise.reject(error);
//
//     }
// );