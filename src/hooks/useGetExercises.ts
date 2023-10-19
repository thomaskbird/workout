import {getDocs, QuerySnapshot} from '@firebase/firestore';
import {queryAllExercisesOrdered} from '@app/services/firebase';
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

  useEffect(() => {
    retrieveAllExercises();
  }, []);

  return {
    isLoading,
    exercises,
    retrieveAllExercises
  }
}

export default useGetExercises;
