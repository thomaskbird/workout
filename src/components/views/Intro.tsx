import React, { useState } from "react";
import { Redirect } from "react-router";
import "./Intro.scss";

import { api } from "src/index";
import { ErrorDisplay } from "src/components/utils/ErrorDisplay";

const COMPONENT_NAME = "Intro";

const Intro = () => {
    const [isSignup, setIsSignup] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const [hasErrors, setHasErrors] = useState<boolean>(false);
    const [errorMessages, setErrorMessages] = useState<string[]>([]);
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [cpassword, setCPassword] = useState<string>("");

    const handleSubmit = (e: any) => {
        e.preventDefault();

        if(isSignup) {
            handleSignup();
        } else {
            handleLogin();
        }
    };

    const handleLogin = () => {console.log("handleLogin()");
        setIsLoading(true);

        api.post(
            "/login",
            { email, password }
        )
            .then(response => {
                console.log("response", response);

                if (response.status) {
                    localStorage.setItem(
                        "token",
                        response.data.data.user.api_token
                    );

                    localStorage.setItem(
                        "user",
                        JSON.stringify(response.data.data.user)
                    );

                    api.defaults.headers.common[
                        "Authorization"
                    ] = `Bearer ${localStorage.getItem("token")}`;

                    setIsLoggedIn(true);
                } else {
                    setHasErrors(true);
                    setErrorMessages([
                        "You missed one of the required values"
                    ]);
                }
            })
            .catch(e => {
                setHasErrors(true);
                setErrorMessages([
                    "Your email and password combination did not match!"
                ]);
            })
            .then(() => setIsLoading(false));
    };

    const handleSignup = () => {console.log("handleSignup()");
        if(email === "" || password === "" || cpassword === "") {
            setHasErrors(true);
            setErrorMessages([
                "You missed one of the required values"
            ]);
        } else {
            api.post(
                "/signup",
                { email, password }
            )
                .then(response => {
                    console.log("response", response);
                })
                .catch(e => console.log("Error: ", e))
                .then(() => setIsLoading(false));
        }
    };

    if(isLoggedIn) {
        return <Redirect to={"/admin"} />
    }

    return (
        <div className={COMPONENT_NAME}>
            <h1 className={"logo"}>
                <span className="logo-red">I</span>
                <span className="logo-blue">Work</span>
                <span className="logo-purple">Out</span>
            </h1>

            <form method="post" onSubmit={(e: any) => handleSubmit(e)}>
                <div className={"FormGroup"}>
                    <label htmlFor={"email"}>Email:</label>
                    <input
                        type={"text"}
                        name={"email"}
                        id={"email"}
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                </div>
                <div className={"FormGroup"}>
                    <label htmlFor={"password"}>Password:</label>
                    <input
                        type={"password"}
                        name={"password"}
                        id={"password"}
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                </div>
                {isSignup ? (
                    <div className={"FormGroup"}>
                        <label htmlFor={"cpassword"}>Confirm Password:</label>
                        <input
                            type={"password"}
                            name={"cpassword"}
                            id={"cpassword"}
                            value={cpassword}
                            onChange={e => setCPassword(e.target.value)}
                        />
                    </div>
                ): undefined}
                <div className={"FormGroup"}>
                    <button
                        type={"submit"}
                        className={"Btn Btn--primary"}
                        disabled={isLoading}
                    >
                        {isSignup ? "Signup" : "Login"}
                    </button>
                    <button
                        type={"button"}
                        className={"Btn Btn--transparent"}
                        onClick={() => setIsSignup(!isSignup)}
                    >
                        {isSignup ? "Cancel" : "Signup"}
                    </button>
                </div>
            </form>

            <ErrorDisplay
                isVisible={hasErrors}
                errors={errorMessages}
                onClose={() => {
                    setHasErrors(false);
                    setErrorMessages([]);
                }}
            />
        </div>
    );
};

export { Intro };
