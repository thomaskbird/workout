import { getApp, getApps, initializeApp } from "@firebase/app";
import { collection, getFirestore, orderBy } from "@firebase/firestore";
import moment from "moment";
import config from "../config/sites";
import { query } from "@firebase/database";
import { FirestoreDatabase } from "@firebase/firestore-compat/dist/src/index.console";

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
let thomaskbird = null;

try {
  if (!getApps().length) {
    thomaskbird = initializeApp(firebaseConfig);
  } else {
    thomaskbird = getApp();
  }

  firestoreDb = getFirestore(thomaskbird);
} catch (e) {
  console.log("e", e);
}

const collectionJobs = collection(firestoreDb, "jobs");
const collectionPortfolio = collection(firestoreDb, "portfolio");
const collectionContacts = collection(firestoreDb, "contacts");
const collectionContent = collection(firestoreDb, "content");
const collectionContentTags = collection(firestoreDb, "contentTags");
const collectionServices = collection(firestoreDb, "services");
const collectionSkills = collection(firestoreDb, "skills");
const collectionTags = collection(firestoreDb, "tags");
const collectionUploads = collection(firestoreDb, "uploads");

const queryAllPortfolioOrdered = query(collectionPortfolio);
const queryAllJobsOrdered = query(collectionJobs, orderBy("endAt", "desc"));
const queryAllContactsOrdered = query(collectionContacts);
const queryAllContentOrdered = query(collectionContent);
const queryAllContentTagsOrdered = query(collectionContentTags);
const queryAllServicesOrdered = query(collectionServices);
const queryAllSkillsOrdered = query(collectionSkills);
const queryAllTagsOrdered = query(collectionTags);
const queryAllUploadsOrdered = query(collectionUploads);

export {
  firestoreDb,
  thomaskbird,
  renderFirestoreTimestamp,
  collectionJobs,
  collectionPortfolio,
  collectionContacts,
  collectionContent,
  collectionContentTags,
  collectionServices,
  collectionSkills,
  collectionTags,
  collectionUploads,
  queryAllJobsOrdered,
  queryAllPortfolioOrdered,
  queryAllContactsOrdered,
  queryAllContentOrdered,
  queryAllContentTagsOrdered,
  queryAllServicesOrdered,
  queryAllSkillsOrdered,
  queryAllTagsOrdered,
  queryAllUploadsOrdered,
};
