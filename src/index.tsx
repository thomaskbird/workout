/**
 * Entry point for the PDS Web App
 * @module
 */
import "./index.scss";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import axios from "axios";

const location = window.location;
const protocol = location.protocol;
const host = location.hostname;

const env = host === "localhost" ? `dev` : `api`;

export const api = axios.create({
    baseURL: `ENTER_BASE_API_URL_HERE`
});

import { Root } from "src/components/Root";

/**
 * Web App root path.
 * If available, the web app exists in a sub directory on the server.
 */
const webAppRootPath =
    process.env.WEB_APP_ROOT_PATH != null
        ? `/${process.env.WEB_APP_ROOT_PATH}`
        : "";

/**
 * Creates the Root component
 * @returns Root component
 */
function createAppElement(): JSX.Element {
    return (
        <BrowserRouter basename={webAppRootPath}>
            <Root />
        </BrowserRouter>
    );
}

ReactDOM.render(createAppElement(), document.getElementById("root"));
