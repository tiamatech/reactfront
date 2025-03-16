import React from "react";
import { Modal, Box, Typography, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { keyframes } from "@mui/system";

interface Software {
  id: string;
  name: string;
  image: string;
  description: string;
  details: string;
}

interface SoftwareDetailModalProps {
  open: boolean;
  software: Software | null;
  onClose: () => void;
}

const modalFadeIn = keyframes`
  from { opacity: 0; transform: scale(0.95); }
  to { opacity: 1; transform: scale(1); }
`;

const style = {
  position: "absolute" as const,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { xs: "90%", sm: 600 },
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: 2,
  p: 4,
  animation: `${modalFadeIn} 0.3s ease forwards`,
} as const;

const SoftwareDetailModal: React.FC<SoftwareDetailModalProps> = ({ open, software, onClose }) => {
  if (!software) return null;
  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={style}>
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
          <Typography variant="h5">{software.name}</Typography>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>
        <Box component="img" src={software.image} alt={software.name} sx={{ width: "100%", borderRadius: 1, mb: 2 }} />
        <Typography variant="subtitle1" color="text.secondary" gutterBottom>
          {software.description}
        </Typography>
        <Typography variant="body1">
          {software.details}
        </Typography>
      </Box>
    </Modal>
  );
};

export default SoftwareDetailModal;
