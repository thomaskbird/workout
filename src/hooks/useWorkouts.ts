import {addDoc, doc, DocumentReference, getDoc, getDocs, QuerySnapshot} from '@firebase/firestore';
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

const useWorkouts = (id?: string) => {
  const [workoutId, setWorkoutId] = useState(id ?? false);
  const isLoading = useGlobalStore(selectIsLoading);
  const setIsLoading = useGlobalStore(selectSetIsLoading);
  const [workouts, setWorkouts] = useState<WorkoutType[]>([]);
  const [workout, setWorkout] = useState<WorkoutType | undefined>(undefined);

  const retrieveAllWorkouts = async () => {
    setIsLoading(true);
    const workoutsSnapshot: QuerySnapshot = await getDocs(queryAllWorkoutsOrdered);
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

  const addWorkouts = async (data: WorkoutType) => {
    try {
      setIsLoading(true);
      const workoutRef = await addDoc(collectionWorkouts, data);
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
