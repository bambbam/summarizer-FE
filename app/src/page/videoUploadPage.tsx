import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { v4 } from "uuid";
import { Api } from "../App";
import FileUploader from "../component/fileUploader";

interface VideoUploadPageProps {
    api: Api;
}

const VideoUploadPage = ({ api }: VideoUploadPageProps) => {
    const navigate = useNavigate();
    const [video, setVideoFile] = useState<string>("");
    const handleFile = async (file: File | undefined) => {
        if (file !== undefined) {
            const src = URL.createObjectURL(file);
            const key = v4() + ".mp4";
            await api.s3Api.upload_object("video", key, file);
            setVideoFile(src);
            await api.videoApi.upload_video({
                key: key,
            });
            navigate("/");
        }
    };
    return (
        <>
            <FileUploader handleFile={handleFile} />
            {video !== "" && (
                <video controls={true}>
                    <source src={video} id="video" type="video/mp4" />
                </video>
            )}
        </>
    );
};

export default VideoUploadPage;
