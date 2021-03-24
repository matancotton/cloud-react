import Axios from "axios";

const url = process.env.REACT_APP_SERVER_URL;

export const uploadFileToServer = async (formData, token) => {
    try {
        const result = await Axios.post(url + "/upload-file", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${token}`,
            },
        });

        return result.data;
    } catch (err) {
        throw new Error(err.response.data.error);
    }
};

export const getFilesFromServer = async (token) => {
    try {
        const result = await Axios.get(url + "/get-files", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return result.data;
    } catch (err) {
        throw new Error(err.message);
    }
};

export const deleteFileFromServer = async (token, id, key) => {
    try {
        await Axios.delete(url + "/delete-file", {
            data: { id, key },
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return;
    } catch (err) {
        throw new Error(err.error);
    }
};
