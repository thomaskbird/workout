import React from "react";
import "./Header.scss";
import { Link } from "react-router-dom";

const COMPONENT_NAME = "Header";

const Header = ({}) => {
    return (
        <div className={COMPONENT_NAME}>
            <Link to={"/admin"}>
                <h1 className={"logo"}>
                    <span className="logo-red">I</span>
                    <span className="logo-blue">Work</span>
                    <span className="logo-purple">Out</span>
                </h1>
            </Link>
        </div>
    );
};

export { Header };
