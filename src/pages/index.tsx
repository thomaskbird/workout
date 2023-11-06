import CardChart from '@app/components/CardChart/CardChart';
import CardUpcomingWorkouts from '@app/components/CardUpcomingWorkouts/CardUpcomingWorkouts';
import { lastMonthVsThisMonth, lastWeekVsThisWeek, options } from '@app/config/dashboard.config';
import { Grid } from '@mui/material';
import { NextPage } from 'next';
import styles from './index.module.scss';

const IndexView: NextPage = () => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={12} className={styles.root}>
        <CardChart
          type="line"
          options={options}
          data={lastWeekVsThisWeek}
          title="Last week vs this week"
          description="Looks like you're picking up steam, remember to keep it up!"
        />

        <CardChart 
          type="bar"
          options={options}
          data={lastMonthVsThisMonth}
          title="Last month vs this month"
          description="Looks like your not quite as far in your progress this month as last month, but if you pick up the pace you can still exceed last months numbers!"
        />

        <CardUpcomingWorkouts />
      </Grid>
    </Grid>
  );
}

export default IndexView
