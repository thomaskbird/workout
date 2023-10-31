import {addDoc, doc, getDoc, QuerySnapshot} from '@firebase/firestore';
import {collectionExercises, firestoreDb} from '@app/services/firebase';
import {makeArrayFromSnapshot} from '@app/utils/makeNewArray';
import {useEffect, useState} from 'react';
import {useGlobalStore} from '@app/store/useGlobalStore';
import {selectIsLoading, selectSetIsLoading} from '@app/store/selectors/globalStore';
import {ExerciseType} from '@app/types/types';
import {useSession} from '@app/store/useSession';
import {selectUser} from '@app/store/selectors/session';
import {getUserExercises} from '@app/services/exercises';

const useExercises = () => {
  const isLoading = useGlobalStore(selectIsLoading);
  const setIsLoading = useGlobalStore(selectSetIsLoading);
  const user = useSession(selectUser);

  const [exercises, setExercises] = useState<ExerciseType[]>([]);

  const retrieveAllExercises = async () => {
    setIsLoading(true);
    const exercisesRecordsFromDb = await getUserExercises(user.id);
    setExercises(exercisesRecordsFromDb);
    setIsLoading(false);
  }

  const retrieveExerciseById = async (id: string) => {
    try {
      setIsLoading(true);
      const exerciseSnapshot: QuerySnapshot = await getDoc(doc(firestoreDb, 'exercises', id));

      return {
        ...exerciseSnapshot.data(),
        id: exerciseSnapshot.id
      }
    } catch (e) {
      console.warn(e);
    } finally {
      setIsLoading(false);
    }
  }

  const addExercise = async (data: Partial<ExerciseType>) => {
    // todo: add thumbnail -> https://stackoverflow.com/questions/23640869/create-thumbnail-from-video-file-via-file-input#answer-69183556

    const dataWithUser: Partial<ExerciseType> = {
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
    retrieveAllExercises,
    retrieveExerciseById,
  }
}

export default useExercises;
