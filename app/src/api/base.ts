import axios from "axios";

const client = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
    withCredentials: true,
});

export const setAuthorizationToken = (token: string | null) => {
    if (token) {
        client.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
        delete client.defaults.headers.common["Authorization"];
    }
};

export default client;
