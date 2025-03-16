import React from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Typography,
  IconButton,
  Box,
  Slide,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Product } from "./Products";
import { useRouter } from "next/router";
import { useTheme } from "@mui/material/styles";
import { keyframes } from "@mui/system";

const shimmer = keyframes`
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
`;

interface TransitionProps {
  children: React.ReactElement;
  style?: React.CSSProperties;
}

const Transition = React.forwardRef(function Transition(
  props: TransitionProps,
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface ProductDetailModalProps {
  open: boolean;
  onClose: () => void;
  product: Product | null;
}

const ProductDetailModal: React.FC<ProductDetailModalProps> = ({ open, onClose, product }) => {
  const router = useRouter();
  const theme = useTheme();
  if (!product) return null;
  return (
    <Dialog
      open={open}
      onClose={onClose}
      TransitionComponent={Transition}
      PaperProps={{
        sx: {
          borderRadius: 3,
          p: 2,
          background: theme.palette.mode === "dark" ? "#333" : theme.palette.background.paper,
        },
      }}
    >
      <DialogTitle sx={{ m: 0, p: 2, position: "relative", color: theme.palette.text.primary }}>
        <Typography variant="h5" component="div">
          {product.name}
        </Typography>
        <IconButton
          aria-label="Kapat"
          onClick={onClose}
          sx={{ position: "absolute", right: 8, top: 8, color: theme.palette.grey[500] }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers>
        <Box sx={{ display: "column"}}>
          <Box
            component="img"
            src={product.image}
            alt={product.name}
            sx={{ width: '100%', borderRadius: 2 }}
          />
          <Box sx={{ flex: 1, color: theme.palette.text.primary }}>
            <Typography variant="body1" gutterBottom>
              {product.description}
            </Typography>
            <Typography variant="subtitle1" sx={{ mt: 2, fontWeight: "bold" }}>
              Özellikler:
            </Typography>
            <ul>
              {product.features.map((feature, index) => (
                <li key={index}>
                  <Typography variant="body2">{feature}</Typography>
                </li>
              ))}
            </ul>
            {product.highlights && (
              <>
                <Typography variant="subtitle1" sx={{ mt: 2, fontWeight: "bold" }}>
                  Öne Çıkanlar:
                </Typography>
                <ul>
                  {product.highlights.map((hl, index) => (
                    <li key={index}>
                      <Typography variant="body2">{hl}</Typography>
                    </li>
                  ))}
                </ul>
              </>
            )}
            <Typography variant="subtitle1" sx={{ mt: 2, fontWeight: "bold" }}>
              Fiyat:
            </Typography>
            <Typography variant="body1">Fiyat için iletişime geçin</Typography>
            
            {product.version && (
              <>
                <Typography variant="subtitle1" sx={{ mt: 2, fontWeight: "bold" }}>
                  Sürüm:
                </Typography>
                <Typography variant="body1">{product.version}</Typography>
              </>
            )}
            {/* "İletişime Geçin" CTA */}
            <Box sx={{ mt: 4, display: "flex", justifyContent: "center" }}>
              <Box
                onClick={() => {
                  onClose();
                  router.push("/contact");
                }}
                sx={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: theme.spacing(1),
                  cursor: "pointer",
                  color: theme.palette.info.main,
                  transition: "transform 0.3s ease",
                  "&:hover": { transform: "scale(1.05)" },
                }}
              >
                <Typography
                  variant="h4"
                  sx={{
                    fontWeight: 500,
                    mb: 2,
                    background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main}, ${theme.palette.primary.main})`,
                    backgroundSize: "200% auto",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    animation: `${shimmer} 3s linear infinite`,
                  }}
                >
                  İletişime Geçin
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default ProductDetailModal;
