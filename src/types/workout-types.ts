export interface Timestamps {
    created_at: string;
    updated_at: string;
    deleted_at: string | null;
}

export interface ExerciseSteps extends Timestamps {
    id: number;
    user_id: number;
    exercise_id: number;
    description: string;
    priority: number;
}

export interface Exercise extends Timestamps {
    id: number;
    user_id: number;
    title: string;
    slug: string;
    description: string;
    image: string;
    steps: ExerciseSteps[];
}

enum WorkoutLevel {
    beginner = "beginner",
    intermediate = "intermediate",
    advanced = "advanced",
    expert = "expert"
}

export interface Workout extends Timestamps {
    id: number;
    user_id: number;
    title: string;
    slug: string;
    description: string;
    est_time: number;
    level: WorkoutLevel;
    exercises: Exercise[];
}

export interface WorkoutExercise extends Timestamps {
    user_id: number;
    workout_id: number;
    exercise_id: number;
}


