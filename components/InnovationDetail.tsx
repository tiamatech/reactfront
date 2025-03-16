import React from "react";
import {
  Dialog,
  DialogContent,
  Typography,
  IconButton,
  Button,
  Box,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ShareIcon from "@mui/icons-material/Share";
import { motion } from "framer-motion";

interface InnovationDetailProps {
  innovation: {
    title: string;
    description: string;
    detail: string;
    image: string;
  } | null;
  open: boolean;
  onClose: () => void;
}

const InnovationDetail: React.FC<InnovationDetailProps> = ({
  innovation,
  open,
  onClose,
}) => {
  if (!innovation) return null;

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: innovation.title,
          text: innovation.detail,
          url: window.location.href,
        })
        .catch((err) => console.error("Error sharing", err));
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Link kopyalandı!");
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="md"
      PaperProps={{
        sx: { borderRadius: 4, boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.2)", p: 2 },
      }}
    >
      <IconButton
        onClick={onClose}
        sx={{
          position: "absolute",
          right: 16,
          top: 16,
          color: (theme) => theme.palette.grey[500],
        }}
      >
        <CloseIcon />
      </IconButton>
      <DialogContent>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Box
            component="img"
            src={innovation.image}
            alt={innovation.title}
            sx={{
              display: "block",
              maxWidth: 400,
              width: "100%",
              borderRadius: 2,
              mx: "auto",
              mb: 2,
              transition: "transform 0.5s ease-in-out, box-shadow 0.5s ease-in-out",
              boxShadow: "0px 8px 24px rgba(0, 0, 0, 0.15)",
              "&:hover": { transform: "scale(1.02)", boxShadow: "0px 12px 30px rgba(0, 0, 0, 0.3)" },
            }}
            loading="lazy"
          />
          <Typography variant="h4" sx={{ mt: 2, fontWeight: 700, textAlign: "center" }}>
            {innovation.title}
          </Typography>
          <Typography
            variant="subtitle1"
            sx={{ mt: 1, color: "text.secondary", textAlign: "center" }}
          >
            {innovation.description}
          </Typography>
          <Typography variant="body1" sx={{ mt: 3, lineHeight: 1.6 }}>
            {innovation.detail}
            <br />
            <br />
            Bu teknoloji, endüstriyel süreçlerin dijitalleşmesinde devrim yaratıyor.
            Gelişmiş sensörler, yapay zeka destekli analizler ve dijital ikiz teknolojisi sayesinde,
            üretim hatlarında meydana gelebilecek sorunları önceden belirleyip müdahale imkanı sunarken,
            sürdürülebilir verimlilik ve maliyet avantajı sağlıyor.
            Kullanıcı dostu arayüzü ve yüksek güvenlik standartları ile bu yenilik, modern endüstrinin vazgeçilmez
            bir parçası haline geliyor.
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
            <Button
              variant="contained"
              color="primary"
              startIcon={<ShareIcon />}
              onClick={handleShare}
              sx={{ borderRadius: "50px", textTransform: "none" }}
            >
              Paylaş
            </Button>
          </Box>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
};

export default InnovationDetail;
