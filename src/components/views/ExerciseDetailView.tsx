import React, { useEffect, useState, useRef } from "react";
import "./ExerciseDetailView.scss";
import { Exercise } from "src/types/workout-types";
import { api } from "src/index";
import { RouteComponentProps } from "react-router";
import { ListItem } from "src/components/partials/ListItem";

const COMPONENT_NAME = "ExerciseDetailView";

interface ExerciseDetailViewProps extends RouteComponentProps {}

const ExerciseDetailView = ({ match }: ExerciseDetailViewProps) => {
    const descriptionRef = useRef<HTMLTextAreaElement>(null);
    const [exercise, setExercise] = useState<Exercise | undefined>(undefined);
    const [description, setDescription] = useState<string>("");
    const [image, setImage] = useState<any>({});

    const getExercise = () => {
        api.get(
            // @ts-ignore
            `/exercises/${match.params.id}`,
        )
            .then(response => {
                console.log("response", response);
                setExercise(response.data.data.exercise);
            })
            .catch((errors: any) => {
                console.log("errors", errors);
            });
    };

    const handleExerciseStepAdd = (e: any) => {
        e.preventDefault();
        console.log("handleSubmit", e);

        api.post(
            "/exercise/step/add",
            { exercise_id: exercise!.id, description }
        )
            .then(response => {
                console.log("response", response);
                getExercise();
                setDescription("");
                descriptionRef.current!.focus();
            })
            .catch((errors: any) => {
                console.log("errors", errors);
            });
    };

    const handleFileUpload = (e: any) => {console.log("handleFileUpload", e);
        e.preventDefault();

        const formData = new FormData();
        formData.append("image", image);
        formData.append("id", exercise!.id as any as string);

        api.post(
            "/exercise/upload",
            formData
        )
            .then(response => {
                console.log("response", response);
                getExercise();
            })
            .catch((errors: any) => console.log("Errors:", errors));
    };

    useEffect(() => {
        getExercise();
    }, []);

    return (
        <div className={COMPONENT_NAME}>
            {exercise && exercise.image ? (
                <img src={`https://dev-iworkout.airborneartists.com/img/exercises/${exercise.image}`} />
            ): (
                <form method="post" onSubmit={(e: any) => handleFileUpload(e)}>
                    <div className={"FormGroup"}>
                        <label htmlFor={"image"}>Image:</label>
                        <input
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
                        >
                            Upload
                        </button>
                    </div>
                </form>
            )}
            <h2>{exercise && exercise.title}</h2>
            <p>{exercise && exercise.description}</p>

            <h3>Steps</h3>
            {exercise && exercise.steps.length ? (
                <ul>
                {exercise && exercise.steps && exercise.steps.map(step => (
                    <ListItem
                        key={step.id}
                        description={step.description}
                        onRemove={() => console.log("remove", step.id)}
                    />
                ))}
                </ul>
            ) : (
                <p>Not steps have been add yet...</p>
            )}

            <h3>Add step</h3>

            <form method="post" onSubmit={(e: any) => handleExerciseStepAdd(e)}>
                <div className={"FormGroup"}>
                    <label htmlFor={"description"}>Description:</label>
                    <textarea
                        ref={descriptionRef}
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
                    >
                        Create Step
                    </button>
                </div>
            </form>
        </div>
    )
};

export { ExerciseDetailView };
