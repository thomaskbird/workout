import React, { useState } from "react";
import { api } from "src/index";
import { ErrorDisplay } from "src/components/utils/ErrorDisplay";
import { Redirect } from "react-router";

const COMPONENT_NAME = "AddWorkout";

const AddWorkout = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [hasErrors, setHasErrors] = useState<boolean>(false);
    const [isSuccessful, setIsSuccessful] = useState<boolean>(false);
    const [errorMessages, setErrorMessages] = useState<string[]>([]);
    const [title, setTitle] = useState<string>("");
    const [level, setLevel] = useState<string>("");
    const [estTime, setEstTime] = useState<number>(0.00);
    const [description, setDescription] = useState<string>("");

    const handleSubmit = (e: any) => {
        e.preventDefault();
        console.log("handleSubmit", e);
        setIsLoading(true);

        api.post(
            "/workout/add",
            {
                title,
                description,
                est_time: estTime,
                level,
            }
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
            <h2>Add Workout</h2>

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
                    <label htmlFor={"estTime"}>Est time:</label>
                    <input
                        type={"text"}
                        name={"estTime"}
                        id={"estTime"}
                        value={estTime}
                        onChange={e => setEstTime(e.target.value as any as number)}
                    />
                </div>

                <div className={"FormGroup"}>
                    <label htmlFor={"level"}>Level:</label>
                    <select
                        name={"level"}
                        id={"level"}
                        value={level}
                        onChange={e => setLevel(e.target.value)}
                    >
                        beginner = "beginner",
                        intermediate = "intermediate",
                        advanced = "advanced",
                        expert = "expert"
                        <option value={"beginner"}>Beginner</option>
                        <option value={"intermediate"}>Intermediate</option>
                        <option value={"advanced"}>Advanced</option>
                        <option value={"expert"}>Expert</option>
                    </select>
                </div>

                <div className={"FormGroup"}>
                    <button
                        type={"submit"}
                        className={"Btn Btn--primary"}
                        disabled={isLoading}
                    >
                        Create workout
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

export { AddWorkout };
