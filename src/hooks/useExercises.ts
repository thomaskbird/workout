import {addDoc, getDocs, QuerySnapshot} from '@firebase/firestore';
import {collectionExercises, queryAllExercisesOrdered} from '@app/services/firebase';
import {makeArrayFromSnapshot} from '@app/utils/makeNewArray';
import {useEffect, useState} from 'react';
import {useGlobalStore} from '@app/store/useGlobalStore';
import {selectIsLoading, selectSetIsLoading} from '@app/store/selectors/globalStore';
import {ExerciseType} from '@app/types/types';
import {useSession} from '@app/store/useSession';
import {selectUser} from '@app/store/selectors/session';

const useExercises = () => {
  const isLoading = useGlobalStore(selectIsLoading);
  const setIsLoading = useGlobalStore(selectSetIsLoading);
  const user = useSession(selectUser);

  const [exercises, setExercises] = useState<ExerciseType[]>([]);

  const retrieveAllExercises = async () => {
    setIsLoading(true);
    const exercisesSnap: QuerySnapshot = await getDocs(queryAllExercisesOrdered);
    const exercisesRecordsFromDb = makeArrayFromSnapshot(exercisesSnap);
    setExercises(exercisesRecordsFromDb);
    setIsLoading(false);
  }

  const addExercise = async (data: ExerciseType) => {
    // todo: add thumbnail -> https://stackoverflow.com/questions/23640869/create-thumbnail-from-video-file-via-file-input#answer-69183556

    const dataWithUser = {
      ...data,
      userId: user.id
    }

    try {
      setIsLoading(true);
      const exerciseRef = await addDoc(collectionExercises, dataWithUser);
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
