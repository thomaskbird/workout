import {addDoc, DocumentReference, getDocs, QuerySnapshot} from '@firebase/firestore';
import {collectionWorkouts, queryAllExercisesOrdered, queryAllWorkoutsOrdered} from '@app/services/firebase';
import {makeArrayFromSnapshot} from '@app/utils/makeNewArray';
import {useEffect, useState} from 'react';
import {WorkoutType} from '@app/types/types';

const useGetWorkouts = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [workouts, setWorkouts] = useState([]);

  const retrieveAllWorkouts = async () => {
    setIsLoading(true);
    const workoutsSnapshot: QuerySnapshot = await getDocs(queryAllWorkoutsOrdered);
    const workoutsRecordsFromDb = makeArrayFromSnapshot(workoutsSnapshot);
    setWorkouts(workoutsRecordsFromDb);
    setIsLoading(false);
  }

  const addWorkouts = async (data) => {
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

  return {
    isLoading,
    workouts,
    addWorkouts,
    retrieveAllWorkouts
  }
}

export default useGetWorkouts;
