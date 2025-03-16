// src/services/industrialApi.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { MachineMetric, ModbusConfig, Service, Factory } from '../types';
import type { RootState } from '../app/store';
import { ContactFormData } from '../validations/contactSchema';

export const industrialApi = createApi({
  reducerPath: 'industrialApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api',
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth?.token;
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
    credentials: 'include'
  }),
  keepUnusedDataFor: 300, // Cache for 5 minutes
  tagTypes: ['Factory', 'Metric', 'Service', 'Contact'],
  endpoints: (builder) => ({
    getFactoryMetrics: builder.query<MachineMetric[], string>({
      query: (factoryId) => `/metrics?factoryId=${factoryId}`,
      providesTags: ['Metric'],
      async onCacheEntryAdded(arg, { updateCachedData, cacheEntryRemoved }) {
        const ws = new WebSocket(process.env.NEXT_PUBLIC_WS_URL || 'ws://localhost:8080');
        ws.onmessage = (event) => {
          const data = JSON.parse(event.data);
          if (data.factoryId === arg) {
            updateCachedData((draft) => {
              draft.push(data);
              if (draft.length > 100) draft.shift();
            });
          }
        };
        await cacheEntryRemoved;
        ws.close();
      }
    }),
    updateModbusConfig: builder.mutation<void, ModbusConfig>({
      query: (config) => ({
        url: '/modbusConfig',
        method: 'PUT',
        body: config
      }),
      invalidatesTags: ['Metric']
    }),
    getServices: builder.query<Service[], void>({
      query: () => '/services',
      providesTags: ['Service']
    }),
    getFactories: builder.query<Factory[], void>({
      query: () => '/factories',
      providesTags: ['Factory']
    }),
    submitContact: builder.mutation<void, ContactFormData>({
      query: (data) => ({
        url: '/contact',
        method: 'POST',
        body: data
      }),
      invalidatesTags: ['Contact']
    }),
    getMetrics: builder.query<any, void>({
      query: () => '/metrics',
    }),
    updateConfig: builder.mutation<void, any>({
      query: (config) => ({
        url: '/config',
        method: 'PUT',
        body: config,
      }),
    }),
  })
});

export const sampleServices = [
  {
    id: 'ind-ai-01',
    name: 'Predictive Maintenance AI',
    category: 'industrial-ai',
    description: 'Machine learning-powered equipment maintenance prediction system',
    price: 4999,
    image: '/images/ai-maintenance.jpg'
  },
  {
    id: 'cloud-02',
    name: 'Industrial Cloud Platform',
    category: 'cloud-platforms',
    description: 'Secure cloud infrastructure for manufacturing operations',
    price: 8999,
    image: '/images/industrial-cloud.jpg'
  },
];

export const {
  useGetFactoryMetricsQuery,
  useUpdateModbusConfigMutation,
  useGetServicesQuery,
  useGetFactoriesQuery,
  useSubmitContactMutation,
  useGetMetricsQuery,
  useUpdateConfigMutation,
} = industrialApi;
