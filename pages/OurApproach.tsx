import React from "react";
import { Container, Typography, Box } from "@mui/material";
import { industrialAnimations } from "../styles/animations";

const OurApproach: React.FC = () => {
  return (
    <Container sx={{ py: 8 }} className="fade-in" style={{ animation: `${industrialAnimations.slideIn} 1s` }}>
      <Typography variant="h1" align="center" gutterBottom>
        Yaklaşımımız
      </Typography>
      <Typography variant="body1" align="center" sx={{ maxWidth: 800, mx: "auto" }}>
        Dijital dönüşümünüzü yönlendirmek için yenilikçi teknolojiyi, yapay zeka destekli içgörüleri ve derin sektör uzmanlığını birleştiriyoruz.
      </Typography>
      <Box sx={{ mt: 4 }}>
        <Typography variant="h2" align="center" gutterBottom>
          Adım 1: Danışmanlık & Denetim
        </Typography>
        <Typography variant="body1" align="center">
          Benzersiz fırsatlarınızı belirlemek için kapsamlı bir denetimle başlıyoruz.
        </Typography>
      </Box>
      <Box sx={{ mt: 4 }}>
        <Typography variant="h2" align="center" gutterBottom>
          Adım 2: Özel Strateji
        </Typography>
        <Typography variant="body1" align="center">
          Uzmanlarımız, AI, IoT ve modern çözümleri entegre eden özel bir strateji tasarlar.
        </Typography>
      </Box>
      <Box sx={{ mt: 4 }}>
        <Typography variant="h2" align="center" gutterBottom>
          Adım 3: Uygulama & Destek
        </Typography>
        <Typography variant="body1" align="center">
          Çözümünüzü sorunsuzca uyguluyor, sürekli destek ve optimizasyon sağlıyoruz.
        </Typography>
      </Box>
    </Container>
  );
};

export default OurApproach;
