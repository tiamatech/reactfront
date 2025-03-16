// src/components/ModbusConfigForm.tsx
import React, { useState } from 'react';
import { Box, TextField, Button } from '@mui/material';
import { ModbusConfig } from '../types';

interface ModbusConfigFormProps {
  onSubmit: (newConfig: ModbusConfig) => Promise<void>;
}

const ModbusConfigForm: React.FC<ModbusConfigFormProps> = ({ onSubmit }) => {
  const [ipAddress, setIpAddress] = useState('');
  const [port, setPort] = useState('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Convert port to number and call onSubmit
    const newConfig: ModbusConfig = {
      host: ipAddress,
      port: Number(port)
    };
    try {
      await onSubmit(newConfig);
    } catch (err) {
      console.error('Config update error:', err);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
    >
      <TextField
        label="IP Adresi"
        value={ipAddress}
        onChange={(e) => setIpAddress(e.target.value)}
        required
      />
      <TextField
        label="Port"
        value={port}
        onChange={(e) => setPort(e.target.value)}
        required
      />
      <Button type="submit" variant="contained" color="primary">
        Yapılandırmayı Kaydet
      </Button>
    </Box>
  );
};

export default ModbusConfigForm;
