import Cookies from "js-cookie";

const USER_DATA = "user-data";

export const saveUserOnCookie = (userData) => {
    const jsonUserData = JSON.stringify(userData);
    Cookies.set(USER_DATA, jsonUserData, {
        expires: 1 / 12,
        sameSite: "strict",
    });
};

export const deleteUserFromCookie = () => {
    Cookies.remove(USER_DATA, { sameSite: "strict" });
};

export const getUserFromCookie = () => {
    const jsonUserData = Cookies.get(USER_DATA);
    if (jsonUserData === undefined) return null;

    return JSON.parse(jsonUserData);
};
