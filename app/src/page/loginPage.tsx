import React, { useEffect, useState } from "react";
import UserApi, { LoginInfo } from "../api/user";

interface LoginPageProp {
    api: UserApi;
}

const LoginPage = ({ api }: LoginPageProp) => {
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [user, setUser] = useState(null);

    const onInputChange = (e: React.ChangeEvent<HTMLInputElement>, hook: React.Dispatch<React.SetStateAction<string>>) => {
        hook(e.target.value);
    };

    const onLogin = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        api.login({
            username,
            password,
        });
    };
    useEffect(() => {
        const f = async () => {
            const ret = await api.read_root();
            setUser(user);
        };
        f();
    });
    return (
        <div>
            <form onSubmit={onLogin}>
                <input onChange={(e) => onInputChange(e, setUsername)} />
                <input onChange={(e) => onInputChange(e, setPassword)} type="password" />
                <button type="submit">로그인</button>
            </form>
            {user ? <>user</> : ""}
        </div>
    );
};

export default LoginPage;
