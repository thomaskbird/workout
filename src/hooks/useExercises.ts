import { getUserExercises } from '@app/services/exercises';
import { collectionExercises, firestoreDb } from '@app/services/firebase';
import { selectIsLoading, selectSetIsLoading } from '@app/store/selectors/globalStore';
import { selectUser } from '@app/store/selectors/session';
import { useGlobalStore } from '@app/store/useGlobalStore';
import { useSession } from '@app/store/useSession';
import { ExerciseType } from '@app/types/types';
import { QuerySnapshot, addDoc, deleteDoc, doc, getDoc } from '@firebase/firestore';
import { useEffect, useState } from 'react';

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

  const removeExercise = async (exerciseId: string) => {
    try {
      setIsLoading(true);
      const exerciseRef = doc(firestoreDb, 'exercises', exerciseId);
      await deleteDoc(exerciseRef);

      return Promise.resolve(true);
    } catch (e) {
      console.warn('Error: ', e);
      Promise.resolve(false);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if (user) {
      retrieveAllExercises(); 
    }
  }, [user]);

  return {
    isLoading,
    exercises,
    addExercise,
    retrieveAllExercises,
    retrieveExerciseById,
    removeExercise,
  }
}

export default useExercises;
