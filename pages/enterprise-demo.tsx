// src/pages/EnterpriseDemoPage.tsx
import React, { Suspense, useEffect } from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  Paper,
  CircularProgress,
  useMediaQuery
} from "@mui/material";
import ChartIcon from "@mui/icons-material/ShowChart";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../app/store";
import { addNotification } from "../features/factory/factorySlice";
import { industrialAnimations } from "../styles/animations";
import dynamic from "next/dynamic";

// Lazy load components
const FactoryDashboard = React.lazy(() => import("../components/FactoryDashboard"));
const EnhancedNotifications = React.lazy(() => import("../components/Notifications"));
const DynamicAISuggestions = React.lazy(() => import("../components/DynamicAISuggestions"));

// Optimize component imports with specific chunks
const SmoothRealTimeChart = dynamic(() => import("../components/SmoothRealTimeChart"), {
  loading: () => <CircularProgress />,
  ssr: false,
});

const EnterpriseMetricsVisualization = dynamic(
  () => import("../components/EnterpriseMetricsVisualization"),
  {
    loading: () => <CircularProgress />,
    ssr: false,
  }
);

// Add MetricDataPoint interface definition
interface MetricDataPoint {
  timestamp: number;
  sicaklik: number;
  nemOrani: number;
  basinc: number;
  enerjiTuketimi: number;
  verimlilikSkoru: number;
  kaliteEndeksi: number;
}

// Add type definitions
interface FactoryMetrics {
  airCondition: string;
  temperature: number;
  lights: string;
  machineCondition: number;
  forkliftCount: number;
  employeeCount: number;
}

// Add mapping function
const mapToMetricDataPoint = (factoryMetric: FactoryMetrics): MetricDataPoint => ({
  timestamp: Date.now(),
  sicaklik: factoryMetric.temperature,
  nemOrani: factoryMetric.airCondition === 'İyi' ? 80 : 50,
  basinc: factoryMetric.machineCondition * 10,
  enerjiTuketimi: factoryMetric.forkliftCount * 100,
  verimlilikSkoru: factoryMetric.machineCondition,
  kaliteEndeksi: factoryMetric.employeeCount * 5
});

const EnterpriseDemoPage: React.FC = () => {
  const dispatch = useDispatch();
  const metrics = useSelector((state: RootState) => state.factory.metrics);
  const notifications = useSelector((state: RootState) => state.factory.notifications);
  const isMobile = useMediaQuery("(max-width:820px)");

  // Add a random notification every 4 seconds.
  useEffect(() => {
    const notificationMessages = [
      "Yeni sensör verisi mevcut",
      "Saat 15:00'te bakım planlandı",
      "Forklift trafiği arttı",
      "Çalışan girişi tespit edildi",
      "Makine durumunda beklenmedik düşüş",
    ];
    const interval = setInterval(() => {
      dispatch(
        addNotification({
          id: Date.now(),
          message: notificationMessages[Math.floor(Math.random() * notificationMessages.length)],
          timestamp: new Date().toISOString(),
        })
      );
    }, 4000);
    return () => clearInterval(interval);
  }, [dispatch]);

  const metricsArray = metrics;
  const latestFactoryMetric = metricsArray.length > 0 ? metricsArray[metricsArray.length - 1] : undefined;

  // Convert the latest raw metric to numeric values for AI suggestions.
  const latestMetricForAI = latestFactoryMetric
    ? {
        airCondition: latestFactoryMetric.airCondition === "İyi" ? 80 : 50,
        temperature: latestFactoryMetric.temperature,
        lights: latestFactoryMetric.lights === "On" ? 100 : 0,
        machineCondition: latestFactoryMetric.machineCondition,
        forkliftCount: latestFactoryMetric.forkliftCount,
        employeeCount: latestFactoryMetric.employeeCount,
      }
    : undefined;

  // Map the metrics before passing to SmoothRealTimeChart
  const mappedMetrics = metricsArray.map(mapToMetricDataPoint);

  return (
    <Box sx={{ backgroundColor: "background.default", minHeight: "100vh", py: 6 }}>
      <Container maxWidth="lg">
        {/* Header Section */}
        <Box
          sx={{
            mb: 8,
            textAlign: "center",
            position: "relative",
            overflow: "hidden",
            borderRadius: 3,
            animation: `${industrialAnimations.fadeIn} 1s`,
          }}
        >
          <Typography
            variant="h2"
            gutterBottom
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              background: "linear-gradient(135deg, #0066FF 0%, #00FF92 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            <ChartIcon fontSize="large" sx={{ mr: 1 }} />
            Fabrika Panosu
          </Typography>
          <Typography variant="body1" sx={{ mb: 4, fontSize: "1.125rem" }}>
            Endüstriyel süreçlerinizi gerçek zamanlı izleyin ve optimize edin.
          </Typography>
          <Paper
            sx={{
              p: 3,
              borderRadius: 3,
              border: "1px solid",
              borderColor: "divider",
              boxShadow: "0px 4px 12px rgba(0,0,0,0.1)",
              backgroundColor: "background.paper",
              mb: 6,
            }}
            elevation={3}
          >
            <Suspense fallback={<CircularProgress />}>
              <FactoryDashboard factoryId="factory1" />
            </Suspense>
          </Paper>
        </Box>

        

        {/* Real-Time Dashboard */}
        <Box sx={{ mb: 8, animation: `${industrialAnimations.fadeIn} 1s` }}>
          <Paper
            sx={{
              p: 3,
              borderRadius: 3,
              boxShadow: "0px 4px 12px rgba(0,0,0,0.1)",
              backgroundColor: "background.paper",
            }}
            elevation={3}
          >
            <Typography variant="h4" align="center" gutterBottom>
              Gerçek Zamanlı Pano
            </Typography>
            <Suspense fallback={<CircularProgress />}>
              <SmoothRealTimeChart metrics={mappedMetrics} />
            </Suspense>
          </Paper>
        </Box>

        {/* AI Suggestions and Notifications */}
        <Grid container spacing={4} sx={{ mb: 8 }}>
          {/* AI Suggestions */}
          <Grid item xs={12} sm={8}>
            <Suspense fallback={<CircularProgress />}>
              <DynamicAISuggestions metrics={latestMetricForAI} />
            </Suspense>
          </Grid>

          {/* Notifications (hidden on mobile) */}
          {!isMobile && (
            <Grid item xs={12} sm={4}>
              <Suspense fallback={<CircularProgress />}>
                <EnhancedNotifications notifications={notifications} />
              </Suspense>
            </Grid>
          )}
        </Grid>
        {/* Enterprise Metrics Visualization */}
        {latestFactoryMetric && (
          <Box sx={{ mb: 8, animation: `${industrialAnimations.slideIn} 1s` }}>
            <Suspense fallback={<CircularProgress />}>
              <EnterpriseMetricsVisualization metrics={latestFactoryMetric} />
            </Suspense>
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default EnterpriseDemoPage;
