import React, { useEffect, useCallback } from 'react';
import { Box, Typography, Paper, CircularProgress, Alert, useTheme } from '@mui/material';
import { useGetFactoryMetricsQuery, useUpdateModbusConfigMutation } from '../services/mockApi';
import { ModbusConfig } from '../types';
import { useDispatch} from 'react-redux';
//import { selectFactoryMetrics } from '../features/factory/selectors';
import ModbusConfigForm from './ModbusConfigForm';
import SettingsIcon from '@mui/icons-material/Settings';

const FactoryDashboard: React.FC<{ factoryId: string }> = ({ factoryId }) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const {  error, isLoading } = useGetFactoryMetricsQuery(factoryId);
  const [updateConfig] = useUpdateModbusConfigMutation();
  //const metrics = useSelector(selectFactoryMetrics);

  useEffect(() => {
    dispatch({ type: 'factory/connectWebSocket', payload: factoryId });
    return () => {
      dispatch({ type: 'factory/disconnectWebSocket' });
    };
  }, [dispatch, factoryId]);

  const handleConfigUpdate = useCallback(async (newConfig: ModbusConfig) => {
    try {
      await updateConfig(newConfig).unwrap();
    } catch (err) {
      console.error('Yapılandırma güncellemesi başarısız:', err);
    }
  }, [updateConfig]);

  return (
    <Box>
      {isLoading ? (
        <CircularProgress />
      ) : error ? (
        <Alert severity="error">Metrikler yüklenemedi: {"message" in error ? error.message : "Bilinmeyen hata"}</Alert>
      ) : (
        <Box>
          <Typography variant="h6" gutterBottom>
          
          </Typography>
          
        </Box>
      )}
      <Box sx={{ mt: 4 }}>
        <Typography variant="h6" gutterBottom>
          <SettingsIcon fontSize="small" sx={{ mr: 1 }} />
          Modbus Yapılandırması
        </Typography>
        <Paper
          sx={{
            p: 2,
            backgroundColor:
              theme.palette.mode === 'dark'
                ? theme.palette.background.paper
                : '#e0f7fa',
            border: '1px solid',
            borderColor:
              theme.palette.mode === 'dark'
                ? theme.palette.divider
                : '#00796b'
          }}
        >
          <ModbusConfigForm onSubmit={handleConfigUpdate} />
        </Paper>
      </Box>
    </Box>
  );
};

export default React.memo(FactoryDashboard);
