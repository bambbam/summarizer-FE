import { AxiosInstance } from "axios";
import client from "./base";
import qs from "qs";

export interface User {
    username: string;
    password: string;
    disabled: boolean;
}

export interface LoginInfo {
    username: string;
    password: string;
}

export type current_user = string;
class UserApi {
    client: AxiosInstance;
    prefix: string;
    constructor(client: AxiosInstance) {
        this.client = client;
        this.prefix = "/user";
    }
    create_user(user: User) {
        return client.post(this.prefix + "/signup", user);
    }
    login(loginInfo: LoginInfo) {
        const data = qs.stringify(loginInfo);
        const ret = client.post(this.prefix + "/login", data, {
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
        });
        return ret;
    }
    read_root() {
        return client.get(this.prefix);
    }
}

export default UserApi;
