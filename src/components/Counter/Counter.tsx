import useCounter from "@app/hooks/useCounter";
import { Pause, PlayArrow, RestartAlt } from "@mui/icons-material";
import { Button, Card, CardActions, CardContent, Typography } from "@mui/material";
import styles from './Counter.module.scss';

export type CounterProps = {
  end: number;
}

const Counter = ({ end }: CounterProps) => {
  const { current, start, pause, reset, isRunning } = useCounter(
    end,
    () => console.log("started"),
    () => console.log("ended"),
  );
  
  return (
    <Card className={styles.root}>
      <CardContent className={styles.counterRoot}>
        <Typography variant="h1" className={styles.main}>{current}</Typography>
      </CardContent>
      <CardActions>
        {isRunning ? (
          <Button color="inherit" onClick={pause} startIcon={<Pause />}>Pause exercise</Button>
        ): (
          <Button color="primary" onClick={start} disabled={current === 0} startIcon={<PlayArrow />}>Start exercise</Button>
        )}
        <Button color="error" onClick={reset} className={styles.reset} startIcon={<RestartAlt />}>Reset exercise</Button>
      </CardActions>
    </Card>
  )
}

export default Counter;