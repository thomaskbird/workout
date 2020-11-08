import React, { useEffect, useState } from "react";
import { User } from "src/types/workout-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { api } from "src/index";

const COMPONENT_NAME = "Profile";

const Profile = () => {
    const [user, setUser] = useState<User | undefined>(undefined);
    const [isResetOpen, setIsResetOpen] = useState<boolean>(false);
    const [existingPassword, setExistingPassword] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [cpassword, setCPassword] = useState<string>("");

    useEffect(() => {
        const localUser = localStorage.getItem("user");
        if(localUser) {
            const storedUser = JSON.parse(localUser);
            setUser(storedUser);
        }
    }, []);

    const handleResetPassword = (e: any) => {
        e.preventDefault();

        api.post(
            `/reset-password`,
            {
                user_id: user!.id,
                password,
                cpassword,
                existingPassword,
            }
        ).then((response) => {
            console.log("response", response);
            setPassword("");
            setCPassword("");
            setExistingPassword("");
            setIsResetOpen(false);
        }).catch((err: any) => {
            console.log("Error", err);
        });
    };

    return (
        <div className={COMPONENT_NAME}>
            <h2 className={"title"}>Profile</h2>
            {user ? (
                <>
                    <h3>Profile information</h3>
                    <p><b>Name:</b> {user.first_name} {user.last_name}</p>
                    <p><b>Email:</b> {user.email}</p>
                    <p><b>Status:</b> {user.status}</p>

                    <h3>
                        Reset Password
                        <span
                            className={"icon"}
                            onClick={() => setIsResetOpen(!isResetOpen)}
                        >
                            <FontAwesomeIcon icon={isResetOpen ? "minus" : "plus"} />
                        </span>
                    </h3>

                    {isResetOpen ? (
                        <form method="post" onSubmit={(e: any) => handleResetPassword(e)}>
                            <div className={"FormGroup"}>
                                <label htmlFor={"existingPassword"}>Current password:</label>
                                <input
                                    type={"password"}
                                    name={"existingPassword"}
                                    id={"existingPassword"}
                                    value={existingPassword}
                                    onChange={e => setExistingPassword(e.target.value)}
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
                            <div className={"FormGroup"}>
                                <button
                                    type={"submit"}
                                    className={"Btn Btn--primary"}
                                >
                                    Reset password
                                </button>
                            </div>
                        </form>
                    ): undefined}
                </>
            ): undefined}
        </div>
    );
};

export { Profile };
