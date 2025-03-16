// src/features/factory/factorySlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FactoryMetrics, Notification } from '../../types';

export type FactoryState = {
  metrics: FactoryMetrics[]; // array of raw metrics
  config: { host: string; port: number };
  status: string;
  notifications: Notification[];
  services: { title: string; description: string }[];
};

const initialState: FactoryState = {
  metrics: [
    {
      airCondition: "İyi",
      temperature: 25,
      lights: "On",
      machineCondition: 95,
      forkliftCount: 3,
      employeeCount: 15,
    },
  ],
  config: { host: 'localhost', port: 502 },
  status: 'idle',
  notifications: [
    { id: 1, message: "System operational.", timestamp: new Date().toISOString() },
    { id: 2, message: "All sensors normal.", timestamp: new Date().toISOString() },
  ],
  services: [
    {
      title: "Warehouse Management & Pick-and-Place Automation",
      description: "AI-driven tracking optimizes order fulfillment and inventory management.",
    },
    {
      title: "Industrial Process & End-of-Line Automation",
      description: "Automation solutions minimize errors and optimize production.",
    },
  ],
};

const factorySlice = createSlice({
  name: 'factory',
  initialState,
  reducers: {
    updateMetrics(state, action: PayloadAction<FactoryMetrics[]>) {
      state.metrics = action.payload;
    },
    addNotification(state, action: PayloadAction<Notification>) {
      state.notifications.push(action.payload);
      if (state.notifications.length > 10) {
        state.notifications.shift();
      }
    },
    setServices(state, action: PayloadAction<{ title: string; description: string }[]>) {
      state.services = action.payload;
    },
    updateStatus(state, action: PayloadAction<string>) {
      state.status = action.payload;
    },
    updateConfig(state, action: PayloadAction<{ host: string; port: number }>) {
      state.config = action.payload;
    },
  }
});

export const { updateMetrics, addNotification, setServices, updateStatus, updateConfig } = factorySlice.actions;
export const updateRealTimeMetric = updateMetrics;
export default factorySlice.reducer;
