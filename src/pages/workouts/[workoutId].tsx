import {NextPage} from 'next';
import {Grid, Typography} from '@mui/material';
import {useRouter} from 'next/router';
import useWorkouts from '@app/hooks/useWorkouts';
import React, {useEffect} from 'react';
import styles from '@app/pages/exercises/index.module.scss';
import ListItemExercise from '@app/components/ListItemExercise/ListItemExercise';
import DisplayList from '@app/components/DisplayList/DisplayList';

const WorkoutView: NextPage = () => {
  const router = useRouter();
  const {workoutId} = router.query;
  const { isLoading, workout, setId } = useWorkouts();

  useEffect(() => {
    setId(workoutId);
  }, [workoutId]);


  return (
    <Grid container spacing={2} className={styles.exerciseWrapper} flexDirection="column">
      <Grid item xs={12} md={9}>
        {!isLoading && workout?.exercises && (
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
        <Typography paragraph>
          {workout?.description}
        </Typography>
      </Grid>
    </Grid>
  )
}

export default WorkoutView;
