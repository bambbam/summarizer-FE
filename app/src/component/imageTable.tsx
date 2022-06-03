import React, { useMemo, useState } from "react";
import { FrameFeature } from "../api/feature";
import { Api } from "../App";
import "./table.scss";
interface props {
    videoKey: string;
    features: { [key: string]: FrameFeature };
    api: Api;
    checkBoxList: boolean[]
    setCheckBoxList: React.Dispatch<React.SetStateAction<boolean[]>>
}

const ImageTable = ({ videoKey, features, api, checkBoxList, setCheckBoxList }: props) => {
    const featureList = useMemo(() => {
        return Object.entries(features);
    }, [features]);
    const onClickCheckBox = (idx : number)=>{
        setCheckBoxList((prevList)=>{
            const now = [...prevList]
            now[idx] = !now[idx]
            return now
        })
    }
    console.log(videoKey);
    return (
        <div className="image_table">
            {featureList.map((value, idx) => {
                return (
                    <div className="image_table_item" key={value[0]} onClick={()=>{onClickCheckBox(idx)}}>
                        <img className="image_table_item_img" src={api.s3Api.get_url(`img/${videoKey}`, value[0])} alt="img"></img>
                        <div className="image_table_item_values">
                            {value[0]}
                        </div>
                        {
                            checkBoxList[idx]?
                            <div className="image_table_check_box filled" />:
                            <div className="image_table_check_box" />
                        }
                    </div>
                );
            })}
        </div>
    );
};

export default ImageTable;
