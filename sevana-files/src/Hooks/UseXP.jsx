import { useState, useCallback } from 'react';

export function useXP(initial = 0) {
  const [xp, setXp] = useState(initial);
  const [toastVisible, setToastVisible] = useState(false);
  const [toastAmount, setToastAmount] = useState(0);

  const awardXP = useCallback((amount) => {
    setXp(prev => prev + amount);
    setToastAmount(amount);
    setToastVisible(true);
    setTimeout(() => setToastVisible(false), 1800);
  }, []);

  return { xp, awardXP, toastVisible, toastAmount };
}