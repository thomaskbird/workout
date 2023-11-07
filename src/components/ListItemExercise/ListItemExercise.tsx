import StyledLink from '@app/components/StyledLink/StyledLink';
import config from '@app/config/sites';
import useExercises from '@app/hooks/useExercises';
import useUser from '@app/hooks/useUser';
import { selectUser } from '@app/store/selectors/session';
import { useSession } from '@app/store/useSession';
import { ExerciseType } from '@app/types/types';
import prompter from '@app/utils/prompter';
import {
  Delete as DeleteIcon,
  Favorite as FavoriteIcon,
  Share as ShareIcon
} from '@mui/icons-material';
import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  IconButton,
  Typography
} from '@mui/material';
import moment from 'moment';
import { useRouter } from 'next/router';
import ListItemMenu from '../ListItemMenu/ListItemMenu';
import { MenuItemType } from '../ListItemMenu/ListItemMenu.types';
import styles from './ListItemExercise.module.scss';

type ListItemExerciseProps = {
  exercise: ExerciseType;
}

const ListItemExercise = ({ exercise }: ListItemExerciseProps) => {
  const router = useRouter();
  const { updateUserField } = useUser();
  const { removeExercise } = useExercises();

  const user = useSession(selectUser);
  const userFavs = user?.favExercises;

  const listItems: MenuItemType[] = [
    {
      icon: <DeleteIcon fontSize="small" />,
      onAction: () => {
        prompter('Are you sure you want to delete this? It can\'t be undone', async () => {
          const result = await removeExercise(exercise.id!);
          if(result) {
            router.reload();
          }
        });
      },
      text: 'Delete'
    }
  ];

  const handleFavoriteToggle = async () => await updateUserField('favExercises', exercise.id!);

  if(!exercise) return null;
  
  return (
    <Card className={styles.root}>
      <CardHeader
        // avatar={
        //   <Avatar sx={{ bgcolor: '#ccc' }} aria-label={exercise.title} title={exercise.title}>
        //     {exercise.title.charAt(0)}
        //   </Avatar>
        // }
        action={<ListItemMenu listItems={listItems} />}
        title={<StyledLink base="/exercises/" id={exercise.id} title={exercise.title} />}
        subheader={exercise?.createdAt ? moment(exercise?.createdAt.toDate()).format(config.momentFormatWoTimestamp) : 'Unknown'}
      />
      {exercise?.thumbnail && (
        <CardMedia
          component="img"
          alt={exercise.title}
          image={exercise.thumbnail}
          className={styles.media}
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
        <IconButton aria-label="add to favorites" onClick={handleFavoriteToggle}>
          <FavoriteIcon style={{ color: user?.favExercises?.includes(exercise.id) ? '#ff3766' : '#aaa' }} />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
      </CardActions>
    </Card>
  )
}

export default ListItemExercise;
