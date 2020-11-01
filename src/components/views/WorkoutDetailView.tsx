import React, { useEffect, useState } from "react";
import { RouteComponentProps } from "react-router";
import { Workout } from "src/types/workout-types";
import { api } from "src/index";
import { ListItem } from "src/components/partials/ListItem";

const COMPONENT_NAME = "WorkoutDetailView";

interface WorkoutDetailViewProps extends RouteComponentProps {}

const WorkoutDetailView = ({ match }: WorkoutDetailViewProps) => {
    const [workout, setWorkout] = useState<Workout | undefined>(undefined);

    const getWorkout = () => {
        api.get(
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

    useEffect(() => {
        getWorkout();
    }, []);

    return (
        <div className={COMPONENT_NAME}>
            <h2>{workout && workout.title}</h2>
            <p>{workout && workout.description}</p>

            <h3>Exercises</h3>
            <ul>
                {workout && workout.exercises && workout.exercises.map(exercise => (
                    <ListItem
                        key={exercise.id}
                        url={`/admin/exercise/${exercise.id}`}
                        description={exercise.title}
                        onRemove={() => console.log("remove", exercise.id)}
                    />
                ))}
            </ul>
        </div>
    );
};

export { WorkoutDetailView };
