// src/middleware/websocket.ts
import { Middleware } from '@reduxjs/toolkit';
import { updateRealTimeMetric } from '../features/factory/factorySlice';

const websocketMiddleware: Middleware = store => next => (action: any) => {
  if (action.type === 'factory/connectWebSocket') {
    try {
      const factoryId = action.payload;
      const wsProtocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
      const wsHost = process.env.NEXT_PUBLIC_WS_URL || window.location.host;
      const wsUrl = `${wsProtocol}//${wsHost}`;
      
      const socket = new WebSocket(`${wsUrl}/api/ws/${factoryId}`);
      
      socket.onopen = () => {
        console.log('WebSocket connection established');
        store.dispatch({ type: 'factory/websocketConnected' });
      };
      
      socket.onmessage = event => {
        try {
          const message = JSON.parse(event.data);
          store.dispatch(updateRealTimeMetric(message));
        } catch (err) {
          console.error('Error parsing WebSocket message:', err);
        }
      };
      
      socket.onclose = () => {
        console.log('WebSocket connection closed');
        // Attempt to reconnect after 5 seconds
        setTimeout(() => {
          store.dispatch({ type: 'factory/connectWebSocket', payload: factoryId });
        }, 5000);
      };
      
      socket.onerror = error => {
        console.error('WebSocket error:', error);
        socket.close();
      };
    } catch (err) {
      console.error('Error establishing WebSocket connection:', err);
    }
  }
  return next(action);
};

export default websocketMiddleware;
