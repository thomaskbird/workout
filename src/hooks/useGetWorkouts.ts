import {getDocs, QuerySnapshot} from '@firebase/firestore';
import {queryAllExercisesOrdered, queryAllWorkoutsOrdered} from '@app/services/firebase';
import {makeArrayFromSnapshot} from '@app/utils/makeNewArray';
import {useEffect, useState} from 'react';

const useGetWorkouts = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [workouts, setWorkouts] = useState([]);
  const retrieveAllWorkouts = async () => {
    setIsLoading(true);
    const workoutsSnapshot: QuerySnapshot = await getDocs(queryAllWorkoutsOrdered);
    const workoutsRecordsFromDb = makeArrayFromSnapshot(workoutsSnapshot);
    setWorkouts(workoutsRecordsFromDb);
    setIsLoading(false);
  }

  useEffect(() => {
    retrieveAllWorkouts();
  }, []);

  return {
    isLoading,
    workouts,
    retrieveAllWorkouts
  }
}

export default useGetWorkouts;
