import { useEffect, useRef, useState } from "react";

export default function useThrottle(value, delay) {
  const [throttledValue, setThrottledValue] = useState(value);
  const flagRef = useRef(true);
  useEffect(() => {
    if (flagRef.current && value !== throttledValue) {
      setThrottledValue(value);
      flagRef.current = false;
      setTimeout(() => {
        flagRef.current = true;
        setThrottledValue(value);
      }, delay);
    }
  }, [value, delay]);

  return throttledValue;
}
