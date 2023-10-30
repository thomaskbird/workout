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

export type ExerciseType = {
  id: string;
  title: string;
  description: string;
  reps: number;
  sets: number;
  steps?: ExerciseStepType[];
  uploads?: string[];
  createdAt: Timestamp;
}

export type WorkoutType = {
  id: string;
  title: string;
  description: string;
  createdAt: Timestamp;
  exercises: ExerciseType[];
}

export type AccountType = {
  email: string;
  password: string;
  cPassword: string;
  createdAt: Timestamp;
}

export type Prettify<T> = {
  [K in keyof T]: T[K]
} & {};
