import { useEffect, useRef, useState } from "react";

const useCounter = (
  end: number,
  onStart?: () => void,
  onEnd?: () => void,
) => {
  const intervalRef = useRef<undefined | NodeJS.Timeout>();
  const [current, setCurrent] = useState(end);

  useEffect(() => {
    return () => clearInterval(intervalRef.current);
  }, []);

  const start = () => {
    onStart && onStart();
    const cycler = setInterval(() => {
      setCurrent(prev => {
        if((prev - 1) === 0) {
          onEnd && onEnd();
          clearInterval(intervalRef.current);
          return 0;
        } else {
          return prev - 1;
        }
      })
    }, 1000);

    intervalRef.current = cycler;
  };

  const pause = () => clearInterval(intervalRef.current);

  const reset = () => {
    setCurrent(end);
    clearInterval(intervalRef.current);
  }

  return {
    current,
    start,
    pause,
    reset
  }
};

export default useCounter;