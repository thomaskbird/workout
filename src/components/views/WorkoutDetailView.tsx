import React, { useEffect, useState } from "react";
import { RouteComponentProps } from "react-router";
import "./WorkoutDetailView.scss";

import { Exercise, Workout } from "src/types/workout-types";
import { api } from "src/index";
import { ListItem } from "src/components/partials/ListItem";
import { Link } from "react-router-dom";

const COMPONENT_NAME = "WorkoutDetailView";

interface WorkoutDetailViewProps extends RouteComponentProps {}

const WorkoutDetailView = ({ match }: WorkoutDetailViewProps) => {
    const [workout, setWorkout] = useState<Workout | undefined>(undefined);
    const [exercises, setExercises] = useState<Exercise[] | undefined>(undefined);
    const [reps, setReps] = useState<number>(0.00);
    const [duration, setDuration] = useState<number>(0.00);
    const [exerciseId, setExerciseId] = useState<number>(0);

    const headings = ["Name", "Reps", "Duration", "Actions"];

    const getWorkout = () => {
        api.get(
            // @ts-ignore
            `/workouts/${match.params.id}`,
        )
            .then(response => {
                console.log("response", response);
                setWorkout(response.data.data.workout);
            })
            .catch((errors: any) => {
                console.log("errors", errors);
            });
    };

    const getExercises = () => {
        api.get(
            `/exercises`,
        )
            .then(response => {
                console.log("response", response);
                setExercises(response.data.data.exercises);
            })
            .catch((errors: any) => {
                console.log("errors", errors);
            });
    };

    const handleWorkoutExerciseAdd = (e: any) => {console.log("handleWorkoutExerciseAdd");
        e.preventDefault();

        api.post(
            `/workouts/exercises/add`,
            {
                // @ts-ignore
                workout_id: match.params.id,
                exercise_id: exerciseId,
                reps,
                duration,
            }
        )
            .then(response => {
                console.log("response", response);
                getWorkout();
                getExercises();
                setReps(0);
                setDuration(0);
            })
            .catch((errors: any) => {
                console.log("errors", errors);
            });
    };

    const handleWorkoutExerciseRemove = (workoutExerciseId: number) => {
        api.get(
            `/workouts/exercises/remove/${workoutExerciseId}`
        )
            .then(response => {
                console.log("response", response);
                getWorkout();
                getExercises();
            })
            .catch((errors: any) => {
                console.log("errors", errors);
            });
    };

    useEffect(() => {
        getWorkout();
        getExercises();
    }, []);

    return (
        <div className={COMPONENT_NAME}>
            <h2>{workout && workout.title}</h2>
            <p>{workout && workout.description}</p>

            <h3>Exercises</h3>

            {workout ? (
                <>
                <div className={`${COMPONENT_NAME}__row`}>
                    {headings.map((heading, i) => (
                        <div key={i} className={`${COMPONENT_NAME}__column ${COMPONENT_NAME}__heading`}>{heading}</div>
                    ))}
                </div>
                {workout.exercises.map((row: any, i) => (
                    <div key={i} className={`${COMPONENT_NAME}__row`}>
                        <div className={`${COMPONENT_NAME}__column`}>
                            <Link to={`/admin/exercise/${row.id}`}>
                                {row.title}
                            </Link>
                        </div>
                        <div className={`${COMPONENT_NAME}__column`}>
                            {row.pivot.reps}
                        </div>
                        <div className={`${COMPONENT_NAME}__column`}>
                            {row.pivot.duration}
                        </div>
                        <div className={`${COMPONENT_NAME}__column`}>
                            <span
                                className={`${COMPONENT_NAME}--remove`}
                                onClick={() => handleWorkoutExerciseRemove(row.pivot.id)}
                            >
                                x
                            </span>
                        </div>
                    </div>
                ))}
                </>
            ): undefined}

            <h3>Add Exercise</h3>
            <form method="post" onSubmit={(e: any) => handleWorkoutExerciseAdd(e)}>
                <div className={"FormGroup"}>
                    <label htmlFor={"exercise_id"}>Exercise:</label>
                    <select
                        name={"exercise_id"}
                        id={"exercise_id"}
                        onChange={e => setExerciseId(e.target.value as any as number)}
                    >
                        <option>Select exercise...</option>
                        {exercises && exercises.map((exercise) => (
                            <option key={exercise.id} value={exercise.id}>{exercise.title}</option>
                        ))}
                    </select>
                </div>

                <div className={"FormGroup"}>
                    <label htmlFor={"reps"}>Reps:</label>
                    <input
                        type={"text"}
                        name={"reps"}
                        id={"reps"}
                        value={reps}
                        onChange={e => setReps(e.target.value as any as number)}
                    />
                </div>

                <div className={"FormGroup"}>
                    <label htmlFor={"duration"}>Duration:</label>
                    <input
                        type={"text"}
                        name={"duration"}
                        id={"duration"}
                        value={duration}
                        onChange={e => setDuration(e.target.value as any as number)}
                    />
                </div>

                <div className={"FormGroup"}>
                    <button
                        type={"submit"}
                        className={"Btn Btn--primary"}
                    >
                        Add exercise to workout
                    </button>
                </div>
            </form>

        </div>
    );
};

export { WorkoutDetailView };
