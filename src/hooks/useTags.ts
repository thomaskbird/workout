import {useEffect, useState} from 'react';
import {getDocs, QuerySnapshot} from '@firebase/firestore';
import {queryAllTagsOrdered} from '@app/services/firebase';
import {makeArrayFromSnapshot} from '@app/utils/makeNewArray';
import {useGlobalStore} from '@app/store/useGlobalStore';
import {selectIsLoading, selectSetIsLoading} from '@app/store/selectors/globalStore';

const useTags = () => {
  const isLoading = useGlobalStore(selectIsLoading);
  const setIsLoading = useGlobalStore(selectSetIsLoading);

  const [tags, setTags] = useState([]);

  useEffect(() => {
    const retrieveAllTags = async () => {
      try {
        setIsLoading(true);
        const tagsSnapshot: QuerySnapshot = await getDocs(queryAllTagsOrdered);
        const tagsFromDb = makeArrayFromSnapshot(tagsSnapshot);

        setTags(tagsFromDb);
      } catch (e) {
        console.warn('Error: ', e);
      } finally {
        setIsLoading(false);
      }
    }

    retrieveAllTags();
  }, []);

  return {
    isLoading,
    tags,
    setTags,
  }
}

export default useTags;
