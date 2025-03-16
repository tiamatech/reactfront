import React, { useState, useEffect, useMemo, useCallback } from "react";
import {
  Paper,
  Typography,
  Box,
  useTheme,
  Grid,
  Chip,
  alpha,
} from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import { keyframes } from "@emotion/react";
import AIAssistantIcon from "./AIAssistantIcon";

interface Metrics {
  airCondition: number;
  temperature: number;
  lights: number;
  machineCondition: number;
  forkliftCount: number;
  employeeCount: number;
}

interface AIInsight {
  id: string;
  kategori: "performans" | "verimlilik" | "guvenlik" | "bakim";
  oncelik: "yuksek" | "orta" | "dusuk";
  baslik: string;
  oneri: string;
  etki: string;
  guvenilirlik: number;
  zaman: number;
}

interface Props {
  metrics?: Metrics;
}

const defaultMetrics: Metrics = {
  airCondition: 80,
  temperature: 22,
  lights: 75,
  machineCondition: 90,
  forkliftCount: 5,
  employeeCount: 7,
};

const pulseAnimation = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

const neuralAnimation = keyframes`
  0%, 100% { opacity: 0.3; transform: scale(1); }
  50% { opacity: 0.6; transform: scale(1.2); }
`;

// Framer Motion variants for horizontal sliding
const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 300 : -300,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction > 0 ? -300 : 300,
    opacity: 0,
  }),
};

const DynamicAISuggestions: React.FC<Props> = ({ metrics = defaultMetrics }) => {
  const theme = useTheme();
  const insights = useMemo(() => generateAIInsights(metrics), [metrics]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  // Auto slide: transitions to next slide every 3 seconds.
  const handleNext = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % insights.length);
  }, [insights.length]);

  useEffect(() => {
    const timer = setInterval(() => {
      handleNext();
    }, 4000);
    return () => clearInterval(timer);
  }, [handleNext]);

  // Clicking on the slider area advances to the next slide.
  const handleSlideClick = () => {
    handleNext();
  };

  return (
    <Paper
      elevation={4}
      sx={{
        position: "relative",
        p: 3,
        borderRadius: 4,
        // Dark mode responsive background:
        background:
          theme.palette.mode === "dark"
            ? `linear-gradient(145deg, ${alpha(
                theme.palette.background.paper,
                0.85
              )}, ${alpha(theme.palette.background.paper, 0.75)})`
            : `linear-gradient(145deg, ${alpha(
                theme.palette.background.paper,
                0.97
              )}, ${alpha(theme.palette.background.paper, 0.87)})`,
        backdropFilter: "blur(20px)",
        border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
        overflow: "hidden",
        cursor: "pointer",
        "&::before": {
          content: '""',
          position: "absolute",
          top: "-50%",
          left: "-50%",
          width: "200%",
          height: "200%",
          background: `
            radial-gradient(circle at 30% 30%, ${alpha(
              theme.palette.primary.main,
              0.1
            )} 0%, transparent 30%),
            radial-gradient(circle at 70% 70%, ${alpha(
              theme.palette.secondary.main,
              0.1
            )} 0%, transparent 30%),
            radial-gradient(circle at 50% 50%, ${alpha(
              theme.palette.primary.light,
              0.05
            )} 0%, transparent 50%)
          `,
          animation: `${neuralAnimation} 15s infinite`,
          zIndex: 0,
        },
      }}
      onClick={handleSlideClick}
    >
      {/* Subtle Background Animation */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 0,
          opacity: 0.05,
          background: `
            radial-gradient(circle at 20% 20%, ${theme.palette.primary.main} 0%, transparent 10%),
            radial-gradient(circle at 80% 50%, ${theme.palette.secondary.main} 0%, transparent 10%),
            radial-gradient(circle at 40% 80%, ${theme.palette.primary.light} 0%, transparent 10%)
          `,
          animation: `${pulseAnimation} 4s ease-in-out infinite`,
        }}
      />

      {/* Header */}
      <Box
        sx={{
          position: "relative",
          zIndex: 1,
          mb: 3,
          display: "flex",
          alignItems: "center",
          gap: 2,
        }}
      >
        <AIAssistantIcon
          sx={{
            width: 48,
            height: 48,
            animation: "float 3s ease-in-out infinite",
            color: theme.palette.primary.main,
          }}
        />
        <Typography
          variant="h5"
          fontWeight="bold"
          sx={{
            background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Yapay Zeka Destekli Süreç Optimizasyonu
        </Typography>
        <Typography variant="subtitle2" color="text.secondary">
          Akıllı Üretim Önerileri ve Analiz Sistemi
        </Typography>
      </Box>

      {/* Slider Container with fixed min-height to avoid vertical jump */}
      <Box sx={{ position: "relative", minHeight: 200, overflow: "hidden" }}>
        <AnimatePresence custom={direction} initial={false}>
          <motion.div
            key={insights[currentIndex].id}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
            }}
            style={{ position: "absolute", width: "100%" }}
          >
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Box
                  sx={{
                    p: 2,
                    borderRadius: 2,
                    background: alpha(theme.palette.primary.main, 0.1),
                    border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
                  }}
                >
                  <Typography variant="h6" gutterBottom color="primary">
                    {insights[currentIndex].baslik}
                  </Typography>
                  <Typography variant="body1" paragraph>
                    {insights[currentIndex].oneri}
                  </Typography>
                  <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
                    <Chip
                      label={`Öncelik: ${insights[currentIndex].oncelik}`}
                      color={
                        insights[currentIndex].oncelik === "yuksek"
                          ? "error"
                          : insights[currentIndex].oncelik === "orta"
                          ? "warning"
                          : "success"
                      }
                      size="small"
                    />
                    <Chip
                      label={`Güvenilirlik: ${insights[currentIndex].guvenilirlik}%`}
                      color="primary"
                      size="small"
                    />
                    <Chip
                      label={insights[currentIndex].kategori}
                      color="secondary"
                      size="small"
                    />
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </motion.div>
        </AnimatePresence>
      </Box>

      {/* Navigation Dots */}
      <Box sx={{ mt: 3, display: "flex", gap: 1 }}>
        {insights.map((insight, index) => (
          <Box
            key={insight.id}
            onClick={(e) => {
              // Prevent the click from propagating to the parent (which triggers next)
              e.stopPropagation();
              setDirection(index > currentIndex ? 1 : -1);
              setCurrentIndex(index);
            }}
            sx={{
              flex: 1,
              height: 3,
              borderRadius: 1,
              bgcolor:
                index === currentIndex
                  ? theme.palette.primary.main
                  : alpha(theme.palette.primary.main, 0.2),
              transition: "all 0.3s ease",
              cursor: "pointer",
              "&:hover": {
                bgcolor: alpha(theme.palette.primary.main, 0.5),
              },
            }}
          />
        ))}
      </Box>
    </Paper>
  );
};

