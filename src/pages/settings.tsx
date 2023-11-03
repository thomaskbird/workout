import IosSwitch from '@app/components/Switch/Switch';
import { Divider, FormControlLabel, Grid, ListItemText, MenuItem, MenuList, Paper, Typography } from '@mui/material';
import { NextPage } from 'next';
import { useState } from 'react';

const SettingsView: NextPage = () => {
  const [units, setUnits] = useState(false);
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={9}>
        <Typography variant="h5">Profile</Typography>

        <Paper>
          <MenuList>
            <MenuItem>
              <ListItemText>Measurement units:</ListItemText>
              <FormControlLabel
                control={<IosSwitch onChange={(evt, val) => setUnits(val)} style={{ marginRight: 10 }} />}
                label={units ? 'Imperial' : 'Metric'}
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
