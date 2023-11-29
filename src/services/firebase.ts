import { getApp, getApps, initializeApp } from "@firebase/app";
import { Auth, getAuth } from '@firebase/auth';
import { query } from "@firebase/database";
import { Firestore, collection, getFirestore, orderBy } from "@firebase/firestore";
import { FirebaseStorage, getStorage } from '@firebase/storage';
import moment from "moment";
import config from "../config/sites";

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
const collectionTags = collection(firestoreDb!, 'tags');

const queryAllExercisesOrdered = query(collectionExercises);
const queryAllWorkoutsOrdered = query(collectionWorkouts);
const queryAllTagsOrdered = query(collectionTags, orderBy('slug', 'desc'));

export {
  collectionExercises,
  collectionTags,
  collectionUsers,
  collectionWorkouts,
  firebaseAuth,
  firebaseStorage,
  firestoreDb,
  queryAllExercisesOrdered,
  queryAllTagsOrdered,
  queryAllWorkoutsOrdered,
  renderFirestoreTimestamp,
  workoutApp
};

