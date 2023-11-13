import BackButton from '@app/components/BackButton/BackButton';
import DisplayList from '@app/components/DisplayList/DisplayList';
import ListItemExercise from '@app/components/ListItemExercise/ListItemExercise';
import styles from '@app/pages/exercises/index.module.scss';
import { collectionExercises, firestoreDb } from '@app/services/firebase';
import { makeArrayFromSnapshot } from '@app/utils/makeNewArray';
import { doc, getDoc, getDocs, query, where } from '@firebase/firestore';
import { Grid, Typography } from '@mui/material';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const WorkoutView: NextPage = () => {
  const router = useRouter();
  const {workoutId} = router.query;
  const [workout, setWorkout] = useState(null);

  const retrieveWorkoutById = async () => {
    try {
      const workoutSnapshot = await getDoc(doc(firestoreDb, 'workouts', workoutId));
      const workoutData = workoutSnapshot.data();
      const exerciseIds = workoutData.exercises.map(exercise => exercise.id);

      const exercisesSnap = await getDocs(query(collectionExercises, where('id', 'in', exerciseIds)));
      const exercisesData = makeArrayFromSnapshot(exercisesSnap);

      setWorkout({
        ...workoutData,
        id: workoutSnapshot.id,
        exercises: exercisesData
      });
    } catch (e) {
      console.warn(e);
    }
  }

  useEffect(() => {
    if(workoutId) {
      retrieveWorkoutById();
    }
  }, [workoutId]);
  
  return (
    <Grid container spacing={2} className={styles.exerciseWrapper}>
      <Grid item xs={12} md={9}>
        <BackButton />

        {workout?.exercises && (
          <DisplayList
            items={workout?.exercises}
            renderChild={(exercise) =>
              <ListItemExercise key={exercise.id} exercise={exercise} />
            }
          />
        )}
      </Grid>
      <Grid item xs={12} md={3} flexDirection="column">
        <Typography variant="h5">
          <b>Workout:</b> {workout?.title}
        </Typography>
        <Typography paragraph color="text.secondary">
          {workout?.description}
        </Typography>
      </Grid>
    </Grid>
  )
}

export default WorkoutView;
