import {Card, CardActions, CardContent, Typography, Button} from '@mui/material';
import {WorkoutType} from '@app/types/types';
import Link from 'next/link';
import styles from './ListItemWorkout.module.scss';

type WorkoutListItemType = {
  workout: WorkoutType
}

const ListItemWorkout = ({ workout }: WorkoutListItemType) => {
  return (
    <Card className={styles.root}>
      <CardContent>
        <Typography variant="h5" component="div">
          {workout.title}
        </Typography>
        <Typography variant="body2">
          {workout.description}
        </Typography>
      </CardContent>
      <CardActions>
        <Link href={`/workouts/${workout.id}`}>
          <Button size="small">Learn More</Button>
        </Link>
      </CardActions>
    </Card>
  );
};

export default ListItemWorkout;
