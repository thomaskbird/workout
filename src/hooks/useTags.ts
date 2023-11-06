import { collectionTags, firestoreDb, queryAllTagsOrdered } from '@app/services/firebase';
import { selectIsLoading, selectSetIsLoading } from '@app/store/selectors/globalStore';
import { selectUser } from '@app/store/selectors/session';
import { useGlobalStore } from '@app/store/useGlobalStore';
import { useSession } from '@app/store/useSession';
import { TagType } from '@app/types/types';
import { makeArrayFromSnapshot } from '@app/utils/makeNewArray';
import makeSlug from '@app/utils/makeSlug';
import { QuerySnapshot, Timestamp, addDoc, doc, getDoc, getDocs } from '@firebase/firestore';
import { useEffect, useState } from 'react';

type UseTagsReturn = {
  isLoading: boolean;
  tags: TagType[];
  addTag(tag: string): Promise<TagType>;
}

const useTags = (): UseTagsReturn => {
  const user = useSession(selectUser);

  const isLoading = useGlobalStore(selectIsLoading);
  const setIsLoading = useGlobalStore(selectSetIsLoading);

  const [tags, setTags] = useState<TagType[]>([]);

  const retrieveAllTags = async () => {
    try {
      setIsLoading(true);
      const tagsSnapshot: QuerySnapshot = await getDocs(queryAllTagsOrdered);
      const tagsFromDb = makeArrayFromSnapshot(tagsSnapshot);
      const tagsSorted = tagsFromDb.sort().reverse();

      setTags(tagsSorted);
    } catch (e) {
      console.warn('Error: ', e);
    } finally {
      setIsLoading(false);
    }
  }

  // todo: instead of just setTags add new ones and then update existing tags with the new queried result
  const addTag = async (tag: string) => {
    setIsLoading(true);
    const tagData: Partial<TagType> = {
      tag: tag,
      slug: makeSlug(tag),
      userId: user.id,
      createdAt: Timestamp.now()
    };
    try {
      const tagRef = await addDoc(collectionTags, tagData);
      if(tagRef?.id) {
        retrieveAllTags();
      }

      const newlyAddedTag = await getDoc(doc(firestoreDb, 'tags', tagRef.id));

      return {
        ...newlyAddedTag.data(),
        id: tagRef?.id
      }
    } catch (e) {
      console.warn('Error:',e);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    retrieveAllTags();
  }, []);

  return {
    isLoading,
    tags,
    addTag,
  }
}

export default useTags;
