import React, { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import { deleteFileFromServer, getFilesFromServer } from "../../server/files";

const url = process.env.REACT_APP_SERVER_URL;

const File = ({ file, setFiles }) => {
    const { userState } = useContext(UserContext);
    const imgTypes = /\.(jpeg|jpg|png)/;

    const onDeleteClick = (e) => {
        deleteFileFromServer(userState.token, file._id, file.key)
            .then(() => {
                return getFilesFromServer(userState.token);
            })
            .then((files) => {
                setFiles(files);
                alert(`${file.originalName} was deleted successfuly!!`);
            })
            .catch((err) => {
                console.log(err.message);
            });
    };

    return (
        <div>
            <a
                href={`${url}/get-file?key=${file.key}&name=${file.originalName}&token=${userState.token}`}
            >
                {imgTypes.test(file.originalName) ? (
                    <img
                        src={`${url}/get-file?key=${file.key}&name=${file.originalName}&token=${userState.token}`}
                        alt={file.originalName}
                    />
                ) : (
                    <>
                        {file.originalName.split(".")[1] === "pdf" ? (
                            <img
                                src="https://play-lh.googleusercontent.com/9XKD5S7rwQ6FiPXSyp9SzLXfIue88ntf9sJ9K250IuHTL7pmn2-ZB0sngAX4A2Bw4w"
                                alt={file.originalName}
                            />
                        ) : (
                            <img
                                src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/fb/.docx_icon.svg/1200px-.docx_icon.svg.png"
                                alt={file.originalName}
                            />
                        )}
                    </>
                )}
                <p>{file.originalName}</p>
            </a>
            <button className="delete-button" onClick={onDeleteClick}>
                X
            </button>
        </div>
    );
};

export default File;
