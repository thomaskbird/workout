import useCounter from "@app/hooks/useCounter";
import { Button, Card, CardActions, CardContent, Typography } from "@mui/material";
import styles from './Counter.module.scss';

const Counter = () => {
  const { current, start, pause, reset, isRunning } = useCounter(
    5,
    () => console.log("started"),
    () => console.log("ended"),
  );
  
  return (
    <Card>
      <CardContent>
        <Typography variant="h1" className={styles.main}>{current}</Typography>
      </CardContent>
      <CardActions>
        {isRunning ? (
          <Button color="inherit" onClick={pause}>Pause</Button>
        ): (
          <Button color="primary" onClick={start} disabled={current === 0}>Start</Button>
        )}
        <Button color="error" onClick={reset}>Reset</Button>
      </CardActions>
    </Card>
  )
}

export default Counter;