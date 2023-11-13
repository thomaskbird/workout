import { getUserExercises } from '@app/services/exercises';
import { collectionExercises, firestoreDb } from '@app/services/firebase';
import { selectIsLoading, selectSetIsLoading } from '@app/store/selectors/globalStore';
import { selectUser } from '@app/store/selectors/session';
import { useGlobalStore } from '@app/store/useGlobalStore';
import { useSession } from '@app/store/useSession';
import { ExerciseType } from '@app/types/types';
import { QuerySnapshot, addDoc, deleteDoc, doc, getDoc } from '@firebase/firestore';
import { useCallback, useEffect, useState } from 'react';

const useExercises = (id?: string) => {
  const isLoading = useGlobalStore(selectIsLoading);
  const setIsLoading = useGlobalStore(selectSetIsLoading);
  const user = useSession(selectUser);

  const [exercise, setExercise] = useState<ExerciseType | undefined>(undefined);
  const [exercises, setExercises] = useState<ExerciseType[]>([]);

  const retrieveAllExercises = useCallback(async () => {
    if(user) {
      setIsLoading(true);
      const exercisesRecordsFromDb = await getUserExercises(user.id);
      setExercises(exercisesRecordsFromDb);
      setIsLoading(false);
    }
  }, [user]);

  const retrieveExerciseById = useCallback(async () => {
    if(id) {
      setIsLoading(true);
      try {
        const exerciseSnapshot: QuerySnapshot = await getDoc(doc(firestoreDb, 'exercises', id));

        setExercise({
          ...exerciseSnapshot.data(),
        });
      } catch (e) {
        console.warn(e);
      } finally {
        setIsLoading(false);
      }
    } else {
      console.warn('No id available');
    }
  }, [id]);

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
    retrieveAllExercises(); 
  }, [user]);

  useEffect(() => {
    retrieveExerciseById();
  }, [id]);

  return {
    isLoading,
    exercise,
    exercises,
    addExercise,
    retrieveAllExercises,
    retrieveExerciseById,
    removeExercise,
  }
}

export default useExercises;
