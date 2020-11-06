import React, { useEffect, useState } from "react";
import "./AuthenticatedWrapper.scss";
import { Redirect, Route, Switch } from "react-router";
import { Link } from "react-router-dom";

// views
import { Header } from "src/components/partials/Header";
import { Dashboard } from "src/components/views/Dashboard";
import { AddExercise } from "src/components/views/AddExercise";
import { ExerciseDetailView } from "src/components/views/ExerciseDetailView";
import { AddWorkout } from "src/components/views/AddWorkout";
import { WorkoutDetailView } from "src/components/views/WorkoutDetailView";
import { getToken } from "src/components/utils/Helpers";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface AuthenticatedWrapperProps {}

const COMPONENT_NAME = "AuthenticatedWrapper";

// todo: check if user is logged in
// todo: if they are return children
// todo: if not redirect to login page

const AuthenticatedWrapper = ({}: AuthenticatedWrapperProps) => {
    const [isLoggedin, setIsLoggedin] = useState<boolean>(true);
    const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);

    useEffect(() => {
        getToken().then(response => {
            if(!response) {
                setIsLoggedin(false);
            }
        });
    }, []);

    return !isLoggedin ? (
        <Redirect to={"/"} />
    ) : (
        <div className={COMPONENT_NAME}>
            <Header onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
            <div className={`${COMPONENT_NAME}__content`}>
                <Switch>
                    <Route
                        path={"/admin/exercise/add"}
                        component={AddExercise}
                    />
                    <Route
                        path={"/admin/exercise/:id"}
                        component={ExerciseDetailView}
                    />
                    <Route
                        path={"/admin/workout/add"}
                        component={AddWorkout}
                    />
                    <Route
                        path={"/admin/workout/:id"}
                        component={WorkoutDetailView}
                    />
                    <Route
                        component={Dashboard}
                    />
                </Switch>
            </div>
            <div className={`${COMPONENT_NAME}__sidebar ${isSidebarOpen ? "open" : ""}`}>
                <span
                    onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                >
                    <FontAwesomeIcon icon={"times"} />
                </span>
                <h3>Sidebar</h3>
            </div>
        </div>
    )
};

export { AuthenticatedWrapper };
