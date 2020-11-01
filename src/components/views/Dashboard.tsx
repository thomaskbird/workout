import React, { useEffect, useState } from "react";
import { Exercise, Workout } from "src/types/workout-types";
import { api } from "src/index";
import { Link } from "react-router-dom";

const COMPONENT_NAME = "Dashboard";

const Dashboard = () => {
    const [exercises, setExercises] = useState<Exercise[]>([]);
    const [workouts, setWorkouts] = useState<Workout[]>([]);

    const getExercises = () => {
        api.get(
            "/exercises",
        )
            .then(response => {
                console.log("response", response);
                setExercises(response.data.data.exercises);
            })
            .catch((errors: any) => {
                console.log("errors", errors);
            });
    };

    const getWorkouts = () => {
        api.get(
            "/workouts",
        )
            .then(response => {
                console.log("response", response);
                setWorkouts(response.data.data.workouts);
            })
            .catch((errors: any) => {
                console.log("errors", errors);
            });
    };

    useEffect(() => {
        getExercises();
        getWorkouts();
    }, []);

    return (
        <div className={COMPONENT_NAME}>
            <h3>
                Workouts
                <Link to={"/admin/workout/add"}>+</Link>
            </h3>
            {workouts.map(workout => (
                <div className={`${COMPONENT_NAME}__exercise-list-item`} key={workout.id}>
                    <Link to={`/admin/workout/${workout.id}`}>
                        {workout.title}
                    </Link>
                </div>
            ))}

            <h3>
                Exercises
                <Link to={"/admin/exercise/add"}>+</Link>
            </h3>

            {exercises.map(exercise => (
                <div className={`${COMPONENT_NAME}__exercise-list-item`} key={exercise.id}>
                    <Link to={`/admin/exercise/${exercise.id}`}>
                        {exercise.title}
                    </Link>
                </div>
            ))}
        </div>
    )
};

export { Dashboard };
