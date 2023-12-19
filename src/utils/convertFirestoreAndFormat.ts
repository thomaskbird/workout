import formatDate from "@app/utils/formatDate";
import convertFirestoreToJs from "@app/utils/convertFirestoreToJs";
import {Timestamp} from "@firebase/firestore";

const convertFirestoreAndFormat = (firestoreTimestamp: Timestamp): string => {
  return formatDate(convertFirestoreToJs(firestoreTimestamp));
}

export default convertFirestoreAndFormat;
