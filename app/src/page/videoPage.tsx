import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { VideoFeature } from "../api/feature";
import { Video } from "../api/video";
import { Api } from "../App";
import Header from "../component/header";
import ImageTable from "../component/imageTable";

interface VideoPageProps {
    user: string | null;
    api: Api;
}

export function emptyCache(){
    if('caches' in window){
    caches.keys().then((names) => {
            // Delete all the cache files
            names.forEach(name => {
                caches.delete(name);
            })
        });

        // Makes sure the page reloads. Changes are only visible after you refresh.
        window.location.reload();
    }
}

const VideoPage = ({ user, api }: VideoPageProps) => {
    const navigate = useNavigate();
    const { key } = useParams();
    const [video, setVideo] = useState<Video | null>(null);
    const [feature, setFeature] = useState<VideoFeature | null>(null);
    const [exist_shorten_video, setExistShortenVideo] = useState<boolean>(false);
    const [checkBoxList, setCheckBoxList] = useState<boolean[]>(Array<boolean>(feature? Object.entries(feature.representing_features).length: 0).fill(false))
    const [shorten_video_check, setShortenVideoCheck] = useState<boolean>(false);
    const extract_feature = async () => {
        if (video) {
            try {
                await api.videoApi.extract_feature({
                    type: "ExtractFeature",
                    key: video.key,
                });
                navigate("/");
            } catch (e) {
                console.log(e);
            }
        }
    };
    const shorten_video = async ()=>{
        if(!video) return;
        if(!feature) return;
        let must_include_feature = []
        console.log(feature.features)
        for(let i = 0;i<checkBoxList.length;i++){
            if(checkBoxList[i]) must_include_feature.push(feature.representing_features[i].name)
        }
        try{
            setShortenVideoCheck(false)
            await api.videoApi.shorten_video({
                type:"ShortenVideo",
                key:video.key,
                must_include_feature: must_include_feature
            })
            setShortenVideoCheck(true)
            navigate("/");
        }
        catch{
            setShortenVideoCheck(false)
        }
    }
    useEffect(() => {
        const f = async () => {
            if (key !== undefined) {
                const ret = await api.videoApi.read_one_video(key);
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
        };
        f();
    }, [api.featureApi, video]);
    useEffect(()=>{
        const f = async()=>{
            if(!video) return;
            try{
                await api.s3Api.get_object('shorten_video', video.key);
                setExistShortenVideo(true)
            }
            catch(e){
                setExistShortenVideo(false);
            }            
        }
        f()
    }, [api.s3Api, video, shorten_video_check])
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
            {video.status === "end" && !exist_shorten_video && <button onClick={shorten_video}>shorten!!</button>}
            <div>key: {video.key}</div>
            <div>inserted_time : {video.start_time}</div>
            {video.status === "end" && <div>end_time : {video.end_time}</div>}
            {feature && <ImageTable videoKey={video.key} features={feature.representing_features} api={api} setCheckBoxList={setCheckBoxList} checkBoxList={checkBoxList} />}
            {exist_shorten_video &&
                <video controls={true}>
                    <source src={api.s3Api.get_url("shorten_video", video.key)} type="video/mp4" ></source>
                    Your Browser Doesn't Support The Video Tag
                </video>
            }
            
        </>
    );
};

export default VideoPage;
