import "./Root.scss";
import * as React from "react";
import { createStore } from "redux";
import { WorkoutReducers } from "src/redux/redux-reducers";
import { Provider } from "react-redux";
import { Redirect, Route, RouteComponentProps, Switch } from "react-router";
import { Intro } from "src/components/views/Intro";
import { AuthenticatedWrapper } from "src/components/partials/AuthenticatedWrapper";
import { BrowserRouter } from "react-router-dom";
import { getToken } from "src/components/utils/Helpers";
// import { Redirect, Route, RouteComponentProps, Switch } from "react-router";

// create redux store
const workoutStore = createStore(WorkoutReducers);

/**
 * Props interface for {@link Root}.
 */
interface Props extends RouteComponentProps {}

/**
 * State interface for {@link Root}.
 */
interface State {
    isLoggedIn: boolean;
}

/**
 * Root is wrapped in the withRouter() Higher Order Component to allow for dynamic routing. This works by exposing the
 * "history" object that allows for pushing a new route to the browser history. Within Root, we are doing this through
 * the routePage() function and assigning it as a callback where needed.
 */
export class Root extends React.Component<Props, State> {
    /**
     * @inheritDoc
     */
    public constructor(props: Props, context?: any) {
        super(props, context);

        // Update the State with all the default values needed
        this.state = {
            isLoggedIn: false
        };
    }

    public componentDidMount(): void {
        getToken().then(response => {
            if(response) {
                this.setState({
                    isLoggedIn: true
                });
            }
        });
    }

    /**
     * @inheritDoc
     */
    public render(): JSX.Element {
        const location = window.location.pathname;
        console.log("location", location);

        return this.state.isLoggedIn && window.location.pathname !== "/admin" ? (
            <Redirect to={"/admin"} />
        ) : (
            <Provider store={workoutStore}>
                <BrowserRouter>
                    <Switch>
                        <Route
                            exact={true}
                            path={"/"}
                            component={Intro}
                        />
                        <Route
                            path={"/admin*"}
                            component={AuthenticatedWrapper}
                        />
                    </Switch>
                </BrowserRouter>
            </Provider>
        );
    }
}
