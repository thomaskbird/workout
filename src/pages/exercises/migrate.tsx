import { collectionExercises, firestoreDb } from "@app/services/firebase";
import { selectUser } from "@app/store/selectors/session";
import { useSession } from "@app/store/useSession";
import { makeArrayFromSnapshot } from "@app/utils/makeNewArray";
import { doc, getDocs, orderBy, query, updateDoc, where } from '@firebase/firestore';
import { NextPage } from "next";

const Migrate: NextPage = () => {
  const user = useSession(selectUser);

  const retrieveAllExercises = async () => {
    const exercisesSnap = await getDocs(
      query(collectionExercises, where('userId', '==', user!.id), orderBy('createdAt', 'desc'))
    );
    const exercisesFromDb = makeArrayFromSnapshot(exercisesSnap);
    console.log('exercisesFromDb', exercisesFromDb);

    exercisesFromDb.forEach(async (exercise) => {
      await updateDoc(doc(firestoreDb, 'exercises', exercise.id), exercise);
    });
  }

  return (
    <div>
      <h1>Migrate</h1>

      <button 
        type="button"
        onClick={retrieveAllExercises}
      >
        Migrate
      </button>
    </div>
  );
}

export default Migrate;