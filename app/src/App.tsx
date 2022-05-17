import React from "react";
import logo from "./logo.svg";
import "./App.css";
import LoginPage from "./page/loginPage";
import UserApi from "./api/user";
import client from "./api/base";

function App() {
    const api = new UserApi(client);
    return <LoginPage api={api} />;
}

export default App;
