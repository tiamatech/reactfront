import React from "react";
import { Container, Typography, Grid, Card, CardContent, CardMedia } from "@mui/material";
import { motion } from "framer-motion";
import { images } from "../images"; // centralized assets file

// Framer Motion animation variant for a smooth entrance
const fadeInUp = {
  hidden: { opacity: 0, y: 100 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
};

const innovations = [
  {
    title: "Öngörüsel Analiz",
    description: "Yapay zeka destekli tahminlerle arıza risklerini minimize edin.",
    image: images.mediaGif2,
  },
  {
    title: "Akıllı Sensör Teknolojileri",
    description: "Gerçek zamanlı veri toplayarak operasyonlarınızı optimize edin.",
    image: images.innovation2,
  },
  {
    title: "Dijital İkiz",
    description: "Fabrikanızın dijital kopyasıyla simülasyon ve optimizasyon yapın.",
    image: images.innovation3,
  },
  {
    title: "Sanal Üretim Modeli",
    description: "Üretim süreçlerinizi dijital ortamda modelleyerek verimliliği artırın.",
    image: images.innovation1,
  },
  {
    title: "Endüstriyel IoT Entegrasyonu",
    description: "Nesnelerin interneti ile cihazlarınızı akıllı bir ağda birleştirin.",
    image: images.sideImageRight,
  },
  {
    title: "Siber Güvenlik Çözümleri",
    description: "Gelişmiş güvenlik teknolojileriyle verilerinizi ve altyapınızı koruyun.",
    image: images.sideImageLeft,
  },
];

const InnovationsSection: React.FC = () => {
  return (
    <Container id="innovations" sx={{ py: 6 }}>
      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
        <Typography variant="h3" align="center" gutterBottom sx={{ color: "text.primary" }}>
          Yeni Teknolojiler
        </Typography>
      </motion.div>
      <Grid container spacing={4}>
        {innovations.map((item, index) => (
          <Grid item xs={12} sm={4} key={index}>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              <Card
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  height: "100%",
                  boxShadow: 3,
                  transition: "transform 0.3s",
                  "&:hover": {
                    transform: "scale(1.05) rotateY(5deg)",
                    perspective: "1000px",
                  },
                }}
              >
                <CardMedia
                  component="img"
                  height="200"
                  image={item.image}
                  alt={item.title}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h5" gutterBottom sx={{ color: "text.primary" }}>
                    {item.title}
                  </Typography>
                  <Typography variant="body2" sx={{ color: "text.secondary" }}>
                    {item.description}
                  </Typography>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default InnovationsSection;
