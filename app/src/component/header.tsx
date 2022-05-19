import { Button } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { setAuthorizationToken } from "../api/base";
import { current_user } from "../api/user";
import "./header.scss";

interface HeaderProps {
    user: current_user | null;
}

const LogoutArea = ({ username }: { username: string }) => {
    const logout = () => {
        localStorage.removeItem("access_token");
        setAuthorizationToken(null);
        window.location.href = "/";
    };
    return (
        <div className="navbar__right">
            <div className="navbar__right__username">{username}</div>
            <Button>upload</Button>
            <Button onClick={logout}>logout</Button>
        </div>
    );
};

const Header = (props: HeaderProps) => {
    const navigate = useNavigate();
    return (
        <nav className="navbar">
            <div className="navbar__logo">Summarizer</div>
            <div>
                {props.user == null ? (
                    <Button
                        onClick={() => {
                            navigate("/login");
                        }}
                    >
                        login
                    </Button>
                ) : (
                    <LogoutArea username={props.user}></LogoutArea>
                )}
            </div>
        </nav>
    );
};

export default Header;
