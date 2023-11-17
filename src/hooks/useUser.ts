import { firestoreDb } from '@app/services/firebase';
import { selectSetIsLoading } from '@app/store/selectors/globalStore';
import { selectSetUser, selectUser } from '@app/store/selectors/session';
import { useGlobalStore } from '@app/store/useGlobalStore';
import { useSession } from '@app/store/useSession';
import { UserHistory } from '@app/types/types';
import addOrRemove from '@app/utils/addOrRemove';
import { doc, updateDoc } from '@firebase/firestore';
import { useMemo } from 'react';

const useUser = () => {
  const user = useSession(selectUser);
  const setUser = useSession(selectSetUser);

  const setIsLoading = useGlobalStore(selectSetIsLoading);

  const userRef = useMemo(() => {
    if(user) {
      return doc(firestoreDb, 'users', user?.id);
    }

    return undefined;
  }, [user]);

  const updateUserFavs = async (field: 'favExercises' | 'favWorkouts', id: string): Promise<boolean> => {
    try {
      setIsLoading(true);
      const newIds = addOrRemove(user[field], id);

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
    } finally {
      setIsLoading(false);
    }
  }

  const updateUserHistory = async (newHistoryItem: UserHistory) => {
    try {
      const updatedUserHistory = user?.history ?? [];
      updatedUserHistory?.push(newHistoryItem);

      await updateDoc(userRef, {
        history: updatedUserHistory
      })
    } catch (e) {
      console.warn('Error: ', e);
      return Promise.resolve(false);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    updateUserFavs,
    updateUserHistory,
    favWorkouts: user?.favWorkouts,
    favExercises: user?.favExercises
  }
}

export default useUser;
