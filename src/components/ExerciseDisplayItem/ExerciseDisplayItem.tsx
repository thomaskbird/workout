import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia, Collapse,
  IconButton,
  IconButtonProps, styled,
  Typography
} from '@mui/material';
import Avatar from '@mui/material/Avatar';
import {
  MoreVert as MoreVertIcon,
  Favorite as FavoriteIcon,
  Share as ShareIcon,
  ExpandMore as ExpandMoreIcon
} from '@mui/icons-material';
import {useState} from 'react';
import styles from './ExerciseDisplayItem.module.scss';
import moment from 'moment';
import config from '@app/config/sites';

type ExerciseDisplayItemProps = {
  exercise: any;
}

type ExpandMoreProps = IconButtonProps & {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

const ExerciseDisplayItem = ({ exercise }: ExerciseDisplayItemProps) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <Card sx={{ maxWidth: 300 }} className={styles.root}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: '#ccc' }} aria-label="recipe">
            R
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={exercise.title}
        subheader={exercise?.createdAt ? moment(exercise?.createdAt.toDate()).format(config.momentFormatWoTimestamp) : 'Unknown'}
      />
      <CardMedia
        component="img"
        height="194"
        image="https://talkingmeals.com/wp-content/uploads/2021/08/Birria-Tacos-Recipe-POST-OH-vert-Sauce-on-left-e1628267862856.jpg"
        alt="Paella dish"
      />
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
        <ExpandMore
          expand={expanded}
          onClick={() => setExpanded(!expanded)}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography variant="h6">Description:</Typography>
          <Typography paragraph>
            {exercise.description}
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  )
}

export default ExerciseDisplayItem;
