import React from "react";
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

interface AuthenticatedWrapperProps {}

const COMPONENT_NAME = "AuthenticatedWrapper";

// todo: check if user is logged in
// todo: if they are return children
// todo: if not redirect to login page

const AuthenticatedWrapper = ({}: AuthenticatedWrapperProps) => {
    return (
        <div className={COMPONENT_NAME}>
            <Header />
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
        </div>
    )
};

export { AuthenticatedWrapper };
