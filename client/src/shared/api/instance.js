import axios from "axios";

const host = window.location.hostname;
export const api = axios.create({
    baseURL: `http://${host}:3001/api/v1`,
    headers: {'Content-Type': 'application/json'},
    timeout: 5000,
});