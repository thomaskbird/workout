import { selectUser } from '@app/store/selectors/session';
import { useSession } from '@app/store/useSession';
import { Divider, Grid, ListItemText, MenuItem, MenuList, Paper, Typography } from '@mui/material';
import { NextPage } from 'next';

const ProfileView: NextPage = () => {
  const user = useSession(selectUser);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={9}>
        <Typography variant="h5">Profile</Typography>

        <Paper>
          <MenuList>
            <MenuItem>
              <ListItemText>Name:</ListItemText>
              <Typography variant="body2" color="text.secondary">
                {user?.displayName}
              </Typography>
              <Divider />
            </MenuItem>
            <MenuItem>
              <ListItemText>Email:</ListItemText>
              <Typography variant="body2" color="text.secondary">
                {user?.email}
              </Typography>
              <Divider />
            </MenuItem>
          </MenuList>
        </Paper>
      </Grid>
      <Grid item xs={12} md={3}>
        TEST
      </Grid>
    </Grid>
  )
}

export default ProfileView;
