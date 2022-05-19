import { AxiosInstance } from "axios";
import client from "./base";

export interface Video {
    key: string;
    user_name: string;
    url: string;
    status: string;
    start_time: string;
    end_time?: string;
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
}

export default VideoApi;
