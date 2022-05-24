import React, { useMemo } from "react";
import { FrameFeature } from "../api/feature";
import { Api } from "../App";

interface props {
    videoKey: string;
    features: { [key: string]: FrameFeature };
    api: Api;
}

const ImageTable = ({ videoKey, features, api }: props) => {
    const featureList = useMemo(() => {
        return Object.entries(features);
    }, [features]);
    console.log(videoKey);
    return (
        <>
            {featureList.map((value) => {
                return (
                    <>
                        <img src={api.s3Api.get_url(`img/${videoKey}`, value[0])} alt="img"></img>
                        <div>{value[0]}</div>
                    </>
                );
            })}
        </>
    );
};

export default ImageTable;
