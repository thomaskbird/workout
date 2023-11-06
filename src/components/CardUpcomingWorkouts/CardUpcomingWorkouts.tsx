import FavoriteIcon from '@mui/icons-material/Favorite';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ShareIcon from '@mui/icons-material/Share';
import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import ScrollableList from '../ScrollableList/ScrollableList';

const CardUpcomingWorkouts = () => {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            R
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title="Upcoming workouts this week"
        subheader="September 14, 2016"
      />

      <ScrollableList
        items={[
          { primary: 'Leg quickness & Strength', secondary: 'In 2 days' },
          { primary: 'Upper arms', secondary: 'In 3 days' },
          { primary: 'Power Skating', secondary: 'In 5 days' },
          { primary: 'Shot quickness and power', secondary: 'In 6 days' },
          { primary: 'Leg quickness & Strength', secondary: 'In 2 days' },
          { primary: 'Upper arms', secondary: 'In 3 days' },
          { primary: 'Power Skating', secondary: 'In 5 days' },
          { primary: 'Shot quickness and power', secondary: 'In 6 days' },
        ]}
      />

      <CardContent>
        <Typography variant="body2" color="text.secondary">
          You have 4 new workouts coming up this week, keep on track and you can still hit your weekly goal of every other day.
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
  );
}

export default CardUpcomingWorkouts;