function generateAIInsights(metrics: Metrics): AIInsight[] {
  const insights: AIInsight[] = [];

  const machineUsageInsight: AIInsight = {
    id: "0",
    kategori: "performans",
    oncelik:
      metrics.machineCondition > 85
        ? "dusuk"
        : metrics.machineCondition < 50
        ? "yuksek"
        : "orta",
    baslik: "Makine Kullanım Optimizasyonu",
    oneri:
      metrics.machineCondition > 85
        ? "Makineler mükemmel durumda. Enerji tasarrufu sağlamak ve aşınmayı azaltmak için mümkün olduğunca daha az makine kullanarak operasyonları optimize etmeyi düşünün."
        : metrics.machineCondition < 50
        ? "Makine performansı optimal değil. Makine kullanımını azaltmayı ve acil bakım planlamayı düşünün."
        : "Makine durumu orta seviyede. Makine kullanımını optimize etmek verimliliği artırabilir.",
    etki: "Operasyonel verimlilik",
    guvenilirlik: 90,
    zaman: Date.now(),
  };
  insights.push(machineUsageInsight);

  const airValue = convertAirCondition(metrics.airCondition);
  const airInsight: AIInsight = {
    id: "1",
    kategori: "verimlilik",
    oncelik: metrics.airCondition < 50 ? "yuksek" : "dusuk",
    baslik: "Hava Kalitesi Yönetimi",
    oneri:
      metrics.airCondition < 50
        ? `Hava Kalitesi ${airValue}. Havalandırmayı iyileştirmeyi ve filtreleri kontrol etmeyi düşünün.`
        : `Hava Kalitesi ${airValue}. Hava kalitesi optimum.`,
    etki: "Sağlık ve güvenlik",
    guvenilirlik: 85,
    zaman: Date.now(),
  };
  insights.push(airInsight);

  const temperatureInsight: AIInsight = {
    id: "2",
    kategori: "verimlilik",
    oncelik: metrics.temperature > 30 ? "yuksek" : "dusuk",
    baslik: "Sıcaklık Kontrolü",
    oneri:
      metrics.temperature > 30
        ? `Sıcaklık ${metrics.temperature}°C. Yüksek; soğutma önlemleri almayı düşünün.`
        : `Sıcaklık ${metrics.temperature}°C, ideal aralıkta.`,
    etki: "Operasyonel verimlilik",
    guvenilirlik: 80,
    zaman: Date.now(),
  };
  insights.push(temperatureInsight);

  const lightsValue = convertLights(metrics.lights);
  const lightsInsight: AIInsight = {
    id: "3",
    kategori: "verimlilik",
    oncelik: metrics.lights < 50 ? "orta" : "dusuk",
    baslik: "Aydınlatma Optimizasyonu",
    oneri:
      metrics.lights < 50
        ? `Işıklar ${lightsValue} olarak ayarlanmış. Parlaklığı artırmak verimliliği yükseltebilir.`
        : `Işıklar ${lightsValue} olarak ayarlanmış. Aydınlatma iyi optimize edilmiş.`,
    etki: "Operasyonel verimlilik",
    guvenilirlik: 75,
    zaman: Date.now(),
  };
  insights.push(lightsInsight);

  const forkliftInsight: AIInsight = {
    id: "4",
    kategori: "guvenlik",
    oncelik: metrics.forkliftCount > 10 ? "yuksek" : "dusuk",
    baslik: "Forklift Trafik Yönetimi",
    oneri:
      metrics.forkliftCount > 10
        ? `Forklift trafiği ${metrics.forkliftCount} aktif ünite ile yüksek. Güvenlik protokollerinin yerinde olduğundan emin olun.`
        : `Forklift trafiği ${metrics.forkliftCount}. Trafik seviyeleri kontrol altında.`,
    etki: "Güvenlik",
    guvenilirlik: 85,
    zaman: Date.now(),
  };
  insights.push(forkliftInsight);

  const employeeInsight: AIInsight = {
    id: "5",
    kategori: "verimlilik",
    oncelik: metrics.employeeCount < 5 ? "yuksek" : "dusuk",
    baslik: "Çalışan Yönetimi",
    oneri:
      metrics.employeeCount < 5
        ? `Çalışan sayısı düşük (${metrics.employeeCount}). Vardiya programlarını ayarlamayı düşünün.`
        : `Çalışan sayısı ${metrics.employeeCount}. Personel seviyesi yeterli.`,
    etki: "Operasyonel verimlilik",
    guvenilirlik: 80,
    zaman: Date.now(),
  };
  insights.push(employeeInsight);

  const energyEfficiency = (metrics.lights / (metrics.temperature || 1)).toFixed(2);
  const energyInsight: AIInsight = {
    id: "6",
    kategori: "verimlilik",
    oncelik: parseFloat(energyEfficiency) < 1 ? "yuksek" : "dusuk",
    baslik: "Enerji Verimliliği",
    oneri:
      parseFloat(energyEfficiency) < 1
        ? `Enerji Verimliliği Endeksi ${energyEfficiency}. Enerji kullanımını optimize etmeyi düşünün.`
        : `Enerji Verimliliği Endeksi ${energyEfficiency}. Enerji kullanımı verimli.`,
    etki: "Operasyonel verimlilik",
    guvenilirlik: 75,
    zaman: Date.now(),
  };
  insights.push(energyInsight);

  const overallStatusInsight: AIInsight = {
    id: "7",
    kategori: "performans",
    oncelik:
      metrics.machineCondition > 80 &&
      metrics.airCondition > 50 &&
      metrics.temperature < 30 &&
      metrics.forkliftCount < 10
        ? "dusuk"
        : "orta",
    baslik: "Genel Sistem Durumu",
    oneri:
      metrics.machineCondition > 80 &&
      metrics.airCondition > 50 &&
      metrics.temperature < 30 &&
      metrics.forkliftCount < 10
        ? "Genel sistem durumu mükemmel. Tüm ana metrikler optimum aralıkta."
        : "Sistem performansı orta. Potansiyel iyileştirmeler için belirli alanları gözden geçirin.",
    etki: "Operasyonel verimlilik",
    guvenilirlik: 80,
    zaman: Date.now(),
  };
  insights.push(overallStatusInsight);

  const maintenanceInsight: AIInsight = {
    id: "8",
    kategori: "bakim",
    oncelik: metrics.machineCondition < 60 ? "yuksek" : "dusuk",
    baslik: "Bakım Gereksinimi",
    oneri:
      metrics.machineCondition < 60
        ? "Olası arızaları önlemek için makineler acil bakım gerektiriyor."
        : "Makineler iyi durumda, ancak düzenli bakım önerilir.",
    etki: "Operasyonel verimlilik",
    guvenilirlik: 85,
    zaman: Date.now(),
  };
  insights.push(maintenanceInsight);

  const operationalInsight: AIInsight = {
    id: "9",
    kategori: "verimlilik",
    oncelik:
      metrics.employeeCount > 10 && metrics.forkliftCount > 10 ? "orta" : "dusuk",
    baslik: "Operasyonel Verimlilik",
    oneri:
      metrics.employeeCount > 10 && metrics.forkliftCount > 10
        ? "Operasyonları düzene sokmak ve verimliliği artırmak için iş akışlarını optimize etmeyi düşünün."
        : "Operasyonel verimlilik tatmin edici görünüyor. Ana metrikleri izlemeye devam edin.",
    etki: "Operasyonel verimlilik",
    guvenilirlik: 80,
    zaman: Date.now(),
  };
  insights.push(operationalInsight);

  return insights;
}

function convertAirCondition(value: number): string {
  if (value < 50) return "Zayıf";
  if (value < 75) return "Orta";
  return "İyi";
}

function convertLights(value: number): string {
  if (value < 50) return "Düşük";
  if (value < 75) return "Orta";
  return "Yüksek";
}

export default React.memo(DynamicAISuggestions);
