import React, { useState, useCallback } from "react";
import {
  AppBar,
  Toolbar,
  Container,
  Button,
  IconButton,
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  ListItemIcon,
  useMediaQuery,
  Box,
  Avatar,
  useTheme,
  styled,
  alpha,
  Typography,
} from "@mui/material";
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useColorMode } from "../theme";
import { images } from "../images";

// Navigation item icons
import CloudRounded from "@mui/icons-material/CloudRounded";
import CodeRounded from "@mui/icons-material/CodeRounded";
import MailRounded from "@mui/icons-material/MailRounded";
import DashboardRounded from "@mui/icons-material/DashboardRounded";
import InfoRounded from "@mui/icons-material/InfoRounded"; // Updated for "Hakkımızda"
import MenuRounded from "@mui/icons-material/MenuRounded";
import CloseRounded from "@mui/icons-material/CloseRounded";
import { keyframes } from "@mui/system";

// Define navigation items with distinct icons
const navItems = [
  { label: "Ürünler & Yazılımlar", path: "/products-services", icon: <CodeRounded sx={{ fontSize: "1.3rem" }} /> },
  { label: "İnovasyonlar", path: "/inovations", icon: <CloudRounded sx={{ fontSize: "1.3rem" }} /> },
  { label: "Hakkımızda", path: "/about", icon: <InfoRounded sx={{ fontSize: "1.3rem" }} /> },
  { label: "İletişim", path: "/contact", icon: <MailRounded sx={{ fontSize: "1.3rem" }} /> },
];

// Animations for header text and gradients
const shimmer = keyframes`
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
`;

