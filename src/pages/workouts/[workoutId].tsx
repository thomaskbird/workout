import {NextPage} from 'next';
import {Typography} from '@mui/material';
import {useRouter} from 'next/router';
import useWorkouts from '@app/hooks/useWorkouts';
import {useEffect} from 'react';

const WorkoutView: NextPage = () => {
  const router = useRouter();
  const {workoutId} = router.query;
  const { isLoading, workout, setId } = useWorkouts();
  console.log('workout', workout);
  useEffect(() => {
    setId(workoutId);
  }, [workoutId]);
  console.log('router', router.query);

  return (
    <Typography>
      Workout
    </Typography>
  )
}

export default WorkoutView;
