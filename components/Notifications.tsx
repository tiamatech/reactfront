import React from "react";
import {
  Paper,
  Typography,
  List,
  ListItem,
  ListItemText,
  Box,
  IconButton,
  styled
} from "@mui/material";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import CloseIcon from '@mui/icons-material/Close';
import { Notification } from "../types";

const StyledPaper = styled(Paper)(({ theme }) => ({
  borderRadius: "16px",
  background:
    theme.palette.mode === 'dark'
      ? 'linear-gradient(145deg, #1a1a1a, #2a2a2a)'
      : 'linear-gradient(145deg, #ffffff, #f5f5f5)',
  boxShadow: theme.shadows[10],
  minWidth: 320,
  maxWidth: 400,
  maxHeight: "60vh",
  overflow: "hidden",
  "&::-webkit-scrollbar": {
    width: "8px",
  },
  "&::-webkit-scrollbar-thumb": {
    backgroundColor: theme.palette.primary.main,
    borderRadius: "4px",
  },
}));

const NotificationHeader = styled(Box)(() => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "16px 24px",
  background: "rgba(255, 255, 255, 0.1)",
  backdropFilter: "blur(10px)",
}));

const NotificationItem = styled(ListItem)(({ theme }) => ({
  padding: "12px 24px",
  transition: "all 0.2s ease",
  "&:hover": {
    background: theme.palette.action.hover,
    transform: "translateX(8px)",
  },
  "&:not(:last-child)": {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
}));

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      when: "beforeChildren",
    },
  },
};

const itemVariants = (reduceMotion?: boolean) => ({
  hidden: reduceMotion ? { opacity: 0 } : { opacity: 0, x: -50 },
  visible: reduceMotion ? { opacity: 1 } : { opacity: 1, x: 0 },
  exit: reduceMotion ? { opacity: 0 } : { opacity: 0, x: 50, scale: 0.8 },
});

interface Props {
  notifications: Notification[];
  onDismiss?: (id: number) => void;  // now expects a number
}

const Notifications: React.FC<Props> = ({ notifications, onDismiss }) => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <StyledPaper>
      <NotificationHeader>
        <Box display="flex" alignItems="center" gap={1}>
          <NotificationsActiveIcon fontSize="medium" color="primary" />
          <Typography variant="h6" fontWeight="600">
            Bildirimler
          </Typography>
          <Typography variant="caption" color="text.secondary" sx={{ ml: 1 }}>
            ({notifications.length})
          </Typography>
        </Box>
      </NotificationHeader>

      <AnimatePresence mode="sync">
        {notifications.length > 0 ? (
          <List
            component={motion.ul}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            style={{ overflowY: 'auto' }}
          >
            {notifications.map((notification) => (
              <motion.div
                key={notification.id}
                variants={itemVariants(shouldReduceMotion ?? false)}
                initial="hidden"
                animate="visible"
                exit="exit"
                layout
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <NotificationItem>
                  <ListItemText
                    primary={notification.message}
                    secondary={new Date(notification.timestamp).toLocaleTimeString()}
                    primaryTypographyProps={{ fontWeight: 500 }}
                    secondaryTypographyProps={{ variant: "caption" }}
                  />
                  {onDismiss && (
                    <IconButton
                      size="small"
                      onClick={() => onDismiss(notification.id)}
                      aria-label="Bildirimi Kapat"
                    >
                      <CloseIcon fontSize="small" />
                    </IconButton>
                  )}
                </NotificationItem>
              </motion.div>
            ))}
          </List>
        ) : (
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            p={4}
            component={motion.div}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <NotificationsActiveIcon fontSize="large" color="disabled" sx={{ mb: 1 }} />
            <Typography variant="body2" color="text.secondary">
              Yeni bildirim yok
            </Typography>
          </Box>
        )}
      </AnimatePresence>
    </StyledPaper>
  );
};

export default Notifications;
