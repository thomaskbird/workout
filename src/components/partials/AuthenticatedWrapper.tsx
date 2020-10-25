import React from "react";
import { Route, Switch } from "react-router";
import { Dashboard } from "src/components/views/Dashboard";
import { BrowserRouter } from "react-router-dom";

interface AuthenticatedWrapperProps {}

const COMPONENT_NAME = "AuthenticatedWrapper";

// todo: check if user is logged in
// todo: if they are return children
// todo: if not redirect to login page

const AuthenticatedWrapper = ({}: AuthenticatedWrapperProps) => {
    return (
        <div className={COMPONENT_NAME}>
            <BrowserRouter>
            <Switch>
                <Route
                    path={"/admin/dashboard"}
                    component={Dashboard}
                />
                <Route
                    component={Dashboard}
                />
            </Switch>
            </BrowserRouter>
        </div>
    )
};

export { AuthenticatedWrapper };
