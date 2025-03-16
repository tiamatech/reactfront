import React, { useState, useMemo, useRef, KeyboardEvent } from "react";
import {
  Container,
  Typography,
  Tabs,
  Tab,
  Box,
  Grid,
  TextField,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import {
  RocketLaunch,
  Cloud,
  SettingsInputAntenna,
  Security,
  Search as SearchIcon,
  KeyboardArrowRight,
} from "@mui/icons-material";
import DevicesIcon from "@mui/icons-material/Devices";
import ClearIcon from "@mui/icons-material/Clear";
import { keyframes, alpha } from "@mui/system";
import { Products } from "../components/Products"; // Ürün listesiniz
import ProductCard from "../components/ProductCard";
import ProductDetailModal from "../components/ProductDetailModal";
import ChatPortal from "../components/ChatPortal";
import FloatingContactButtons from '../components/FloatingContactButtons';

// Başlık metni için shimmer animasyonu
const shimmer = keyframes`
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
`;

// Başlık için fade-in animasyonu
const fadeInHeader = keyframes`
  from { opacity: 0; transform: translateY(-20px); }
  to { opacity: 1; transform: translateY(0); }
`;

// Kategori sekmeleri tanımları
const categories = [
  { key: "all", label: "Tümü", icon: <RocketLaunch /> },
  { key: "digital-solutions", label: "Dijital", icon: <Cloud /> },
  { key: "automation-analytics", label: "Otomasyon", icon: <SettingsInputAntenna /> },
  { key: "iot-integration", label: "IoT", icon: <DevicesIcon /> },
  { key: "cyber-security", label: "Güvenlik", icon: <Security /> },
];

// Kategori filtreleme eşleştirmesi
const categoryMapping: { [key: string]: string } = {
  "digital-solutions": "cognitive-digital",
  "automation-analytics": "autonomous-ops",
  "iot-integration": "industrial-neural",
  "cyber-security": "quantum-cyber",
};

const Services: React.FC = () => {
  const theme = useTheme();
  const productGridRef = useRef<HTMLDivElement>(null);
  const [selectedTab, setSelectedTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProduct, setSelectedProduct] = useState<typeof Products[0] | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);

  // Arama filtresi için eşleşme puanı hesaplama fonksiyonu
  const computeMatchScore = (product: typeof Products[0], query: string): number => {
    const name = product.name.toLowerCase();
    const desc = product.description.toLowerCase();
    let score = 0;
    const nameIndex = name.indexOf(query);
    const descIndex = desc.indexOf(query);
    if (nameIndex !== -1) score += (100 - nameIndex);
    if (descIndex !== -1) score += (50 - descIndex);
    return score;
  };

  // Kategori ve arama sorgusuna göre ürünleri filtreleme
  const filteredProducts = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    let results = Products.filter((product) => {
      if (selectedTab !== "all" && product.category !== categoryMapping[selectedTab]) {
        return false;
      }
      if (query === "") return true;
      const name = product.name.toLowerCase();
      const desc = product.description.toLowerCase();
      return name.includes(query) || desc.includes(query);
    });
    if (query !== "") {
      results = results
        .map((product) => ({
          product,
          score: computeMatchScore(product, query),
        }))
        .filter((item) => item.score > 0)
        .sort((a, b) => b.score - a.score)
        .map((item) => item.product);
    }
    return results;
  }, [selectedTab, searchQuery]);

  // Arama girişinde "Enter" tuşuna basınca ürün ızgarasına kaydırma
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && productGridRef.current) {
      productGridRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // Ürün detay modalını açma
  const handleProductClick = (product: typeof Products[0]) => {
    setSelectedProduct(product);
    setModalOpen(true);
  };

  return (
    <Container
      maxWidth="xl"
      sx={{
        py: { xs: 4, md: 8 },
        backgroundColor: theme.palette.background.default,
      }}
    >
      {/* Başlık */}
      <Box sx={{ textAlign: "center", mb: 6, animation: `${fadeInHeader} 0.8s ease both` }}>
        <Typography
          variant="h2"
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
         Endüstri 4.0 Çözümleri
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          Gelecek için tasarlanmış yenilikçi ürünlerimizi keşfedin.
        </Typography>
      </Box>

      {/* Kategori Sekmeleri */}
      <Box
        sx={{
          position: "sticky",
          top: 0,
          zIndex: 100,
          backgroundColor: theme.palette.background.default,
          py: 2,
          mb: 4,
          borderBottom: `1px solid ${alpha(theme.palette.text.primary, 0.12)}`,
        }}
      >
        <Tabs
          centered
          value={selectedTab}
          onChange={(_, newValue) => setSelectedTab(newValue)}
          variant="standard"
          textColor="primary"
          indicatorColor="primary"
        >
          {categories.map((cat) => (
            <Tab
              key={cat.key}
              value={cat.key}
              label={cat.label}
              icon={cat.icon}
              iconPosition="start"
              sx={{ textTransform: "none", minWidth: 100 }}
            />
          ))}
        </Tabs>
      </Box>

      {/* Arama Çubuğu */}
      <Box sx={{ mb: 6, display: "flex", justifyContent: "center" }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Ürünleri ara..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon color="action" />
              </InputAdornment>
            ),
            endAdornment: searchQuery && (
              <InputAdornment position="end">
                <IconButton onClick={() => setSearchQuery("")}>
                  <ClearIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
          sx={{
            maxWidth: 600,
            borderRadius: 2,
            "& .MuiOutlinedInput-root": {
              borderRadius: 2,
              backgroundColor:
                theme.palette.mode === "dark"
                  ? alpha(theme.palette.background.paper, 0.2)
                  : theme.palette.background.paper,
              transition: "box-shadow 0.3s ease",
              "&:hover": {
                boxShadow:
                  theme.palette.mode === "dark"
                    ? "0 4px 12px rgba(255,255,255,0.2)"
                    : "0 4px 12px rgba(0,0,0,0.1)",
              },
            },
          }}
        />
      </Box>

      {/* Ürün Izgarası */}
      <Box ref={productGridRef}>
        <Grid container spacing={3} sx={{pl:'50px',pr:'50px'}} >
          {filteredProducts.map((product, index) => (
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              lg={3}
              key={product.id}
              sx={{ display: "flex" }}
            >
              <ProductCard
                product={product}
                animationDelay={`${index * 0.1}s`}
                onClick={() => handleProductClick(product)}
              />
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Boş Durum */}
      {filteredProducts.length === 0 && (
        <Box sx={{ textAlign: "center", py: 8 }}>
          <Typography variant="h5" color="text.secondary" sx={{ mb: 2 }}>
            Ürün bulunamadı.
          </Typography>
          <IconButton onClick={() => setSelectedTab("all")}>
            <KeyboardArrowRight fontSize="large" color="primary" />
          </IconButton>
        </Box>
      )}

      {/* Ürün Detay Modalı */}
      <ProductDetailModal
        open={modalOpen}
        product={selectedProduct}
        onClose={() => {
          setModalOpen(false);
          setSelectedProduct(null);
        }}
      />

      <FloatingContactButtons onOpenChat={() => setChatOpen(true)} />
      <ChatPortal open={chatOpen} onClose={() => setChatOpen(false)} />
    </Container>
  );
};

export default Services;
