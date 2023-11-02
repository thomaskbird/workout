import { firestoreDb } from '@app/services/firebase';
import { selectSetUser, selectUser } from '@app/store/selectors/session';
import { useSession } from '@app/store/useSession';
import addOrRemove from '@app/utils/addOrRemove';
import { doc, updateDoc } from '@firebase/firestore';

const useUser = () => {
  const user = useSession(selectUser);
  const setUser = useSession(selectSetUser);

  const updateUserField = async (field: 'favExercises' | 'favWorkouts', id: string): Promise<boolean> => {
    try {
      const newIds = addOrRemove(user[field], id);

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
