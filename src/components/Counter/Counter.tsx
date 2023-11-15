import useCounter from "@app/hooks/useCounter";
import { Button, Grid, Typography } from "@mui/material";

const Counter = () => {
  const { current, start, pause, reset, isRunning } = useCounter(
    5,
    () => console.log("started"),
    () => console.log("ended"),
  );
  
  return (
    <Grid>
      <Typography>Counter</Typography>
      <Typography>Current: {current}</Typography>

      {isRunning ? (
        <Button color="inherit" onClick={pause}>Pause</Button>
      ): (
        <Button color="primary" onClick={start}>Start</Button>
      )}
    
      <Button color="error" onClick={reset}>Reset</Button>
    </Grid>
  )
}

export default Counter;