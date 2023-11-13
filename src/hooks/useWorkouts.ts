import {
  collectionExercises,
  collectionWorkouts,
  firestoreDb,
} from '@app/services/firebase';
import { getUserWorkouts } from '@app/services/workouts';
import { selectIsLoading, selectSetIsLoading } from '@app/store/selectors/globalStore';
import { selectUser } from '@app/store/selectors/session';
import { useGlobalStore } from '@app/store/useGlobalStore';
import { useSession } from '@app/store/useSession';
import { WorkoutType } from '@app/types/types';
import { makeArrayFromSnapshot } from '@app/utils/makeNewArray';
import { QuerySnapshot, addDoc, doc, getDoc, getDocs, query, where } from '@firebase/firestore';
import { useCallback, useEffect, useState } from 'react';

const useWorkouts = (id?: string) => {
  const user = useSession(selectUser);

  const isLoading = useGlobalStore(selectIsLoading);
  const setIsLoading = useGlobalStore(selectSetIsLoading);

  const [workout, setWorkout] = useState<WorkoutType | undefined>(undefined);
  const [workouts, setWorkouts] = useState<WorkoutType[]>([]);

  const retrieveWorkoutById = useCallback(async () => {
    if(id) {
      try {
        console.log('try');
        const workoutSnapshot = await getDoc(doc(firestoreDb, 'workouts', id));
        const workoutData = workoutSnapshot.data();
        const exerciseIds = workoutData.exercises.map(exercise => exercise.id);

        const exercisesSnap = await getDocs(query(collectionExercises, where('id', 'in', exerciseIds)));
        const exercisesData = makeArrayFromSnapshot(exercisesSnap);

        setWorkout({
          ...workoutData,
          id: workoutSnapshot.id,
          exercises: exercisesData
        });
      } catch (e) {
        console.warn(e);
      }
    } else {
      console.warn('No id available');
    }
  }, [id]);

  const retrieveAllWorkouts = async () => {
    setIsLoading(true);
    const workoutsSnapshot: QuerySnapshot = await getUserWorkouts(user.id);
    const workoutsRecordsFromDb = makeArrayFromSnapshot(workoutsSnapshot);
    setWorkouts(workoutsRecordsFromDb);
    setIsLoading(false);
  }

  const addWorkouts = async (data: Partial<WorkoutType>) => {
    const dataWithUser = {
      ...data,
      userId: user.id
    }

    try {
      setIsLoading(true);
      const workoutRef = await addDoc(collectionWorkouts, dataWithUser);
      return Promise.resolve(workoutRef.id);
    } catch (e) {
      console.warn(e);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    retrieveAllWorkouts();
  }, []);

  useEffect(() => {
    retrieveWorkoutById();
  }, [id]);

  return {
    isLoading,
    workout,
    workouts,
    addWorkouts,
    retrieveAllWorkouts
  }
}

export default useWorkouts;
