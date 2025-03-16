import React from 'react';
import {
  Box,
  Typography,
  Button,
} from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { industrialAnimations } from '../styles/animations'; 
import { images } from '../images';

export const Hero: React.FC = () => {
  return (
    <Box sx={{ position: 'relative', height: '100vh', overflow: 'hidden' }}>
      {/* Video arka plan */}
      <video
        autoPlay
        loop
        muted
        playsInline
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          top: 0,
          left: 0
        }}
      >
        <source src={images.heroVideo} type="video/mp4" />
        Tarayıcınız video etiketini desteklemiyor.
      </video>
      {/* Üst katman içerik */}
      <Box
        sx={{
          position: 'relative',
          zIndex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
          color: 'white',
          textAlign: 'center',
          backgroundColor: 'rgba(0,0,0,0.4)',
          px: 2
        }}
      >
        <Typography
          variant="h2"
          sx={{
            fontWeight: 'bold',
            mb: 2,
            animation: `${industrialAnimations.fadeIn} 2s`
          }}
        >
          Endüstriyel Dijital Dönüşüm
        </Typography>
        <Typography
          variant="h5"
          sx={{ mb: 4, animation: `${industrialAnimations.fadeIn} 2s` }}
        >
          Yarının Fabrikası İçin Gelecek Vizyonlu Yapay Zeka Destekli Optimizasyon
        </Typography>
        <Button variant="contained" color="secondary" size="large" sx={{ mb: 2 }}>
          Başlayın
        </Button>
        <Button
          variant="text"
          color="inherit"
          startIcon={<KeyboardArrowDownIcon />}
          href="#about"
        >
          Detayları Öğrenin
        </Button>
      </Box>
    </Box>
  );
};
