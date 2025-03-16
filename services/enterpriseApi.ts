import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const enterpriseApi = createApi({
  reducerPath: 'enterpriseApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  tagTypes: ['Metrics', 'Machines', 'Alerts', 'Maintenance'],
  endpoints: (builder) => ({
    getFactoryMetrics: builder.query({
      query: () => 'factoryMetrics',
      providesTags: ['Metrics'],
    }),
    getMachineStatus: builder.query({
      query: (machineId) => `machines/${machineId}`,
      providesTags: ['Machines'],
    }),
    getAlerts: builder.query({
      query: () => 'alerts',
      providesTags: ['Alerts'],
    }),
    updateMachineStatus: builder.mutation({
      query: ({ machineId, status }) => ({
        url: `machines/${machineId}`,
        method: 'PATCH',
        body: { status },
      }),
      invalidatesTags: ['Machines'],
    }),
    scheduleMaintenance: builder.mutation({
      query: (maintenance) => ({
        url: 'maintenance/scheduled',
        method: 'POST',
        body: maintenance,
      }),
      invalidatesTags: ['Maintenance'],
    }),
  }),
});

export const {
  useGetFactoryMetricsQuery,
  useGetMachineStatusQuery,
  useGetAlertsQuery,
  useUpdateMachineStatusMutation,
  useScheduleMaintenanceMutation,
} = enterpriseApi;
