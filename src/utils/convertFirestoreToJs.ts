import {Timestamp} from "@firebase/firestore";

const convertFirestoreToJs = (dateTimeStamp: Timestamp): Date => {
  return new Date(dateTimeStamp.seconds * 1000 + dateTimeStamp.nanoseconds / 1000000);
}

export default convertFirestoreToJs;
