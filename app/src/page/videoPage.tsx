import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Video } from "../api/video";
import { Api } from "../App";
import Header from "../component/header";

const get_url = (key: string) => {
    return `https://${process.env.REACT_APP_S3_bucket}.s3.${process.env.REACT_APP_S3_aws_region}.amazonaws.com/${key}`;
};
interface VideoPageProps {
    user: string | null;
    api: Api;
}
const VideoPage = ({ user, api }: VideoPageProps) => {
    const { key } = useParams();
    const [video, setVideo] = useState<Video | null>(null);
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
    if (!video) {
        return <div>loading</div>;
    }
    return (
        <>
            <Header user={user}></Header>
            <video controls={true}>
                <source src={get_url(video.key)}></source>
            </video>
            {video.status === "uploaded" && <button onClick={extract_feature}>extract_feature</button>}
            {video.status === "end" && <button onClick={extract_feature}>extract!!</button>}
            <div>key: {video.key}</div>
            <div>inserted_time : {video.start_time}</div>
            {video.status === "end" && <div>end_time : {video.end_time}</div>}
        </>
    );
};

export default VideoPage;
