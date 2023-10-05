// import {collection, getDocs} from '@firebase/firestore';
// import {firestoreDb} from '~/helpers/firebase';
//
// export const retrieveAllClients = async () => {
//   const clientsFromDb: any = [];
//   const clientSnapshot = await getDocs(collection(firestoreDb, 'clients'));
//   clientSnapshot.forEach((client) => {
//     clientsFromDb.push({
//       ...client.data(),
//       id: client.id,
//     })
//   });
//
//   return clientsFromDb;
// }
