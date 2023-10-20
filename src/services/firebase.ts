import { getApp, getApps, initializeApp } from "@firebase/app";
import { collection, getFirestore, orderBy } from "@firebase/firestore";
import moment from "moment";
import config from "../config/sites";
import { query } from "@firebase/database";
import { FirestoreDatabase } from "@firebase/firestore-compat/dist/src/index.console";
import {FirebaseStorage, getStorage, ref} from '@firebase/storage';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_APP_ID,
};

const renderFirestoreTimestamp = (timestamp: any) =>
  moment(timestamp.toDate()).format(config.momentFormat);

let firestoreDb: FirestoreDatabase | null = null;
let firebaseStorage: FirebaseStorage | null = null;
let workoutApp = null;

try {
  if (!getApps().length) {
    workoutApp = initializeApp(firebaseConfig);
  } else {
    workoutApp = getApp();
  }

  firestoreDb = getFirestore(workoutApp);

  // todo: may need this `gs://workout-43f00.appspot.com/` as second param
  firebaseStorage = getStorage(workoutApp);
} catch (e) {
  console.log("e", e);
}

const collectionExercises = collection(firestoreDb, 'exercises');
const collectionWorkouts = collection(firestoreDb, 'workouts');

const queryAllExercisesOrdered = query(collectionExercises);
const queryAllWorkoutsOrdered = query(collectionWorkouts);

export {
  workoutApp,
  firestoreDb,
  firebaseStorage,
  renderFirestoreTimestamp,
  collectionExercises,
  collectionWorkouts,
  queryAllExercisesOrdered,
  queryAllWorkoutsOrdered
};