import Axios from "axios";

export const loginToServer = async (username, password) => {
    try {
        const result = await Axios.post(
            process.env.REACT_APP_SERVER_URL + "/user/login",
            { username, password }
        );
        return result.data;
    } catch (err) {
        throw err;
    }
};

export const subscribeToServer = async (userData) => {
    try {
        const result = await Axios.post(
            process.env.REACT_APP_SERVER_URL + "/user/subscribe",
            userData
        );
        return result.data;
    } catch (err) {
        throw err;
    }
};
