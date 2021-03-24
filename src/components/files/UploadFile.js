import React, { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import { getFilesFromServer, uploadFileToServer } from "../../server/files";

const UploadFile = ({ setFiles }) => {
    const { userState } = useContext(UserContext);

    const onSubmitFile = (event) => {
        event.preventDefault();
        const image = event.target.children[0].files[0];
        if (!image) return;
        const formData = new FormData();
        formData.append("file", image);
        uploadFileToServer(formData, userState.token)
            .then((data) => {
                return getFilesFromServer(userState.token);
            })
            .then((Files) => {
                setFiles(Files);
            })
            .catch((err) => {
                alert(err.message);
            });
    };
    return (
        <form onSubmit={onSubmitFile} className="upload-file">
            <input className="input upload-input" type="file" />
            <button className="button" type="submit">
                Upload
            </button>
        </form>
    );
};

export default UploadFile;
