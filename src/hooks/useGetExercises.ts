import {addDoc, getDocs, QuerySnapshot} from '@firebase/firestore';
import {collectionExercises, collectionWorkouts, queryAllExercisesOrdered} from '@app/services/firebase';
import {makeArrayFromSnapshot} from '@app/utils/makeNewArray';
import {useEffect, useState} from 'react';

const useGetExercises = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [exercises, setExercises] = useState([]);

  const retrieveAllExercises = async () => {
    setIsLoading(true);
    const exercisesSnap: QuerySnapshot = await getDocs(queryAllExercisesOrdered);
    const exercisesRecordsFromDb = makeArrayFromSnapshot(exercisesSnap);
    setExercises(exercisesRecordsFromDb);
    setIsLoading(false);
  }

  const addExercise = async (data) => {
    try {
      setIsLoading(true);
      const exerciseRef = await addDoc(collectionExercises, data);
      return Promise.resolve(exerciseRef.id);
    } catch (e) {
      console.warn(e);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    retrieveAllExercises();
  }, []);

  return {
    isLoading,
    exercises,
    addExercise,
    retrieveAllExercises
  }
}

export default useGetExercises;
