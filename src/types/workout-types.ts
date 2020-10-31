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
    steps: ExerciseSteps[];
}


