import React, { useState, useEffect } from 'react';
import {
  Paper,
  Typography,
  Box,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Chip,
  Collapse,
  useTheme,
  alpha,
} from '@mui/material';
import {
  NotificationsActive as NotificationsActiveIcon,
  Close as CloseIcon,
  ArrowUpward as ArrowUpwardIcon,
  Warning as WarningIcon,
  Info as InfoIcon,
  Error as ErrorIcon,
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import { keyframes } from '@emotion/react';

interface Notification {
  id: string;
  tur: 'kritik' | 'uyari' | 'bilgi' | 'basari';
  mesaj: string;
  zaman: string;
  okundu?: boolean;
}

interface EnhancedNotificationsProps {
  notifications: Notification[];
  onDismiss?: (id: string) => void;
}

// Remove unused animations
const pulseAnimation = keyframes`
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.02); }
`;

const EnhancedNotifications: React.FC<EnhancedNotificationsProps> = ({
  notifications,
  onDismiss,
}) => {
  const theme = useTheme();
  const [expanded, setExpanded] = useState(true);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    setUnreadCount(notifications.filter(n => !n.okundu).length);
  }, [notifications]);

  const getNotificationIcon = (tur: string) => {
    switch (tur) {
      case 'kritik': return <ErrorIcon color="error" />;
      case 'uyari': return <WarningIcon color="warning" />;
      case 'basari': return <ArrowUpwardIcon color="success" />;
      default: return <InfoIcon color="info" />;
    }
  };

  return (
    <Paper
      elevation={4}
      sx={{
        borderRadius: 3,
        overflow: 'hidden',
        background: (theme) => `linear-gradient(145deg, 
          ${alpha(theme.palette.background.paper, 0.97)}, 
          ${alpha(theme.palette.background.paper, 0.87)})`,
        backdropFilter: 'blur(20px)',
        border: (theme) => `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
        position: 'relative',
        animation: `${pulseAnimation} 3s infinite ease-in-out`,
        '& .notification-item': {
          transition: 'all 0.3s ease-in-out',
          '&:hover': {
            transform: 'translateX(8px)',
            background: (theme) => alpha(theme.palette.primary.main, 0.05),
          }
        },
        '&::after': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: (theme) => `
            radial-gradient(circle at top right, 
              ${alpha(theme.palette.primary.main, 0.1)} 0%, 
              transparent 60%
            )
          `,
          pointerEvents: 'none',
        }
      }}
    >
      <Box sx={{ p: 2 }}>
        <Typography variant="h6">
          Sistem Bildirimleri
        </Typography>
        <Typography variant="subtitle2" color="text.secondary">
          Gerçek Zamanlı İzleme ve Uyarı Sistemi
        </Typography>
      </Box>
      <Box
        sx={{
          position: 'relative',
          zIndex: 1,
        }}
      >
        {/* Header */}
        <Box
          sx={{
            p: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderBottom: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
            background: `linear-gradient(90deg, 
              ${alpha(theme.palette.primary.main, 0.1)}, 
              ${alpha(theme.palette.background.paper, 0)})`,
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <NotificationsActiveIcon color="primary" />
            <Typography variant="h6">
              Bildirimler
            </Typography>
            {unreadCount > 0 && (
              <Chip
                size="small"
                label={unreadCount}
                color="primary"
                sx={{ ml: 1 }}
              />
            )}
          </Box>
          <IconButton
            size="small"
            onClick={() => setExpanded(!expanded)}
            sx={{ transform: expanded ? 'rotate(180deg)' : 'none' }}
          >
            <ArrowUpwardIcon />
          </IconButton>
        </Box>

        {/* Notifications List */}
        <Collapse in={expanded}>
          <List
            sx={{
              maxHeight: 400,
              overflowY: 'auto',
              p: 0,
              '&::-webkit-scrollbar': {
                width: '6px',
              },
              '&::-webkit-scrollbar-thumb': {
                backgroundColor: alpha(theme.palette.primary.main, 0.2),
                borderRadius: '3px',
              },
            }}
          >
            <AnimatePresence initial={false}>
              {notifications.map((notification) => (
                <motion.div
                  key={notification.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.2 }}
                >
                  <ListItem
                    className="notification-item"
                    sx={{
                      borderBottom: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        background: alpha(theme.palette.primary.main, 0.05),
                      },
                    }}
                    secondaryAction={
                      onDismiss && (
                        <IconButton
                          edge="end"
                          size="small"
                          onClick={() => onDismiss(notification.id)}
                        >
                          <CloseIcon fontSize="small" />
                        </IconButton>
                      )
                    }
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, width: '100%' }}>
                      {getNotificationIcon(notification.tur)}
                      <ListItemText
                        primary={notification.mesaj}
                        secondary={new Date(notification.zaman).toLocaleTimeString()}
                        sx={{
                          '& .MuiListItemText-primary': {
                            fontSize: '0.9rem',
                            fontWeight: notification.okundu ? 400 : 600,
                          },
                          '& .MuiListItemText-secondary': {
                            fontSize: '0.8rem',
                          },
                        }}
                      />
                    </Box>
                  </ListItem>
                </motion.div>
              ))}
            </AnimatePresence>
          </List>
        </Collapse>
      </Box>
    </Paper>
  );
};

export default EnhancedNotifications;
