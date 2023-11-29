import { selectUser } from '@app/store/selectors/session';
import { useSession } from '@app/store/useSession';
import { Divider, Grid, ListItemText, MenuItem, MenuList, Paper, Typography } from '@mui/material';
import { NextPage } from 'next';

const HistoryView: NextPage = () => {
  const user = useSession(selectUser);
  const history = user?.history;


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
