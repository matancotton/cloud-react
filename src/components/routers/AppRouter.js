import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import UserContextProvider from "../../context/UserContext";
import Files from "../files/Files";
import Header from "../Header";
import { Home } from "../Home";
import PrivateRoute from "./PrivateRoute";

const AppRouter = () => {
    return (
        <BrowserRouter>
            <UserContextProvider>
                <Header />
                <Switch>
                    <Route path="/" component={Home} exact={true} />
                    <PrivateRoute path="/files" component={Files} />
                </Switch>
            </UserContextProvider>
        </BrowserRouter>
    );
};

export default AppRouter;
