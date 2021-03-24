import React from "react";
import { NavLink } from "react-router-dom";

const Header = () => {
    return (
        <header>
            <NavLink to="/" />
            <NavLink to="/files" />
            <NavLink to="/files/add" />
            <NavLink to="/files/delete" />
        </header>
    );
};

export default Header;
