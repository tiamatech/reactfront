import React, { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend
} from "recharts";

interface MetricProps {
  temperature?: number;
  machineCondition?: number;
}

interface DataPoint {
  time: number;
  temperature: number;
  machineCondition: number;
}

const FuturisticChart: React.FC<{ metrics?: MetricProps }> = ({ metrics }) => {
  const [data, setData] = useState<DataPoint[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setData((prev) => {
        const newPoint: DataPoint = {
          time: Date.now(),
          temperature: metrics?.temperature || 25,
          machineCondition: metrics?.machineCondition || 95
        };
        // Son 10 veri noktasını korur
        return [...prev.slice(-9), newPoint];
      });
    }, 5000);
    return () => clearInterval(interval);
  }, [metrics]);

  return (
    <Box sx={{ width: "100%", height: 300 }}>
      <ResponsiveContainer>
        <LineChart data={data}>
          <defs>
            <linearGradient id="tempGradient" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#FF5722" />
              <stop offset="100%" stopColor="#FFC107" />
            </linearGradient>
            <linearGradient id="machineGradient" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#4CAF50" />
              <stop offset="100%" stopColor="#8BC34A" />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time" tickFormatter={(time) => new Date(time).toLocaleTimeString()} />
          <YAxis />
          <Tooltip labelFormatter={(time) => new Date(time).toLocaleTimeString()} />
          <Legend />
          <Line
            type="monotone"
            dataKey="temperature"
            stroke="url(#tempGradient)"
            strokeWidth={3}
            name="Sıcaklık (°C)"
            dot={{ r: 4 }}
            activeDot={{ r: 6 }}
            animationDuration={500}
          />
          <Line
            type="monotone"
            dataKey="machineCondition"
            stroke="url(#machineGradient)"
            strokeWidth={3}
            name="Makine Durumu (%)"
            dot={{ r: 4 }}
            activeDot={{ r: 6 }}
            animationDuration={500}
          />
        </LineChart>
      </ResponsiveContainer>
      <Typography variant="body2" align="center" sx={{ mt: 2 }}>
        Gerçek Zamanlı Metrik Görselleştirmesi
      </Typography>
    </Box>
  );
};

export default FuturisticChart;
