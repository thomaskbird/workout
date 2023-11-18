import config from '@app/config/sites';
import { selectUser } from '@app/store/selectors/session';
import { useSession } from '@app/store/useSession';
import { Divider, Grid, ListItemText, MenuItem, MenuList, Paper, Typography } from '@mui/material';
import moment from 'moment';
import { NextPage } from 'next';

const HistoryView: NextPage = () => {
  const user = useSession(selectUser);
  const history = user?.history;

  console.log('history', user, history);
  if(!user || !history) {
    return null;
  }

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={9}>
        <Typography variant="h5">History</Typography>

        <Paper>
          <MenuList>
            {(history ?? []).map(item => (
              <MenuItem key={item.id}>
                <ListItemText>{item?.workoutTitle} - {moment(item.workoutDate).format(config.dateTimeFormat)}</ListItemText>
                <Typography variant="body2" color="text.secondary">
                  {item.duration}
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
