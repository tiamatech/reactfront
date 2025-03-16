// src/services/mockApi.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const fakeMetrics = {
  airCondition: "Good",
  temperature: 25,
  lights: "On",
  machineCondition: 95,
  forkliftCount: 3,
  employeeCount: 15,
};

const fakeAISuggestions = [
  { id: 1, suggestion: "Optimize cooling system for energy efficiency" },
  { id: 2, suggestion: "Schedule preventive maintenance for machines" },
  { id: 3, suggestion: "Adjust lighting levels to save energy" },
  { id: 4, suggestion: "Reconfigure forklift routes to reduce congestion" },
  { id: 5, suggestion: "Integrate predictive analytics for downtime prevention" },
];

export const mockApi = createApi({
  reducerPath: 'mockApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000/api' }), // Change port to 3000
  endpoints: (builder) => ({
    getFactoryMetrics: builder.query({
      query: (factoryId) => `metrics/${factoryId}`,
    }),
    updateModbusConfig: builder.mutation({
      query: (config) => ({
        url: 'modbus/config',
        method: 'POST',
        body: config,
      }),
    }),
  }),
});

export const { useGetFactoryMetricsQuery, useUpdateModbusConfigMutation } = mockApi;
