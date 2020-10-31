import React, { useEffect, useState } from "react";
import { Exercise } from "src/types/workout-types";
import { api } from "src/index";
import { Link } from "react-router-dom";

const COMPONENT_NAME = "Dashboard";

const Dashboard = () => {
    const [exercises, setExercises] = useState<Exercise[]>([]);
    console.log("user", localStorage.getItem("user"));

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

    useEffect(() => {
        getExercises();
    }, []);

    return (
        <div className={COMPONENT_NAME}>
            <h3>Workouts</h3>


            <h3>Exercises</h3>

            {exercises.map(exercise => {
                return (
                    <div className={`${COMPONENT_NAME}__exercise-list-item`} key={exercise.id}>
                        <Link to={`/admin/exercise/${exercise.id}`}>
                            {exercise.title}
                        </Link>
                    </div>
                );
            })}
        </div>
    )
};

export { Dashboard };
