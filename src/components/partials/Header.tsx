import React from "react";
import "./Header.scss";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const COMPONENT_NAME = "Header";

interface HeaderProps {
    isSidebarOpen: boolean;
    onToggleSidebar(): void;
}

const Header = ({
    isSidebarOpen,
    onToggleSidebar
}: HeaderProps) => {
    const handleLogout = () => {
        localStorage.removeItem("token");
    };

    return (
        <div className={COMPONENT_NAME}>
            <span
                className={`${COMPONENT_NAME}__sidebar-trigger`}
                onClick={() => onToggleSidebar()}
            >
                <FontAwesomeIcon icon={isSidebarOpen ? "times" : "bars"} />
            </span>
            <Link to={"/admin"}>
                <h1 className={"logo"}>
                    <span className="logo-red">I</span>
                    <span className="logo-blue">Work</span>
                    <span className="logo-purple">Out</span>
                </h1>
            </Link>

            <button
                type={"button"}
                className={`Btn Btn--transparent`}
                onClick={() => handleLogout()}
            >
                Logout
            </button>
        </div>
    );
};

export { Header };
