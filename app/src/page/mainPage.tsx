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
            let arr = ret.data
            arr = arr.sort((a: Video, b:Video)=>{
                let a_date_time = a.start_time.split('_')
                let b_date_time = b.start_time.split('_')
                let ax = new Date(`${a_date_time[0].replaceAll('/','-')}T${a_date_time[1]}`)
                let ay = new Date(`${b_date_time[0].replaceAll('/','-')}T${b_date_time[1]}`)
                console.log(ax,ay)
                return ay.getTime()-ax.getTime()
            })
            console.log(arr)
            setVideos(arr);
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
