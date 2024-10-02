import { useCallback, useEffect, useState } from "react";

export default function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  //   useEffect(() => {
  //     const handler = setTimeout(() => {
  //       setDebouncedValue(value);
  //     }, delay);

  //     return () => {
  //       clearTimeout(handler);
  //     };
  //   }, [value]);

  const debounceFunction = useCallback(
    debounce((value) => setDebouncedValue(value), delay),
    [delay]
  );

  debounceFunction(value);

  return debouncedValue;
}

function debounce(callback, delay) {
  let timerId;

  return function debouncedFunction(...args) {
    if (timerId) {
      clearTimeout(timerId);
    }

    timerId = setTimeout(() => {
      callback(...args);
    }, delay);
  };
}
