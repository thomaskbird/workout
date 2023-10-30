import {getDocs, where} from '@firebase/firestore';
import {query} from '@firebase/database';
import {collectionExercises} from '@app/services/firebase';

export const getUserExercises = async (userId: string) => {
  return getDocs(
    query(collectionExercises, where('userId', '==', userId))
  )
}
