import { useEffect } from 'react';
import { io } from 'socket.io-client';

const backendUrl = import.meta.env.VITE_BACKEND;
const socket = io(backendUrl);

export function useIo(cb, deps=[]) {
  useEffect(() => {
    const offList = [];
    const on = (evt, action) => {
      socket.on(evt, action);
      offList.push([evt, action]);
    };
    const emit = (...args) => socket.emit(...args);

    cb({ emit, on, io: socket });

    return () => {
      offList.forEach(([evt, action]) => socket.off(evt, action));
    };
  }, deps);

  return socket;
}
