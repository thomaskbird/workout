import config from '@app/config/sites';
import { selectUser } from '@app/store/selectors/session';
import { useSession } from '@app/store/useSession';
import { Divider, Grid, ListItemText, MenuItem, MenuList, Paper, Typography } from '@mui/material';
import moment from 'moment';
import { NextPage } from 'next';
import {Timestamp} from "@firebase/firestore";

const HistoryView: NextPage = () => {
  const user = useSession(selectUser);
  const history = user?.history;

  const formatDate = (dateTimeStamp: Timestamp) => {
    const jsTimestamp = new Date(dateTimeStamp.seconds * 1000 + dateTimeStamp.nanoseconds / 1000000);
    return moment(jsTimestamp).format(config.momentFormat);
  }

  const formatDuration = (duration: string) => {
    const durationParts = duration.split(':');
    const hasHours = parseInt(durationParts[0], 10) > 0;
    const hasMinutes = parseInt(durationParts[1], 10) > 0;

    let formattedString = '';

    if(hasHours) {
      formattedString = `${durationParts[0]}hrs, ${durationParts[1]}mins and ${durationParts[0]}secs`;
    } else if(hasMinutes) {
      formattedString = `${durationParts[1]}mins and ${durationParts[0]}secs`;
    } else {
      formattedString = `${durationParts[2]}secs`;
    }

    return formattedString;
  }

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={9}>
        <Typography variant="h4">History</Typography>
        <Divider />

        <Paper style={{ marginTop: 20 }}>
          <MenuList component="div">
            {(history ?? []).map(item => (
              <MenuItem key={item.id} component="div">
                <ListItemText>{item?.workoutTitle}</ListItemText>
                <Typography variant="body2" color="text.secondary">
                  <>
                    <b>Completed:</b> {formatDate(item.workoutDate)}&nbsp;-&nbsp; <b>Duration:</b> {formatDuration(item.duration)}
                  </>
                </Typography>
                <Divider />
              </MenuItem>
            ))}
          </MenuList>
        </Paper>

      </Grid>
      <Grid item xs={12} md={3}>
        Sidebar
      </Grid>
    </Grid>
  )
}

export default HistoryView;
