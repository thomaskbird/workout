import {useSession} from '@app/store/useSession';
import {selectSetUser, selectUser} from '@app/store/selectors/session';
import { firestoreDb } from '@app/services/firebase';
import {addDoc, doc, updateDoc, getDoc, QuerySnapshot} from '@firebase/firestore';
import { CompiledUserTypes } from '@app/store/types/session';

const useUser = () => {
  const user = useSession(selectUser);
  const setUser = useSession(selectSetUser);

  const updateUserField = async (field: 'favExercises' | 'favWorkouts', id: string): Promise<boolean> => {
    try {
      let newIds: string[] = [];
      let existing: string[] = user[field] ?? [];

      if (!existing.includes(id)) {
        newIds = [...existing, id];
      } else {
        newIds = existing.filter(fav => fav !== id);
      }

      const userRef = doc(firestoreDb, 'users', user!.id);
      await updateDoc(userRef, {
        [field]: newIds
      });

      // todo: update the store
      setUser({
        ...user,
        [field]: newIds
      });

      return Promise.resolve(true);
    } catch (e) {
      console.warn('Error: ', e);
      return Promise.resolve(false);
    }
  }

  return {
    updateUserField,
    favWorkouts: user?.favWorkouts,
    favExercises: user?.favExercises
  }
}

export default useUser;
