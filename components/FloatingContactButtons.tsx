import React from 'react';
import { Box, IconButton, useTheme } from '@mui/material';
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";

interface FloatingContactButtonsProps {
  onOpenChat: () => void;
  whatsappNumber?: string;
  position?: {
    bottom?: number | string;
    right?: number | string;
    left?: number | string;
    top?: number | string;
  };
}

const FloatingContactButtons: React.FC<FloatingContactButtonsProps> = ({
  onOpenChat,
  whatsappNumber = "905344695851",
  position = { bottom: 20, right: 20 }
}) => {
  const theme = useTheme();

  const handleWhatsAppClick = () => {
    window.open(`https://wa.me/${whatsappNumber}`, "_blank");
  };

  return (
    <Box
      sx={{
        position: "fixed",
        ...position,
        display: "flex",
        flexDirection: "column",
        gap: 1,
        zIndex: 1300,
        transition: 'all 0.3s ease',
      }}
    >
      <IconButton
        onClick={handleWhatsAppClick}
        sx={{
          backgroundColor: "#25D366",
          color: "#fff",
          "&:hover": { 
            backgroundColor: "#1ebe57",
            transform: 'scale(1.1)'
          },
          boxShadow: 3,
          transition: 'all 0.3s ease',
        }}
        size="large"
      >
        <WhatsAppIcon />
      </IconButton>
      <IconButton
        onClick={onOpenChat}
        sx={{
          backgroundColor: theme.palette.primary.main,
          color: "#fff",
          "&:hover": { 
            backgroundColor: theme.palette.primary.dark,
            transform: 'scale(1.1)'
          },
          boxShadow: 3,
          transition: 'all 0.3s ease',
        }}
        size="large"
      >
        <ChatBubbleOutlineIcon />
      </IconButton>
    </Box>
  );
};

export default FloatingContactButtons;
