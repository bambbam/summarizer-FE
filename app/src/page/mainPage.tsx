import React, { useEffect, useState } from "react";
import { Video } from "../api/video";
import { Api } from "../App";
import Header from "../component/header";
import QueueTable from "../component/queueTable";

interface MainPageProps {
    user: string | null;
    api: Api;
}

const MainPage = ({ user, api }: MainPageProps) => {
    const [videos, setVideos] = useState<Video[]>([]);
    useEffect(() => {
        async function read_videos() {
            const ret = await api.videoApi.read_all_videos();
            setVideos(ret.data);
        }
        read_videos();
    }, [api.videoApi]);

    return (
        <>
            <Header user={user}></Header>
            <QueueTable videos={videos}></QueueTable>
        </>
    );
};

export default MainPage;