const fadeInHeader = keyframes`
  from { opacity: 0; transform: translateY(-20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const gradientAnimation = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

// Styled navigation link with hover effects
const StyledBox = styled(Box)(({ theme }) => ({
  whiteSpace: "nowrap",
  textDecoration: "none !important",
  textDecorationLine: "none !important",
  border: "none",
  outline: "none",
  cursor: "pointer",
  "&:hover, &:focus, &:active, &:visited": {
    textDecoration: "none !important",
    textDecorationLine: "none !important",
    border: "none",
    outline: "none",
  },
  color:
    theme.palette.mode === "dark"
      ? alpha(theme.palette.common.white, 0.92)
      : alpha(theme.palette.common.black, 0.92),
  fontWeight: 500,
  fontSize: "1.1rem",
  letterSpacing: "0.03em",
  padding: theme.spacing(1, 2),
  position: "relative",
  transition: "color 0.3s ease, border-bottom 0.3s ease, transform 0.3s ease",
  "&::after": {
    content: '""',
    position: "absolute",
    bottom: 0,
    left: 0,
    width: "0%",
    height: "2px",
    background: theme.palette.tech.gradient,
    transition: "width 0.3s ease, color 0.3s ease",
  },
  "&:hover": {
    color: theme.palette.tech.neon,
    transform: "translateY(-2px)",
    background: `linear-gradient(135deg, ${
      theme.palette.tech?.cyber || theme.palette.secondary.main
    } 0%, ${theme.palette.tech?.neon || theme.palette.secondary.main} 100%)`,
    backgroundSize: "200% auto",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    animation: `${gradientAnimation} 2s linear infinite`,
    "&::after": {
      width: "100%",
    },
  },
}));

// Minimalistic, modern Dark Mode Toggle with embedded labels and a 3D-style circular knob
const DarkModeToggle: React.FC = () => {
  const theme = useTheme();
  const { toggleColorMode } = useColorMode();
  const isDark = theme.palette.mode === "dark";

  const knobStyle = {
    position: "absolute",
    top: 2,
    left: isDark ? "calc(100% - 30px)" : 2,
    width: 28,
    height: 28,
    borderRadius: "50%",
    boxShadow: "0 2px 4px rgba(0,0,0,0.3)",
    transition: "left 0.3s ease",
    background: isDark
      ? `linear-gradient(90deg, ${
          theme.palette.tech?.cyber || theme.palette.primary.main
        }, ${theme.palette.tech?.neon || theme.palette.secondary.main}, ${
          theme.palette.tech?.cyber || theme.palette.primary.main
        })`
      : "black",
    animation: isDark ? `${gradientAnimation} 3s linear infinite` : "none",
  };

  return (
    <Box
      onClick={toggleColorMode}
      sx={{
        display: "flex",
        alignItems: "center",
        cursor: "pointer",
        width: 80,
        height: 32,
        borderRadius: 16,
        backgroundColor: isDark
          ? alpha(theme.palette.primary.main, 0.8)
          : alpha(theme.palette.text.primary, 0.15),
        border: `1px solid ${alpha(theme.palette.text.primary, 0.2)}`,
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Embedded label inside the toggle */}
      <Typography
        variant="caption"
        sx={{
          position: "absolute",
          left: isDark ? 8 : "auto",
          right: isDark ? "auto" : 8,
          top: "50%",
          transform: "translateY(-50%)",
          color: isDark ? "white" : theme.palette.text.primary,
          fontWeight: "bold",
          transition: "all 0.3s ease",
        }}
      >
        {isDark ? "ON" : "OFF"}
      </Typography>
      {/* 3D-style circular knob */}
      <Box sx={knobStyle} />
    </Box>
  );
};

const Header: React.FC = () => {
  const theme = useTheme();
  const router = useRouter();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Toggle drawer open/close
  const handleDrawerToggle = useCallback(() => {
    setDrawerOpen((prev) => !prev);
  }, []);

  // Navigate and close drawer if needed
  const handleNavigate = useCallback(
    (path: string) => {
      router.push(path);
      if (drawerOpen) setDrawerOpen(false);
    },
    [router, drawerOpen]
  );

  return (
    <>
      <AppBar
        position="sticky"
        color="transparent"
        elevation={0}
        sx={{
          backdropFilter: "blur(32px) saturate(180%)",
          background: alpha(theme.palette.background.default, 0.82),
          borderBottom: `1px solid ${alpha(theme.palette.tech.neon, 0.12)}`,
          transition: "background 0.3s ease",
        }}
      >
        <Container maxWidth="xl">
          <Toolbar sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            {/* Left: Logo */}
            <Box sx={{ flex: 1, display: "flex", alignItems: "center" }}>
              <Link href="/" passHref>
              <IconButton
                disableRipple
                aria-label="Ana Sayfa"
                sx={{ p: theme.spacing(1.5) }}
              >
                <Avatar
                  src={images.logo}
                  alt="Tiamat Tech"
                  sx={{
                    width: 150,
                    height: 100,
                    filter:
                      theme.palette.mode === "dark"
                        ? "brightness(1) drop-shadow(0 4px 12px rgba(227, 231, 233, 0.5))"
                        : "none",
                  }}
                />
              </IconButton>
              </Link>
            </Box>

            {/* Center: Desktop Navigation */}
            {!isMobile && (
              <Box sx={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center" }}>
                {navItems.map((item) => (
                  <Link 
                    key={item.label} 
                    href={item.path} 
                    passHref
                    style={{ textDecoration: "none" }}
                  >
                    <StyledBox
                      sx={{
                        color: router.pathname === item.path ? theme.palette.tech.cyber : 'inherit',
                      }}
                    >
                      {item.label}
                    </StyledBox>
                  </Link>
                ))}
              </Box>
            )}

            {/* Right: Controls */}
            <Box sx={{ flex: 1, display: "flex", justifyContent: "flex-end", alignItems: "center", gap: 2 }}>
              {isMobile ? (
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  {/* Mobile: Custom Dark Mode Toggle */}
                  <DarkModeToggle />
                  {/* Mobile: Hamburger menu (modern, minimal style) */}
                  <IconButton
                    onClick={handleDrawerToggle}
                    aria-label="Navigasyon Menüsünü Aç/Kapat"
                    sx={{
                      p: 1,
                      background: "transparent",
                      "&:hover": { background: alpha(theme.palette.tech.neon, 0.1) },
                      transition: "all 0.4s ease",
                    }}
                  >
                    {drawerOpen ? (
                      <CloseRounded sx={{ fontSize: "2rem", color: theme.palette.text.primary }} />
                    ) : (
                      <MenuRounded sx={{ fontSize: "2rem", color: theme.palette.text.primary }} />
                    )}
                  </IconButton>
                </Box>
              ) : (
                <>
                  <Box
                    sx={{
                      textAlign: "center",
                      mt: 1.6,
                      mr: 3,
                      animation: `${fadeInHeader} 0.8s ease both`,
                    }}
                  >
                    <Typography
                      variant="h5"
                      sx={{
                        fontWeight: 700,
                        mb: 2,
                        cursor: "pointer",
                        background: `linear-gradient(90deg, ${
                          theme.palette.tech?.cyber || theme.palette.secondary.main
                        }, ${
                          theme.palette.tech?.neon || theme.palette.secondary.main
                        }, ${
                          theme.palette.tech?.cyber || theme.palette.secondary.main
                        })`,
                        backgroundSize: "200% auto",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        animation: `${shimmer} 3s linear infinite`,
                        transition: "all 0.3s ease",
                        "&:hover": {
                          WebkitBackgroundClip: "text",
                          WebkitTextFillColor: "transparent",
                          textShadow: "none",
                          transform: "scale(1.05) translateY(-3px)",
                        },
                      }}
                      onClick={() => handleNavigate("/enterprise-demo")}
                    >
                      Kurumsal Demo
                    </Typography>
                  </Box>
                  {/* Desktop: Custom Dark Mode Toggle */}
                  <DarkModeToggle />
                </>
              )}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={handleDrawerToggle}
        PaperProps={{
          sx: {
            width: "80vw",
            maxWidth: 400,
            height: "100vh",
            background: alpha(theme.palette.background.default, 0.98),
            backdropFilter: "blur(64px) saturate(180%)",
            overflowY: "auto",
            p: theme.spacing(2),
          },
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
          <IconButton onClick={handleDrawerToggle} aria-label="Menüyü Kapat" sx={{ p: 1 }}>
            <CloseRounded sx={{ fontSize: "2rem", color: theme.palette.text.primary }} />
          </IconButton>
        </Box>
        <List>
          {navItems.map((item) => (
            <ListItemButton
              key={item.label}
              onClick={() => handleNavigate(item.path)}
              sx={{
                py: 1.5,
                transition: "all 0.3s ease",
                "&:hover": {
                  pl: 3,
                  background: alpha(theme.palette.tech.neon, 0.05),
                },
              }}
            >
              <ListItemIcon sx={{ minWidth: 40, color: theme.palette.text.primary }}>
                {React.cloneElement(item.icon, { sx: { fontSize: "1.8rem" } })}
              </ListItemIcon>
              <ListItemText
                primary={item.label}
                primaryTypographyProps={{ variant: "body1", sx: { fontWeight: 600 } }}
              />
            </ListItemButton>
          ))}
          <ListItemButton onClick={() => handleNavigate("/enterprise-demo")} sx={{ mt: 2 }}>
            <Button
              variant="contained"
              color="primary"
              startIcon={<DashboardRounded sx={{ fontSize: "1.2rem" }} />}
              sx={{
                borderRadius: "24px",
                textTransform: "none",
                width: "100%",
                fontSize: "1.2rem",
              }}
            >
              Kurumsal Demo
            </Button>
          </ListItemButton>
        </List>
      </Drawer>
    </>
  );
};

export default React.memo(Header);
