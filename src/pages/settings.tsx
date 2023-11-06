import IosSwitch from '@app/components/Switch/Switch';
import { Divider, FormControlLabel, Grid, ListItemText, MenuItem, MenuList, Paper, Typography } from '@mui/material';
import { NextPage } from 'next';
import { useState } from 'react';

// todo: https://mui.com/material-ui/react-list/#switch

const SettingsView: NextPage = () => {
  const [units, setUnits] = useState(false);
  const [emails, setEmails] = useState(false);
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={9}>
        <Typography variant="h5">Profile</Typography>

        <Paper>
          <MenuList>
            <MenuItem>
              <ListItemText>Measurement units:</ListItemText>
              <FormControlLabel
                control={<IosSwitch onChange={(evt, val) => setUnits(val)} />}
                label={units ? 'Imperial' : 'Metric'}
                labelPlacement="start"
              />
              <Divider />
            </MenuItem>
            <MenuItem>
              <ListItemText>Receive emails:</ListItemText>
              <FormControlLabel
                control={<IosSwitch onChange={(evt, val) => setEmails(val)} />}
                label={emails ? 'Yes' : 'No'}
                labelPlacement="start"
              />
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

export default SettingsView;
