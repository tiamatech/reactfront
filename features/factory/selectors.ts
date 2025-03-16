// src/features/factory/selectors.ts
import { RootState } from '../../app/store';
import { FactoryMetrics } from '../../types';

export const selectFactoryMetrics = (state: RootState): FactoryMetrics[] =>
  state.factory.metrics;

export const selectLatestMetric = (state: RootState): FactoryMetrics | undefined => {
  const metrics = state.factory.metrics;
  return metrics.length > 0 ? metrics[metrics.length - 1] : undefined;
};

export const selectModbusConfig = (state: RootState) => state.factory.config;
export const selectFactoryStatus = (state: RootState) => state.factory.status;
