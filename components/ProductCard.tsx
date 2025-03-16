import React from "react";
import { Box, Typography, IconButton } from "@mui/material";
import { KeyboardArrowRight } from "@mui/icons-material";
import { styled, keyframes} from "@mui/system";
import { Product } from "./Products";

// İlk kart görünümü için fade-in animasyonu
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

// Gelişmiş hover efekti ile stilize edilmiş kart konteyneri
const StyledCard = styled(Box)(({ theme }) => ({
  position: "relative",
  display: "flex",
  flexDirection: "column",
  backgroundColor: theme.palette.background.paper,
  borderRadius: "20px",
  boxShadow:
    theme.palette.mode === "dark"
      ? "0 8px 24px rgba(255, 255, 255, 0.1)"
      : "0 8px 24px rgba(0, 0, 0, 0.1)",
  overflow: "hidden",
  cursor: "pointer",
  minHeight: 500,
  transition: "transform 0.3s ease, box-shadow 0.3s ease",
  "&:hover": {
    transform: "scale(1.05)",
    boxShadow:
      theme.palette.mode === "dark"
        ? "0 12px 30px rgba(255, 255, 255, 0.2)"
        : "0 12px 30px rgba(0, 0, 0, 0.2)",
  },
}));

// Ürün resmini barındıran sabit yükseklikli konteyner
const ImageContainer = styled(Box)(() => ({
  position: "relative",
  height: 280,
  overflow: "hidden",
}));

// Konteyneri eşit şekilde dolduracak şekilde ayarlanmış stilize edilmiş resim; hover'da hafif zoom
const StyledImage = styled("img")(() => ({
  width: "100%",
  height: "100%",
  objectFit: "cover",
  transition: "transform 0.5s ease",
  "&:hover": {
    transform: "scale(1.05)",
  },
}));

// Ürün metni için artan iç boşluklu konteyner
const TextContainer = styled(Box)(({ theme }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  color: theme.palette.text.primary,
}));

interface ProductCardProps {
  product: Product;
  animationDelay?: string;
  onClick?: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, animationDelay = "0s", onClick }) => {
  return (
    <StyledCard onClick={onClick} sx={{ animation: `${fadeIn} 0.6s ease ${animationDelay} both` }}>
      <ImageContainer>
        <StyledImage src={product.image} alt={product.name} />
        
      </ImageContainer>
      <TextContainer>
        <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
          {product.name}
        </Typography>
        <Typography
          variant="body2"
          sx={{
            mb: 2,
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {product.description}
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
          Fiyat için iletişime geçin
          </Typography>
          <IconButton sx={(theme)=>({ color: theme.palette.mode==='dark'? 'white':theme.palette.primary.main })}>
            <KeyboardArrowRight fontSize="large" />
          </IconButton>
        </Box>
      </TextContainer>
    </StyledCard>
  );
};

export default React.memo(ProductCard);
