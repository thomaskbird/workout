import "./Root.scss";
import * as React from "react";
// import { Redirect, Route, RouteComponentProps, Switch } from "react-router";

/**
 * Props interface for {@link Root}.
 */
interface Props {}

/**
 * State interface for {@link Root}.
 */
interface State {}

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
        this.state = {};
    }

    /**
     * @inheritDoc
     */
    public render(): JSX.Element {
        return (
            <div className={"Root"}>
                <h1>Boilerplate Root Element</h1>
            </div>
        );
    }
}
