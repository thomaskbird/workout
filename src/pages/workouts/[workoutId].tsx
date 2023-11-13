import BackButton from '@app/components/BackButton/BackButton';
import DisplayList from '@app/components/DisplayList/DisplayList';
import ListItemExercise from '@app/components/ListItemExercise/ListItemExercise';
import useWorkouts from '@app/hooks/useWorkouts';
import styles from '@app/pages/exercises/index.module.scss';
import { Grid, Typography } from '@mui/material';
import { NextPage } from 'next';
import { useRouter } from 'next/router';

const WorkoutView: NextPage = () => {
  const router = useRouter();
  const {workoutId} = router.query;
  const {workout} = useWorkouts(workoutId);
  
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
