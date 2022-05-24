import React, { useRef } from "react";

interface FileUploaderProps {
    handleFile: (file: File | undefined) => void;
}

const FileUploader = ({ handleFile }: FileUploaderProps) => {
    const hiddenFileInput = useRef<HTMLInputElement>(null);
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const fileUploaded = e.target.files?.[0];
        handleFile(fileUploaded);
    };
    const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        if (hiddenFileInput.current) {
            hiddenFileInput.current.click();
        }
    };
    return (
        <>
            <button onClick={handleClick}>upload</button>
            <input type="file" ref={hiddenFileInput} style={{ display: "none" }} onChange={handleChange} />
        </>
    );
};

export default FileUploader;
