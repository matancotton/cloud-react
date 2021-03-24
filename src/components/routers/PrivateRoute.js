import React, { useContext } from "react";
import { Redirect, Route } from "react-router";
import { UserContext } from "../../context/UserContext";

const PrivateRoute = ({ component: Component, ...rest }) => {
    const { userState } = useContext(UserContext);

    return (
        <Route
            {...rest}
            component={(props) => {
                return !!userState ? (
                    <Component {...props} />
                ) : (
                    <Redirect to="/" />
                );
            }}
        />
    );
};

export default PrivateRoute;
