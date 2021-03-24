import React, { createContext, useReducer } from "react";
import { getUserFromCookie } from "../cookies/cookie";
import userReducer, { initialUserState } from "../reducers/userReducer";

export const UserContext = createContext();

const UserContextProvider = (props) => {
    const [userState, userDispatch] = useReducer(
        userReducer,
        getUserFromCookie() || initialUserState
    );
    return (
        <UserContext.Provider value={{ userState, userDispatch }}>
            {props.children}
        </UserContext.Provider>
    );
};

export default UserContextProvider;
