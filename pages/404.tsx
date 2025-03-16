import React from 'react';
import { Container, Typography, Button } from '@mui/material';
import Link from 'next/link';
import { useTheme } from '@mui/material/styles';

const NotFound: React.FC = () => {
  const theme = useTheme();

  return (
    <Container
      component="main"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        textAlign: 'center',
        backgroundColor: theme.palette.background.default
      }}
    >
      <Typography
        variant="h1"
        sx={{
          fontSize: { xs: '5rem', md: '7rem' },
          fontWeight: 800,
          color: theme.palette.error.main
        }}
      >
        404
      </Typography>
      <Typography variant="h4" gutterBottom>
        Üzgünüz! Sayfa Bulunamadı
      </Typography>
      <Typography variant="body1" sx={{ mb: 3 }}>
        Aradığınız kaynak kaldırılmış ya da geçici olarak kullanılamıyor olabilir.
      </Typography>
      <Link href="/">
        <Button
          variant="contained"
          size="large"
          sx={{
            px: 6,
            transition: '0.3s',
            '&:hover': { transform: 'scale(1.05)' }
          }}
        >
          Ana Sayfaya Dön
        </Button>
      </Link>
    </Container>
  );
};

export default NotFound;
