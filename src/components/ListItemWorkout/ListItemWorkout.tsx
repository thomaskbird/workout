import useUser from '@app/hooks/useUser';
import { selectUser } from '@app/store/selectors/session';
import { useSession } from '@app/store/useSession';
import { WorkoutType } from '@app/types/types';
import { Favorite as FavoriteIcon, Share as ShareIcon } from '@mui/icons-material';
import { Button, Card, CardActions, CardContent, IconButton, Typography } from '@mui/material';
import Link from 'next/link';
import styles from './ListItemWorkout.module.scss';

type WorkoutListItemType = {
  workout: WorkoutType
}

const ListItemWorkout = ({ workout }: WorkoutListItemType) => {
  const { updateUserField } = useUser();
  const user = useSession(selectUser);
  const userFavs = user?.favWorkouts;
  
  const handleFavoriteToggle = async () => await updateUserField('favWorkouts', workout.id);

  return (
    <Card className={styles.root}>
      <CardContent>
        <Typography variant="h5">
          {workout.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {workout.description}
        </Typography>
      </CardContent>
      <CardActions>
        <IconButton aria-label="add to favorites" onClick={handleFavoriteToggle}>
          <FavoriteIcon style={{ color: userFavs?.includes(workout.id) ? '#ff3766' : '#aaa' }} />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
        
        <Link href={`/workouts/${workout.id}`}>
          <Button size="small" style={{ marginLeft: 'auto'}}>View</Button>
        </Link>
      </CardActions>
    </Card>
  );
};

export default ListItemWorkout;
