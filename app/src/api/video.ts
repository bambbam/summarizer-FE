import { AxiosInstance } from "axios";
import client from "./base";

export interface Video {
    key: string;
    user_name: string;
    status: string;
    start_time: string;
    end_time?: string;
}

export interface UploadVideo {
    key: string;
}

export interface ExtractFeature {
    type: "ExtractFeature";
    key: string;
}
class VideoApi {
    client: AxiosInstance;
    prefix: string;
    constructor(client: AxiosInstance) {
        this.client = client;
        this.prefix = "/video";
    }
    read_all_videos() {
        return client.get(this.prefix + "/");
    }
    read_one_video(key: string) {
        return client.get(this.prefix + `/${key}`);
    }
    upload_video(data: UploadVideo) {
        return client.post(this.prefix + "/upload", data);
    }
    extract_feature(command: ExtractFeature) {
        return client.post(this.prefix + "/extract", command);
    }
}

export default VideoApi;
