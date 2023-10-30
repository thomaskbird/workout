import { getApp, getApps, initializeApp } from "@firebase/app";
import {Auth, getAuth} from '@firebase/auth';
import {collection, Firestore, getFirestore, orderBy} from "@firebase/firestore";
import moment from "moment";
import config from "../config/sites";
import { query } from "@firebase/database";
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

let workoutApp = null;
let firestoreDb: Firestore | null = null;
let firebaseAuth: null | Auth = null;
let firebaseStorage: FirebaseStorage | null = null;

try {
  if (!getApps().length) {
    workoutApp = initializeApp(firebaseConfig);
  } else {
    workoutApp = getApp();
  }

  firestoreDb = getFirestore(workoutApp);
  firebaseAuth = getAuth(workoutApp);

  // todo: may need this `gs://workout-43f00.appspot.com/` as second param
  firebaseStorage = getStorage(workoutApp);
} catch (e) {
  console.log("e", e);
}

const collectionExercises = collection(firestoreDb!, 'exercises');
const collectionWorkouts = collection(firestoreDb!, 'workouts');
const collectionUsers = collection(firestoreDb!, 'users');

const queryAllExercisesOrdered = query(collectionExercises);
const queryAllWorkoutsOrdered = query(collectionWorkouts);

export {
  workoutApp,
  firestoreDb,
  firebaseStorage,
  firebaseAuth,
  renderFirestoreTimestamp,
  collectionExercises,
  collectionWorkouts,
  collectionUsers,
  queryAllExercisesOrdered,
  queryAllWorkoutsOrdered
};
