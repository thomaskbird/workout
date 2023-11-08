import { firestoreDb } from '@app/services/firebase';
import { query } from '@firebase/database';
import { QuerySnapshot, addDoc, collection, doc, getDoc, getDocs, where } from '@firebase/firestore';
import { makeArrayFromSnapshot } from './makeNewArray';

type FindOrCreateType = (
  collectionName: string,
  property: string,
  val: string,
  data: any,
) => Promise<any>;

const findOrCreate: FindOrCreateType = async (
  collectionName,
  property,
  val,
  data,
) => {
  try {
    const collectionForQuery = collection(firestoreDb, collectionName);

    const snapShot: QuerySnapshot = await getDocs(
      query(
        collectionForQuery,
        where(property, '==', val)
      )
    );

    if(snapShot.empty) {
      const createdRef = await addDoc(
        collectionForQuery,
        data
      );

      const newlyAddedItem = await getDoc(doc(firestoreDb, collectionName, createdRef.id));

      return Promise.resolve({
        ...newlyAddedItem.data(),
        id: createdRef?.id
      });
    } else {
      const records = makeArrayFromSnapshot(snapShot);
      if(records.length === 1) {
        return Promise.resolve(records[0]);
      } else {
        return Promise.resolve(records);
      }
    }
  } catch (e) {
    return Promise.reject(e);
  }
};

export default findOrCreate;