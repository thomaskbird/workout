import React, { useState, useRef } from "react";
import { api } from "src/index";
import { ErrorDisplay } from "src/components/utils/ErrorDisplay";
import { Redirect } from "react-router";

const COMPONENT_NAME = "AddExercise";

const AddExercise = () => {
    const imageRef = useRef(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [hasErrors, setHasErrors] = useState<boolean>(false);
    const [isSuccessful, setIsSuccessful] = useState<boolean>(false);
    const [errorMessages, setErrorMessages] = useState<string[]>([]);
    const [title, setTitle] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [image, setImage] = useState<any>({});

    const handleSubmit = (e: any) => {console.log("handleSubmit", e);
        e.preventDefault();
        setIsLoading(true);

        const formData = new FormData();

        formData.append("title", title);
        formData.append("description", description);
        formData.append("image", image);

        api.post(
            "/exercise/add",
            formData
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
                    <label htmlFor={"image"}>Image:</label>
                    <input
                        ref={imageRef}
                        type={"file"}
                        name={"image"}
                        id={"image"}
                        onChange={e => setImage(e.target.files![0])}
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
