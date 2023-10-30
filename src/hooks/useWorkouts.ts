import {addDoc, doc, getDoc, getDocs, QuerySnapshot} from '@firebase/firestore';
import {
  collectionWorkouts,
  firestoreDb,
  queryAllExercisesOrdered,
  queryAllWorkoutsOrdered
} from '@app/services/firebase';
import {makeArrayFromSnapshot} from '@app/utils/makeNewArray';
import {useEffect, useState} from 'react';
import {WorkoutType} from '@app/types/types';
import {useGlobalStore} from '@app/store/useGlobalStore';
import {selectIsLoading, selectSetIsLoading} from '@app/store/selectors/globalStore';
import {useSession} from '@app/store/useSession';
import {selectUser} from '@app/store/selectors/session';
import {getUserWorkouts} from '@app/services/workouts';

const useWorkouts = (id?: string) => {
  const user = useSession(selectUser);

  const isLoading = useGlobalStore(selectIsLoading);
  const setIsLoading = useGlobalStore(selectSetIsLoading);

  const [workoutId, setWorkoutId] = useState(id ?? false);
  const [workouts, setWorkouts] = useState<WorkoutType[]>([]);
  const [workout, setWorkout] = useState<WorkoutType | undefined>(undefined);

  const retrieveAllWorkouts = async () => {
    setIsLoading(true);
    const workoutsSnapshot: QuerySnapshot = await getUserWorkouts(user.id);
    const workoutsRecordsFromDb = makeArrayFromSnapshot(workoutsSnapshot);
    setWorkouts(workoutsRecordsFromDb);
    setIsLoading(false);
  }

  const setId = id => setWorkoutId(id);

  const retrieveWorkoutById = async () => {
    try {
      setIsLoading(true);
      const workoutSnapshot: QuerySnapshot = await getDoc(doc(firestoreDb, 'workouts', workoutId));

      setWorkout({
        ...workoutSnapshot.data(),
        id: workoutSnapshot.id
      });
    } catch (e) {
      console.warn(e);
    } finally {
      setIsLoading(false);
    }
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
  }, [workoutId]);

  return {
    isLoading,
    workout,
    workouts,
    addWorkouts,
    setId,
    retrieveAllWorkouts
  }
}

export default useWorkouts;
