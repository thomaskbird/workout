import React, { useState } from "react";
import "./AuthenticatedWrapper.scss";
import { Route, Switch } from "react-router";
import { Link } from "react-router-dom";

// views
import { Header } from "src/components/partials/Header";
import { Dashboard } from "src/components/views/Dashboard";
import { AddExercise } from "src/components/views/AddExercise";
import { ExerciseDetailView } from "src/components/views/ExerciseDetailView";
import { AddWorkout } from "src/components/views/AddWorkout";
import { WorkoutDetailView } from "src/components/views/WorkoutDetailView";
import { Profile } from "src/components/views/Profile";

interface AuthenticatedWrapperProps {}

const COMPONENT_NAME = "AuthenticatedWrapper";

const AuthenticatedWrapper = ({}: AuthenticatedWrapperProps) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);

    return (
        <div className={COMPONENT_NAME}>
            <Header
                isSidebarOpen={isSidebarOpen}
                onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
            />
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
                        path={"/admin/profile"}
                        component={Profile}
                    />
                    <Route
                        component={Dashboard}
                    />
                </Switch>
            </div>
            <div className={`${COMPONENT_NAME}__sidebar ${isSidebarOpen ? "open" : ""}`}>
                <h3>Sidebar</h3>

                <div className={`${COMPONENT_NAME}__menu`}>
                    <div className={`${COMPONENT_NAME}__menu--item`}>
                        <Link to={"/admin/profile"} onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                            Profile
                        </Link>
                    </div>
                    <div className={`${COMPONENT_NAME}__menu--item`}>
                        <Link to={"/admin/settings"} onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                            Settings
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export { AuthenticatedWrapper };
