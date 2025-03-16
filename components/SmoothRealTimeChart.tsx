import React, { useState, useEffect, useMemo } from 'react';
import { Box, Typography, Paper, Grid, useTheme, alpha } from '@mui/material';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  Line
} from 'recharts';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import DeviceThermostatIcon from '@mui/icons-material/DeviceThermostat';
import OpacityIcon from '@mui/icons-material/Opacity';
import SpeedIcon from '@mui/icons-material/Speed';
import BoltIcon from '@mui/icons-material/Bolt';

interface MetricDataPoint {
  timestamp: number;
  sicaklik: number;
  nemOrani: number;
  basinc: number;
  enerjiTuketimi: number;
  verimlilikSkoru: number;
  kaliteEndeksi: number;
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{
    dataKey: string;
    value: number;
    color: string;
  }>;
  label?: string | number;
}

interface TooltipPayload {
  dataKey: string;
  value: number;
  color: string;
}

const generateInitialData = (): MetricDataPoint[] => {
  const now = Date.now();
  return Array.from({ length: 20 }, (_, i) => ({
    timestamp: now - (20 - i) * 1000,
    sicaklik: 20 + Math.random() * 10,
    nemOrani: 40 + Math.random() * 20,
    basinc: 1000 + Math.random() * 50,
    enerjiTuketimi: 400 + Math.random() * 100,
    verimlilikSkoru: 80 + Math.random() * 20,
    kaliteEndeksi: 90 + Math.random() * 10
  }));
};

interface MetricCardProps {
  title: string;
  value: number;
  unit: string;
  color: string;
  gradient: { primary: string; secondary: string; glow: string; animate?: boolean };
  icon?: React.ReactNode;
}

// Helper function to get the appropriate icon for each metric
const getMetricIcon = (key: string) => {
  switch (key) {
    case 'Ortam Sıcaklığı':
      return <DeviceThermostatIcon fontSize="large" />;
    case 'Nem Değeri':
      return <OpacityIcon fontSize="large" />;
    case 'Sistem Basıncı':
      return <SpeedIcon fontSize="large" />;
    case 'Enerji Tüketim Değeri':
      return <BoltIcon fontSize="large" />;
    default:
      return <TrendingUpIcon fontSize="large" />;
  }
};

const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value = 0,
  unit,
  color,
  icon
}) => (
  <Paper
    elevation={3}
    sx={{
      p: 2,
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      background: (theme) =>
        `linear-gradient(135deg, ${alpha(color, 0.1)} 0%, ${theme.palette.background.paper} 100%)`,
      border: `1px solid ${alpha(color, 0.2)}`,
      transition: 'transform 0.3s ease-in-out',
      '&:hover': {
        transform: 'translateY(-5px)',
      },
    }}
  >
    <Box sx={{ color: color, mb: 1 }}>
      {icon ? icon : getMetricIcon(title)}
    </Box>
    <Typography variant="h6" sx={{ color: color, fontWeight: 'bold' }}>
      {(value || 0).toFixed(1)} {unit}
    </Typography>
    <Typography variant="body2" color="text.secondary">
      {title}
    </Typography>
  </Paper>
);

// Type for metric keys
type MetricKey = keyof Pick<MetricDataPoint, 'sicaklik' | 'nemOrani' | 'basinc' | 'enerjiTuketimi'>;

interface GradientDef {
  stroke: string;
  label: string;
  gradient: {
    primary: string;
    secondary: string;
    glow: string;
    animate: boolean;
  };
}

type GradientDefs = Record<MetricKey, GradientDef>;

interface SinConfig {
  baseline: number;
  amplitude: number;
  frequency: number;
}

type SinConfigs = Record<MetricKey, SinConfig>;

// Remove unused SinKeys type since we're using explicit typing in SinDataPoint
interface SinDataPoint extends MetricDataPoint {
  sin_sicaklik: number;
  sin_nemOrani: number;
  sin_basinc: number;
  sin_enerjiTuketimi: number;
}

// Type guard for MetricKey
const isMetricKey = (key: string): key is MetricKey => {
  return ['sicaklik', 'nemOrani', 'basinc', 'enerjiTuketimi'].includes(key);
};

