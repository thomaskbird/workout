import {addDoc, getDocs, QuerySnapshot} from '@firebase/firestore';
import {collectionExercises, queryAllExercisesOrdered} from '@app/services/firebase';
import {makeArrayFromSnapshot} from '@app/utils/makeNewArray';
import {useEffect, useState} from 'react';
import {useGlobalStore} from '@app/store/useGlobalStore';
import {selectIsLoading, selectSetIsLoading} from '@app/store/selectors/globalStore';
import {ExerciseType} from '@app/types/types';

const useExercises = () => {
  const isLoading = useGlobalStore(selectIsLoading);
  const setIsLoading = useGlobalStore(selectSetIsLoading);

  const [exercises, setExercises] = useState<ExerciseType[]>([]);

  const retrieveAllExercises = async () => {
    setIsLoading(true);
    const exercisesSnap: QuerySnapshot = await getDocs(queryAllExercisesOrdered);
    const exercisesRecordsFromDb = makeArrayFromSnapshot(exercisesSnap);
    setExercises(exercisesRecordsFromDb);
    setIsLoading(false);
  }

  const addExercise = async (data: ExerciseType) => {
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

export default useExercises;
