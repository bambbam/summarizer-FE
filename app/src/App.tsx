import React, { useEffect, useMemo, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import LoginPage from "./page/loginPage";
import UserApi from "./api/user";
import S3Api from "./api/s3";
import client from "./api/base";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainPage from "./page/mainPage";
import VideoPage from "./page/videoPage";
import VideoApi from "./api/video";
import VideoUploadPage from "./page/videoUploadPage";
import FeatureApi from "./api/feature";

const get_apis = () => {
    let ret = {
        userapi: new UserApi(client),
        videoApi: new VideoApi(client),
        s3Api: new S3Api(process.env.REACT_APP_S3_bucket as string),
        featureApi: new FeatureApi(client),
    };
    return ret;
};
export type Api = ReturnType<typeof get_apis>;

function App() {
    const Apis = useMemo(() => get_apis(), []);
    const [user, setUser] = useState<string | null>(null);
    useEffect(() => {
        async function f() {
            try {
                const ret = await Apis.userapi.read_root();
                setUser(ret.data.user);
            } catch {
                setUser(null);
            }
        }
        f();
    }, [Apis.userapi]);
    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<MainPage api={Apis} user={user} />} />
                    <Route path="/login" element={<LoginPage api={Apis} user={user} setUser={setUser} />} />
                    <Route path="/video/:key" element={<VideoPage user={user} api={Apis} />} />
                    <Route path="/upload" element={<VideoUploadPage api={Apis} />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
