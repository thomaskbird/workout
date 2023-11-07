import { collectionExercises } from '@app/services/firebase';
import { ExerciseType } from '@app/types/types';
import { makeArrayFromSnapshot } from '@app/utils/makeNewArray';
import { query } from '@firebase/database';
import { getDocs, orderBy, where } from '@firebase/firestore';

export const getUserExercises = async (userId: string): Promise<ExerciseType[]> => {
  const exercisesSnap = await getDocs(
    query(collectionExercises, where('userId', '==', userId), orderBy('createdAt', 'desc'))
  );
  return makeArrayFromSnapshot(exercisesSnap);
}
