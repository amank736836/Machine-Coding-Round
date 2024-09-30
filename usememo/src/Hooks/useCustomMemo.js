import { useEffect, useRef } from "react";

const useCustomMemo = (callback, dependenciesArr) => {
  const ref = useRef({
    memorizedValue: undefined,
    lastDependencies: undefined,
  });

  if (
    !ref.current.memorizedValue ||
    !areArraysEqual(ref.current.lastDependencies, dependenciesArr)
  ) {
    ref.current.memorizedValue = callback();
    ref.current.lastDependencies = dependenciesArr;
  }

  useEffect(() => {
    return () => {
      ref.current.memorizedValue = undefined;
    };
  }, []);

  return ref.current.memorizedValue;
};

export default useCustomMemo;

function areArraysEqual(prev, curr) {
  if (!prev || !curr) {
    return false;
  }

  if (prev.length !== curr.length) {
    return false;
  }

  for (let i = 0; i < prev.length; i++) {
    if (prev[i] !== curr[i]) {
      return false;
    }
  }

  return true;
}
