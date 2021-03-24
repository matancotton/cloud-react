import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { loginAction } from "../actions/userAction";
import { UserContext } from "../context/UserContext";
import { saveUserOnCookie } from "../cookies/cookie";
import { loginToServer } from "../server/auth";

const LoginForm = (props) => {
    const { userDispatch } = useContext(UserContext);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isUsernameValid, setIsUsernameValid] = useState(true);
    const [isPasswordValid, setIsPasswordValid] = useState(true);
    const [errorMessage, setErrorMessage] = useState("");
    const history = useHistory();
    const onClickSubscribe = () => {
        props.setIsLoginMode(false);
    };

    const onChangeUsernameInput = (event) => {
        const input = event.target.value.trim();
        if (input === "") {
            setIsUsernameValid(false);
            setUsername("");
            return;
        }
        setUsername(input);
        setIsUsernameValid(true);
    };

    const onChangePassword = (event) => {
        const input = event.target.value.trim();
        if (input === "") {
            setPassword("");
            setIsPasswordValid(false);
            return;
        }

        setPassword(input);
        setIsPasswordValid(true);
    };

    const isFormInValid = () => {
        return username === "" || password === "";
    };

    const onSubmitForm = (event) => {
        event.preventDefault();
        if (isFormInValid()) {
            if (username === "") setIsUsernameValid(false);
            if (password === "") setIsPasswordValid(false);
            return;
        }

        loginToServer(username, password)
            .then((userData) => {
                userDispatch(loginAction(userData));
                saveUserOnCookie(userData);
                history.push("/");
            })
            .catch((err) => {
                setErrorMessage("username or password are invalid !!");
            });
    };

    return (
        <div className="login-form login-mode">
            <h3>Login</h3>
            <form onSubmit={onSubmitForm}>
                {errorMessage !== "" && (
                    <div className="input-invalid">{errorMessage}</div>
                )}
                <div>
                    <input
                        placeholder="username"
                        onChange={onChangeUsernameInput}
                    ></input>
                    {!isUsernameValid && (
                        <div className="input-invalid">
                            You must enter a valid username
                        </div>
                    )}
                </div>
                <div>
                    <input
                        type="password"
                        placeholder="password"
                        onChange={onChangePassword}
                    ></input>
                    {!isPasswordValid && (
                        <div className="input-invalid">
                            You must enter a password
                        </div>
                    )}
                </div>
                <button type="submit" className="button">
                    Submit
                </button>
                <div
                    className="change-form switch-form"
                    onClick={onClickSubscribe}
                >
                    Sign up
                </div>
            </form>
        </div>
    );
};

export default LoginForm;
