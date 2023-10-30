import {getDocs, where} from '@firebase/firestore';
import {query} from '@firebase/database';
import {collectionWorkouts} from '@app/services/firebase';

export const getUserWorkouts = async (userId: string) => {
  return getDocs(
    query(collectionWorkouts, where('userId', '==', userId))
  )
}
