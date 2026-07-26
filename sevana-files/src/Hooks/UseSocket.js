// Simulated socket hook — replace with real Socket.io in production
import { useEffect, useCallback } from 'react';

const listeners = {};
const emit = (event, data) => {
  if (listeners[event]) listeners[event].forEach(fn => fn(data));
};

export function useSocket() {
  const on = useCallback((event, handler) => {
    if (!listeners[event]) listeners[event] = [];
    listeners[event].push(handler);
    return () => { listeners[event] = listeners[event].filter(h => h !== handler); };
  }, []);

  const raiseHand = useCallback((reportId, radius = 2) => {
    console.log('[Socket] Raise Hand emitted:', { reportId, radius });
    // Simulated response after 1.2s
    setTimeout(() => emit('raise_hand_response', { reportId, count: 8 }), 1200);
  }, []);

  return { on, raiseHand };
}