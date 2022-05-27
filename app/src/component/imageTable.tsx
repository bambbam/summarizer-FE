import React, { useMemo } from "react";
import { FrameFeature } from "../api/feature";
import { Api } from "../App";
import "./table.scss";
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
        <div className="image_table">
            {featureList.map((value) => {
                return (
                    <div className="image_table_item">
                        <img className="image_table_item_img" src={api.s3Api.get_url(`img/${videoKey}`, value[0])} alt="img"></img>
                        <div>{value[0]}</div>
                    </div>
                );
            })}
        </div>
    );
};

export default ImageTable;