const SmoothRealTimeChart: React.FC<{ metrics?: MetricDataPoint[] }> = ({ metrics = [] }) => {
  const theme = useTheme();
  const [data, setData] = useState<MetricDataPoint[]>(generateInitialData());
  const [currentMetrics, setCurrentMetrics] = useState<MetricDataPoint>(generateInitialData()[0]);
  // Phase state for the sinusoidal animation
  const [phase, setPhase] = useState(0);

  const gradientDefs = useMemo<GradientDefs>(
    () => ({
      sicaklik: {
        stroke: theme.palette.error.main,
        label: 'Ortam Sıcaklığı',
        gradient: {
          primary: theme.palette.error.main,
          secondary: alpha(theme.palette.error.main, 0.1),
          glow: `drop-shadow(0 0 6px ${alpha(theme.palette.error.main, 0.5)})`,
          animate: true
        }
      },
      nemOrani: {
        stroke: theme.palette.info.main,
        label: 'Nem Değeri',
        gradient: {
          primary: theme.palette.info.main,
          secondary: alpha(theme.palette.info.main, 0.1),
          glow: `drop-shadow(0 0 6px ${alpha(theme.palette.info.main, 0.5)})`,
          animate: true
        }
      },
      basinc: {
        stroke: theme.palette.success.main,
        label: 'Sistem Basıncı',
        gradient: {
          primary: theme.palette.success.main,
          secondary: alpha(theme.palette.success.main, 0.1),
          glow: `drop-shadow(0 0 6px ${alpha(theme.palette.success.main, 0.5)})`,
          animate: true
        }
      },
      enerjiTuketimi: {
        stroke: theme.palette.warning.main,
        label: 'Enerji Tüketim Değeri',
        gradient: {
          primary: theme.palette.warning.main,
          secondary: alpha(theme.palette.warning.main, 0.1),
          glow: `drop-shadow(0 0 6px ${alpha(theme.palette.warning.main, 0.5)})`,
          animate: true
        }
      }
    }),
    [theme]
  );

  const sinConfig = useMemo<SinConfigs>(
    () => ({
      sicaklik: { baseline: 25, amplitude: 3, frequency: 0.2 },
      nemOrani: { baseline: 50, amplitude: 5, frequency: 0.2 },
      basinc: { baseline: 1025, amplitude: 10, frequency: 0.2 },
      enerjiTuketimi: { baseline: 450, amplitude: 20, frequency: 0.2 }
    }),
    []
  );

  // Update with provided metrics if available
  useEffect(() => {
    if (metrics?.length > 0) {
      setData(metrics);
      setCurrentMetrics(metrics[metrics.length - 1]);
    }
  }, [metrics]);

  // Update data and phase every second
  useEffect(() => {
    const interval = setInterval(() => {
      const newPoint: MetricDataPoint = {
        timestamp: Date.now(),
        sicaklik: 20 + Math.random() * 10,
        nemOrani: 40 + Math.random() * 20,
        basinc: 1000 + Math.random() * 50,
        enerjiTuketimi: 400 + Math.random() * 100,
        verimlilikSkoru: 80 + Math.random() * 20,
        kaliteEndeksi: 90 + Math.random() * 10
      };
      setData((prevData) => [...prevData.slice(1), newPoint]);
      setCurrentMetrics(newPoint);
      setPhase((prev) => prev + 0.2);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Build sinusoidal data explicitly to satisfy SinDataPoint
  const sinData = useMemo((): SinDataPoint[] => {
    return data.map((d, index) => ({
      ...d,
      sin_sicaklik: sinConfig.sicaklik.baseline +
        sinConfig.sicaklik.amplitude * Math.sin(sinConfig.sicaklik.frequency * index + phase),
      sin_nemOrani: sinConfig.nemOrani.baseline +
        sinConfig.nemOrani.amplitude * Math.sin(sinConfig.nemOrani.frequency * index + phase),
      sin_basinc: sinConfig.basinc.baseline +
        sinConfig.basinc.amplitude * Math.sin(sinConfig.basinc.frequency * index + phase),
      sin_enerjiTuketimi: sinConfig.enerjiTuketimi.baseline +
        sinConfig.enerjiTuketimi.amplitude * Math.sin(sinConfig.enerjiTuketimi.frequency * index + phase)
    }));
  }, [data, phase, sinConfig]);

  const CustomTooltip: React.FC<CustomTooltipProps> = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <Box
          sx={{
            background: alpha(theme.palette.background.paper, 0.9),
            border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
            p: 2,
            borderRadius: 2,
            backdropFilter: 'blur(8px)',
            boxShadow: `
              0 4px 20px ${alpha(theme.palette.common.black, 0.2)},
              0 0 10px ${alpha(theme.palette.primary.main, 0.1)}
            `,
            transform: 'perspective(1000px)',
            transformStyle: 'preserve-3d',
            transition: 'all 0.3s ease'
          }}
        >
          <Typography variant="subtitle2" sx={{ mb: 1 }}>
            {typeof label === 'number' ? new Date(label).toLocaleTimeString() : label}
          </Typography>
          {payload.map((entry: TooltipPayload) => {
            const key = entry.dataKey.replace('sin_', '');
            const def = gradientDefs[key as MetricKey];
            return (
              <Box key={entry.dataKey} sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                <Box
                  sx={{
                    width: 12,
                    height: 12,
                    borderRadius: '50%',
                    bgcolor: entry.color,
                    filter: `drop-shadow(0 0 4px ${alpha(entry.color, 0.5)})`
                  }}
                />
                <Typography variant="body2">
                  {def ? `${def.label}: ${entry.value.toFixed(1)}` : entry.dataKey}
                </Typography>
              </Box>
            );
          })}
        </Box>
      );
    }
    return null;
  };

  // Update legend formatter with proper types
  const legendFormatter = (value: string): React.ReactNode => {
    if (isMetricKey(value)) {
      const def = gradientDefs[value];
      if (def) {
        return (
          <span style={{ 
            color: theme.palette.text.primary, 
            fontSize: '0.875rem',
            fontWeight: 500,
            padding: '4px 8px',
            background: alpha(theme.palette.background.paper, 0.8),
            borderRadius: '4px'
          }}>
            {def.label}
          </span>
        );
      }
    }
    return value;
  };

  return (
    <Paper
      elevation={3}
      sx={{
        p: 3,
        borderRadius: 3,
        background: `linear-gradient(145deg, 
          ${alpha(theme.palette.background.paper, 0.9)}, 
          ${alpha(theme.palette.background.paper, 0.7)})`,
        backdropFilter: 'blur(10px)',
        border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" fontWeight="bold">
          Endüstriyel Süreç Metrikleri
        </Typography>
        <Typography variant="subtitle2" color="text.secondary">
          Gerçek Zamanlı İzleme ve Analiz Paneli
        </Typography>
      </Box>

      <Grid container spacing={2} sx={{ mb: 4 }}>
        {(Object.entries(gradientDefs) as [MetricKey, GradientDef][]).map(([key, def]) => (
          <Grid item xs={12} sm={6} md={3} key={key}>
            <MetricCard
              title={def.label}
              value={currentMetrics[key]}
              unit={
                key === 'sicaklik'
                  ? '°C'
                  : key === 'nemOrani'
                  ? '%'
                  : key === 'basinc'
                  ? 'hPa'
                  : 'kW'
              }
              icon={getMetricIcon(def.label)}
              color={def.stroke}
              gradient={def.gradient}
            />
          </Grid>
        ))}
      </Grid>

      <Box sx={{ height: 400, width: '100%', position: 'relative' }}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={sinData} margin={{ top: 10, right: 30, left: 20, bottom: 5 }}>
            <defs>
              {Object.entries(gradientDefs).map(([key, def]) => (
                <linearGradient key={key} id={`colorGradient-${key}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={def.gradient.primary} stopOpacity={0.8} />
                  <stop offset="95%" stopColor={def.gradient.secondary} stopOpacity={0} />
                </linearGradient>
              ))}
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke={alpha(theme.palette.text.primary, 0.05)}
              strokeWidth={0.5}
            />
            <XAxis
              dataKey="timestamp"
              tickFormatter={(time) => new Date(time).toLocaleTimeString()}
              stroke={theme.palette.text.secondary}
              tick={{ fill: theme.palette.text.secondary, fontSize: 12 }}
              axisLine={{ stroke: alpha(theme.palette.text.primary, 0.1) }}
            />
            <YAxis
              stroke={theme.palette.text.secondary}
              tick={{ fill: theme.palette.text.secondary, fontSize: 12 }}
              axisLine={{ stroke: alpha(theme.palette.text.primary, 0.1) }}
              tickFormatter={(value) => `${value.toFixed(0)}`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend verticalAlign="top" height={36} formatter={legendFormatter} />
            {/* Existing Area components */}
            {Object.entries(gradientDefs).map(([key, def]) => (
              <Area
                key={key}
                type="monotone"
                dataKey={key}
                name={def.label}
                stroke={def.gradient.primary}
                strokeWidth={2}
                fill={`url(#colorGradient-${key})`}
                fillOpacity={1}
                animationDuration={1000}
                animationEasing="ease-in-out"
                dot={false}
                activeDot={{
                  r: 6,
                  stroke: def.gradient.primary,
                  strokeWidth: 2,
                  fill: theme.palette.background.paper,
                  filter: `drop-shadow(0 0 4px ${alpha(def.gradient.primary, 0.6)})`
                }}
              />
            ))}
            {/* Sinusoidal moving lines */}
            {(Object.keys(sinConfig) as MetricKey[]).map((key) => (
              <Line
                key={`line-sin-${key}`}
                type="monotone"
                dataKey={`sin_${key}`}
                stroke={gradientDefs[key].stroke}
                strokeWidth={2}
                dot={false}
                animationDuration={500}
              />
            ))}
          </AreaChart>
        </ResponsiveContainer>
      </Box>
    </Paper>
  );
};

export default React.memo(SmoothRealTimeChart);
