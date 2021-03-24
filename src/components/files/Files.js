import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/UserContext";
import { getFilesFromServer } from "../../server/files";
import File from "./File";
import UploadFile from "./UploadFile";

const Files = () => {
    const { userState } = useContext(UserContext);
    const [files, setFiles] = useState([]);

    useEffect(() => {
        getFilesFromServer(userState.token)
            .then((data) => {
                setFiles(data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);
    return (
        <>
            <UploadFile setFiles={setFiles} />
            <div className="files-container">
                {files.length > 0 ? (
                    files.map((file) => (
                        <File key={file._id} file={file} setFiles={setFiles} />
                    ))
                ) : (
                    <div>No Files in your account!</div>
                )}
            </div>
        </>
    );
};

export default Files;
