import {getDocs, where} from '@firebase/firestore';
import {query} from '@firebase/database';
import {collectionExercises} from '@app/services/firebase';
import {makeArrayFromSnapshot} from '@app/utils/makeNewArray';
import {ExerciseType} from '@app/types/types';

export const getUserExercises = async (userId: string): Promise<ExerciseType[]> => {
  const exercisesSnap = await getDocs(
    query(collectionExercises, where('userId', '==', userId))
  );
  const exercisesRecordsFromDb = makeArrayFromSnapshot(exercisesSnap);
  return exercisesRecordsFromDb;
}
