import React, { useState, useEffect } from "react";
import { Paper, Typography, Box } from "@mui/material";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Cell } from "recharts";

interface EnterpriseMetrics {
  airCondition: string;
  temperature: number;
  lights: string;
  machineCondition: number;
  forkliftCount: number;
  employeeCount: number;
}

// Default metrics
const defaultMetrics: EnterpriseMetrics = {
  airCondition: "İyi",
  temperature: 24,
  lights: "On",
  machineCondition: 95,
  forkliftCount: 3,
  employeeCount: 15,
};

interface EnterpriseMetricsVisualizationProps {
  metrics?: EnterpriseMetrics;
}

const colorPalette = ["#FF5722", "#FFC107", "#4CAF50", "#03A9F4", "#9C27B0", "#E91E63"];

const EnterpriseMetricsVisualization: React.FC<EnterpriseMetricsVisualizationProps> = ({ 
  metrics = defaultMetrics 
}) => {
  // Sayısal olmayan metrikleri görselleştirme için sayısal skorlara dönüştürür.
  const convertAirCondition = (condition: string) => (condition === "İyi" ? 80 : 50);
  const convertLights = (lights: string) => (lights === "On" ? 100 : 0);

  // Sağlanan metriklere göre ilk veri dizisini oluşturur.
  const initialData = [
    { name: "Hava Kalitesi", value: convertAirCondition(metrics.airCondition) },
    { name: "Sıcaklık", value: metrics.temperature },
    { name: "Işıklandırma", value: convertLights(metrics.lights) },
    { name: "Makine Durumu", value: metrics.machineCondition },
    { name: "Forklift Trafiği", value: metrics.forkliftCount },
    { name: "Çalışanlar", value: metrics.employeeCount },
  ];

  const [data, setData] = useState(initialData);

  // Her 3.5 saniyede küçük rastgele dalgalanmalarla veriyi günceller.
  useEffect(() => {
    const interval = setInterval(() => {
      setData((prevData) =>
        prevData.map((item) => {
          // -5 ile +5 arasında rastgele değişim
          const variation = Math.random() * 10 - 5;
          const newValue = Math.max(0, Math.round(item.value + variation));
          return { ...item, value: newValue };
        })
      );
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  return (
    <Paper
      elevation={3}
      sx={{
        p: 3,
        borderRadius: 3,
        boxShadow: "0px 4px 12px rgba(0,0,0,0.15)",
        backgroundColor: "background.paper",
      }}
    >
      <Typography variant="h4" align="center" gutterBottom>
        Kurumsal Veri Görselleştirmesi
      </Typography>
      <Box sx={{ width: "100%", height: 350 }}>
        <ResponsiveContainer>
          <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" animationDuration={1000}>
              {data.map((_entry, index) => (
                <Cell key={`cell-${index}`} fill={colorPalette[index % colorPalette.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </Box>
      <Typography variant="body2" align="center" sx={{ mt: 2 }}>
        Veriler, gerçek zamanlı dalgalanmalarla her 3.5 saniyede bir güncellenir.
      </Typography>
    </Paper>
  );
};

export default EnterpriseMetricsVisualization;
