import { AxiosInstance } from "axios";

export interface FrameFeature {
    current_frame: number;
    name: string;
    box_points: number[];
}

export interface VideoFeature {
    key: string;
    features: FrameFeature[];
    representing_features: { [key: string]: FrameFeature };
}

class FeatureApi {
    client: AxiosInstance;
    prefix: string;
    constructor(client: AxiosInstance) {
        this.client = client;
        this.prefix = "/feature";
    }
    get_video_feature(key: string) {
        return this.client.get(this.prefix + "/" + key);
    }
}

export default FeatureApi;
