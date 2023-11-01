import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  IconButton,
  Typography
} from '@mui/material';
import {
  MoreVert as MoreVertIcon,
  Favorite as FavoriteIcon,
  Share as ShareIcon,
} from '@mui/icons-material';
import styles from './ListItemExercise.module.scss';
import moment from 'moment';
import config from '@app/config/sites';
import StyledLink from '@app/components/StyledLink/StyledLink';

type ExerciseDisplayItemProps = {
  exercise: any;
}

const ListItemExercise = ({ exercise }: ExerciseDisplayItemProps) => {
  return (
    <Card className={styles.root}>
      <CardHeader
        // avatar={
        //   <Avatar sx={{ bgcolor: '#ccc' }} aria-label={exercise.title} title={exercise.title}>
        //     {exercise.title.charAt(0)}
        //   </Avatar>
        // }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={<StyledLink base="/exercises/" id={exercise.id} title={exercise.title} />}
        subheader={exercise?.createdAt ? moment(exercise?.createdAt.toDate()).format(config.momentFormatWoTimestamp) : 'Unknown'}
      />
      {exercise?.thumbnail && (
        <CardMedia
          component="img"
          alt={exercise.title}
          image={exercise.thumbnail}
          style={{
            maxHeight: '200px'
          }}
        />
      )}
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {exercise.description}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
      </CardActions>
    </Card>
  )
}

export default ListItemExercise;
