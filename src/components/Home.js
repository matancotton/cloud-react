import React, { useContext } from "react";
import { UserContext } from "../context/UserContext";
import Files from "./files/Files";
import LoginPage from "./LoginPage";

export const Home = () => {
    const { userState } = useContext(UserContext);
    return (
        <div className="home">
            {!!userState ? (
                <div>
                    <h1>upload a File:</h1>
                    <Files />
                </div>
            ) : (
                <LoginPage />
            )}
        </div>
    );
};
