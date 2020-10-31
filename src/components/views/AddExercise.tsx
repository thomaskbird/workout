import React, { useState } from "react";
import { api } from "src/index";
import { ErrorDisplay } from "src/components/utils/ErrorDisplay";
import { Redirect } from "react-router";

const COMPONENT_NAME = "AddExercise";

const AddExercise = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [hasErrors, setHasErrors] = useState<boolean>(false);
    const [isSuccessful, setIsSuccessful] = useState<boolean>(false);
    const [errorMessages, setErrorMessages] = useState<string[]>([]);
    const [title, setTitle] = useState<string>("");
    const [description, setDescription] = useState<string>("");

    const handleSubmit = (e: any) => {
        e.preventDefault();
        console.log("handleSubmit", e);
        setIsLoading(true);

        api.post(
            "/exercise/add",
            { title, description }
        )
            .then(response => {
                console.log("response", response);
                setIsSuccessful(true);
            })
            .catch((errors: any) => {
                setHasErrors(true);
                setErrorMessages([
                    "Uh oh, something didn't work, please try again!"
                ]);
            })
            .then(() => setIsLoading(false));
    };

    if(isSuccessful) {
        return <Redirect to={"/admin"}/>
    }

    return (
        <div className={`${COMPONENT_NAME}`}>
            <h2>Add Exercise</h2>

            <form method="post" onSubmit={(e: any) => handleSubmit(e)}>
                <div className={"FormGroup"}>
                    <label htmlFor={"title"}>Title:</label>
                    <input
                        type={"text"}
                        name={"title"}
                        id={"title"}
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                    />
                </div>

                <div className={"FormGroup"}>
                    <label htmlFor={"description"}>Description:</label>
                    <textarea
                        name={"description"}
                        id={"description"}
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                    />
                </div>

                <div className={"FormGroup"}>
                    <button
                        type={"submit"}
                        className={"Btn Btn--primary"}
                        disabled={isLoading}
                    >
                        Create exercise
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

export { AddExercise };
