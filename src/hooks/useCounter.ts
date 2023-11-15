import { useEffect, useRef, useState } from "react";

const useCounter = (
  end: number,
  onStart?: () => void,
  onEnd?: () => void,
) => {
  const intervalRef = useRef<undefined | NodeJS.Timeout>();

  const [current, setCurrent] = useState(end);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    return () => {
      clearInterval(intervalRef.current);
      setIsRunning(false);
    }
  }, []);

  const start = () => {
    if(current !== 0) {
      setIsRunning(true);
      onStart && onStart();
      const cycler = setInterval(() => {
        setCurrent(prev => {
          if((prev - 1) === 0) {
            onEnd && onEnd();
            setIsRunning(false);
            clearInterval(intervalRef.current);
            return 0;
          } else {
            return prev - 1;
          }
        })
      }, 1000);

      intervalRef.current = cycler;
    }
  };

  const pause = () => {
    clearInterval(intervalRef.current);
    setIsRunning(false);
  }

  const reset = () => {
    setCurrent(end);
    setIsRunning(false);
    clearInterval(intervalRef.current);
  }

  return {
    isRunning,
    current,
    start,
    pause,
    reset
  }
};

export default useCounter;