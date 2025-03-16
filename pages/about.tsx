import React from "react";
import { Box, Container, Typography, Button } from "@mui/material";
import { motion } from "framer-motion";
import { images } from "../images";
import Link from "next/link";

const About: React.FC = () => {
  return (
    <Box
      sx={{
        position: "relative",
        minHeight: "100vh", // Use minHeight for mobile browsers with dynamic toolbars
        overflow: "hidden",
      }}
    >
      {/* Background Video/GIF */}
      <Box
        component="img"
        src={images.aiBackground}
        alt="Teknoloji ve Dijital Dönüşüm"
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100vh",
          objectFit: "cover",
          zIndex: 100,
        }}
      />

      {/* Dark Overlay */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(0,0,0,0.6)",
          zIndex: 150,
        }}
      />

      {/* Content Container */}
      <Container
        sx={{
          position: "relative",
          zIndex: 200,
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          color: "common.white",
          px: { xs: 2, sm: 4 },
        }}
      >
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 2 }}>
          <Typography variant="h2" component="h1" gutterBottom sx={{ fontWeight: 700, mb: 2 }}>
            Tiamat Tech Hakkında
          </Typography>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 2, delay: 0.5 }}>
          <Typography variant="h5" sx={{ fontWeight: 500, mb: 4, maxWidth: 800, mx: "auto" }}>
            Geleceğin Endüstri 4.0 Çözümleri, Yenilikçi Teknoloji ve Akıllı Otomasyon
          </Typography>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 2, delay: 1 }}>
          <Typography
            variant="body1"
            paragraph
            sx={{
              maxWidth: { xs: "100%", sm: 1400 },
              mx: "auto",
              fontSize: "1.1rem",
            }}
          >
            Kurumsal müşterilerimize özel olarak geliştirdiğimiz ileri seviye sistemler, üretim hatlarından bakım
            süreçlerine kadar her alanda süreç optimizasyonu sağlayarak maliyet etkinliği ve verimliliği artırır.
            <br /><br />
            Teknolojideki sürekli evrimi yakından takip eden Tiamat Tech, Endüstri 4.0’ın sunduğu dijital ikiz, akıllı
            sensör teknolojileri, Nesnelerin İnterneti (IoT) entegrasyonu ve siber güvenlik çözümleri gibi modern
            uygulamaları iş süreçlerine entegre eder. Gerçek zamanlı veri akışlarını analiz eden yapay zeka destekli
            platformlarımız, işletmelerin karar alma süreçlerine hız ve doğruluk katar; böylece rekabet avantajlarını
            sürdürülebilir büyüme ile pekiştirir.
            <br /><br />
            Stratejik vizyonumuz, teknolojiyi yalnızca bir araç olarak görmekten öte, işletmelerin dijital dönüşüm yolculuğunda
            yanlarında yer alarak geleceğin iş modellerini inşa etmelerine öncülük etmektir. Müşteri odaklı yaklaşımımızla,
            veriye dayalı stratejiler ve inovatif altyapılar sayesinde, her sektöre özel çözümler geliştiriyor; işletmelerin
            süreçlerini yeniden yapılandırıyor ve dijital çağın getirdiği fırsatları maksimum düzeyde değerlendiriyoruz.
            <br /><br />
            Tiamat Tech, sürekli yenilenen ürün portföyü, ileri Ar-Ge çalışmaları ve sektörün en yetkin iş ortakları ile
            teknolojide yeni standartların belirlenmesine öncülük eder. Geleceğe dair vizyonumuz, teknolojinin sınırlarını
            zorlayarak iş dünyasında devrim niteliğinde dönüşümler gerçekleştirmek ve müşterilerimize sürdürülebilir
            başarı sunmaktır.
          </Typography>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
        >
          <Link href="/contact">
            <Button
              variant="contained"
              size="large"
              sx={{
                mt: 4,
                background: "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
                color: "#fff",
                borderRadius: 3,
                px: 4,
                py: 1.5,
                boxShadow: 6,
                "&:hover": { transform: "translateY(-2px)", boxShadow: 8 },
                textDecoration: "none"
              }}
            >
              Bizimle İletişime Geçin
            </Button>
          </Link>
        </motion.div>
      </Container>
    </Box>
  );
};

export default About;
