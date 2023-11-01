import {Timestamp} from '@firebase/firestore';

export interface Error {
  msg: string;
  type?: any;
}

export interface GeneralState {
  isLoading: boolean;
  errors: Error[];
}

export type ExerciseStepType = {
  id: number;
  val: string;
}

export type ExerciseTagType = Pick<TagType, 'id' | 'tag'>;

export type ExerciseType = {
  id?: string;
  userId: string;
  title: string;
  description: string;
  sets: number;
  reps?: number;
  duration?: number;
  steps?: ExerciseStepType[];
  tags?: ExerciseTagType[];
  thumbnail: string;
  video: string;
  createdAt: Timestamp;
}

export type WorkoutType = {
  id: string;
  title: string;
  description: string;
  duration: number;
  createdAt: Timestamp;
  exercises: ExerciseType[];
}

export type AccountType = {
  email: string;
  password: string;
  cPassword: string;
  createdAt: Timestamp;
}

export type TagType = {
  id: string;
  tag: string;
  slug: string;
  userId: string;
  createdAt: Timestamp;
}

export type UserType = {
  id: string;
  uid: string;
  email: string;
  firstName: string;
  lastName: string;
  age: number;
  favExercises?: string[];
  favWorkouts?: string[];
}

export type Prettify<T> = {
  [K in keyof T]: T[K]
} & {};
