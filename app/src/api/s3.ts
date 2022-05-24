import { S3 } from "aws-sdk";

class S3Api {
    s3: S3;
    bucket_name: string;
    constructor(bucket_name: string) {
        this.s3 = new S3({
            apiVersion: process.env.REACT_APP_S3_aws_apiVersion,
            region: process.env.REACT_APP_S3_aws_region,
            credentials: {
                accessKeyId: process.env.REACT_APP_S3_aws_access_key_id as string,
                secretAccessKey: process.env.REACT_APP_S3_aws_secret_access_key as string,
            },
        });
        this.bucket_name = bucket_name;
    }
    get_object(key: string) {
        return this.s3.getObject({
            Bucket: this.bucket_name,
            Key: key,
        });
    }
    upload_object(key: string, file: File) {
        try {
            return this.s3
                .upload({
                    Bucket: this.bucket_name,
                    Key: key,
                    Body: file,
                })
                .promise();
        } catch (e) {
            console.log(e);
        }
    }
}

export default S3Api;
