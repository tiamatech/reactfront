import React from 'react';
import { Box, Container, Grid, Typography, useTheme, alpha, IconButton } from '@mui/material';
import { styled, keyframes } from '@mui/material/styles';
import Link from 'next/link';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { images } from "../images";

// Define a keyframes animation for the gradient
const gradientAnimation = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

// Custom NavLink for navigation links
const StyledNavLink = styled("div")(({ theme }) => ({
  textDecoration: "none !important",
  textDecorationLine: "none !important",
  border: "none",
  outline: "none",
  "&:hover, &:focus, &:active, &:visited": {
    textDecoration: "none !important",
    textDecorationLine: "none !important",
    border: "none",
    outline: "none",
  },
  color:
    theme.palette.mode === 'dark'
      ? alpha(theme.palette.common.white, 0.86)
      : alpha(theme.palette.common.black, 0.86),
  fontWeight: 500,
  fontSize: '0.9rem',
  transition: 'color 0.3s ease',
  '&:hover': {
    textDecoration: "none !important",
    textDecorationLine: "none",
    background: `linear-gradient(135deg, ${theme.palette.tech?.cyber || theme.palette.secondary.main} 0%, ${theme.palette.tech?.neon || theme.palette.secondary.main} 100%)`,
    backgroundSize: '200% auto',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    animation: `${gradientAnimation} 2s linear infinite`,
  },
  cursor: 'pointer'
}));

const Footer: React.FC = () => {
  const theme = useTheme();
  // Fallback to secondary if tech colors are undefined
  const techCyber = theme.palette.tech?.cyber || theme.palette.secondary.main;
  const techNeon = theme.palette.tech?.neon || theme.palette.secondary.main;

  return (
    <Box
      component="footer"
      sx={{
        background: theme.palette.background.paper,
        py: 4,
        px: { xs: 2, sm: 4, md: 6 },
        mt: 8,
      }}
    >
      <Container maxWidth="xl" sx={{ 
        "& a": {
          textDecoration: "none !important",
          "&:hover": {
            textDecoration: "none !important"
          }
        }
      }}>
        {/* Top Row: Logo and TIAMAT TECH text */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            alignItems: 'center',
            justifyContent: { xs: 'center', md: 'flex-start' },
            mb: 2,
            px: { xs: 2, md: 10 },
          }}
        >
          <Box
            component="img"
            src={images.logo}
            alt="Tiamat Tech Logosu"
            sx={{ height: 60, mr: { xs: 0, md: 2 }, mb: { xs: 1, md: 0 } }}
          />
          <Typography
            variant="h6"
            sx={{
              background: `linear-gradient(135deg, ${techCyber} 0%, ${techNeon} 100%)`,
              backgroundSize: '200% auto',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontWeight: 700,
              animation: `${gradientAnimation} 3s linear infinite`,
            }}
          >
            TIAMAT TECH
          </Typography>
        </Box>

        {/* Second Row: Navigation Links and Social Icons */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            alignItems: 'center',
            justifyContent: 'space-between',
            mb: 2,
            px: { xs: 2, md: 10 },
          }}
        >
          {/* Navigation Links */}
          <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 2,
              justifyContent: 'center',
            }}
          >
            <Link href="/" passHref legacyBehavior>
              <StyledNavLink>ANASAYFA</StyledNavLink>
            </Link>
            <Link href="/inovations" passHref legacyBehavior>
              <StyledNavLink>İNOVASYONLAR</StyledNavLink>
            </Link>
            <Link href="/contact" passHref legacyBehavior>
              <StyledNavLink>İLETİŞİM</StyledNavLink>
            </Link>
            <Link href="/careers" passHref legacyBehavior>
              <StyledNavLink>KARİYER</StyledNavLink>
            </Link>
            <Link href="/faq" passHref legacyBehavior>
              <StyledNavLink>S.S.S</StyledNavLink>
            </Link>
          </Box>
          {/* Social Icons */}
          <Box
            sx={{
              display: 'flex',
              gap: 1,
              mt: { xs: 2, md: 0 },
              justifyContent: 'center',
            }}
          >
            <IconButton
              component="a"
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              sx={{ color: theme.palette.text.primary }}
            >
              <FacebookIcon />
            </IconButton>
            <IconButton
              component="a"
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              sx={{ color: theme.palette.text.primary }}
            >
              <InstagramIcon />
            </IconButton>
            <IconButton
              component="a"
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              sx={{ color: theme.palette.text.primary }}
            >
              <TwitterIcon />
            </IconButton>
            <IconButton
              component="a"
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              sx={{ color: theme.palette.text.primary }}
            >
              <LinkedInIcon />
            </IconButton>
          </Box>
        </Box>

        {/* Divider */}
        <Box
          sx={{
            borderTop: `2px solid ${alpha(techNeon, 0.2)}`,
            mb: 2,
            px: { xs: 2, md: 10 },
          }}
        />

        {/* Bottom Row: Copyright & Additional Links */}
        <Grid container alignItems="center" sx={{ px: { xs: 2, md: 10 } }}>
          <Grid item xs={12} md={6} sx={{ textAlign: { xs: 'center', md: 'left' } }}>
            <Typography variant="body2" sx={{ color: alpha(theme.palette.text.primary, 0.6) }}>
              © 2025 TIAMAT TECH - Tüm hakları saklıdır.
            </Typography>
          </Grid>
          <Grid item xs={12} md={6} sx={{ textAlign: { xs: 'center', md: 'right' }, mt: { xs: 1, md: 0 } }}>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, justifyContent: { xs: 'center', md: 'flex-end' } }}>
              <Link href="/terms-of-service" passHref legacyBehavior>
                <StyledNavLink>KULLANIM ŞARTLARI</StyledNavLink>
              </Link>
              <Link href="/privacy-policy" passHref legacyBehavior>
                <StyledNavLink>GİZLİLİK POLİTİKASI</StyledNavLink>
              </Link>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Footer;
