import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { VideoFeature } from "../api/feature";
import { Video } from "../api/video";
import { Api } from "../App";
import Header from "../component/header";
import ImageTable from "../component/imageTable";

interface VideoPageProps {
    user: string | null;
    api: Api;
}
const VideoPage = ({ user, api }: VideoPageProps) => {
    const { key } = useParams();
    const [video, setVideo] = useState<Video | null>(null);
    const [feature, setFeature] = useState<VideoFeature | null>(null);
    const extract_feature = async () => {
        if (video) {
            try {
                await api.videoApi.extract_feature({
                    type: "ExtractFeature",
                    key: video.key,
                });
            } catch (e) {
                console.log(e);
            }
        }
    };
    useEffect(() => {
        const f = async () => {
            if (key !== undefined) {
                const ret = await api.videoApi.read_one_video(key);
                console.log(ret, key);
                setVideo(ret.data);
            }
        };
        f();
    }, [api.videoApi, key]);
    useEffect(() => {
        const f = async () => {
            if (!video) return;
            if (video.status !== "end") return;
            const ret = await api.featureApi.get_video_feature(video.key);
            setFeature(ret.data);
            console.log(ret.data);
        };
        f();
    }, [api.featureApi, video]);
    if (!video) {
        return <div>loading</div>;
    }
    return (
        <>
            <Header user={user}></Header>
            <video controls={true}>
                <source src={api.s3Api.get_url("video", video.key)}></source>
            </video>
            {video.status === "uploaded" && <button onClick={extract_feature}>extract_feature</button>}
            {video.status === "end" && <button onClick={extract_feature}>extract!!</button>}
            <div>key: {video.key}</div>
            <div>inserted_time : {video.start_time}</div>
            {video.status === "end" && <div>end_time : {video.end_time}</div>}
            {feature && <ImageTable videoKey={video.key} features={feature.representing_features} api={api} />}
        </>
    );
};

export default VideoPage;
