import { Container, Grid, Card, CardContent, Typography, Box } from "@mui/material";
import { motion } from "framer-motion";
import { images } from '../images';
import Image from 'next/image';

const products = [
  {
    title: "Akıllı Depo Çözümleri",
    description:
      "Depolama alanlarınızı dijitalleştirerek, otomatik envanter yönetimi ve verimli stok kontrolü sağlayan sistemler sunuyoruz.",
    icon: (
      <Box display="flex" justifyContent="center" alignItems="center">
        <Image
          src={images.smartWarehouseIcon}
          alt="Akıllı Depo Çözümleri"
          width={80}
          height={80}
          style={{ objectFit: 'contain' }}
          priority
        />
      </Box>
    ),
  },
  {
    title: "Barkod Okuyucu Sistemleri",
    description:
      "Yüksek hassasiyetli okuma teknolojileriyle, ürün takibi ve lojistik süreçlerinizi hızlandırıyoruz.",
    icon: (
      <Box display="flex" justifyContent="center" alignItems="center">
        <Image
          src={images.barcodeReaderIcon}
          alt="Barkod Okuyucu Sistemleri"
          width={80}
          height={80}
          style={{ objectFit: 'contain' }}
          priority
        />
      </Box>
    ),
  },
  {
    title: "Görüntü İşleme Sistemleri",
    description:
      "İleri algoritmalar kullanarak, kalite kontrol ve üretim süreçlerinde gerçek zamanlı görsel analiz imkânı sunuyoruz.",
    icon: (
      <Box display="flex" justifyContent="center" alignItems="center">
        <Image
          src={images.imageProcessingIcon}
          alt="Görüntü İşleme Sistemleri"
          width={80}
          height={80}
          style={{ objectFit: 'contain' }}
          priority
        />
      </Box>
    ),
  },
  {
    title: "Web & Mobil Uygulama Çözümleri",
    description:
      "Full-stack destekli, kullanıcı odaklı dijital platformlar geliştirerek, dijital dönüşümünüzü baştan sona destekliyoruz.",
    icon: (
      <Box display="flex" justifyContent="center" alignItems="center">
        <Image
          src={images.fullstackIcon}
          alt="Web & Mobil Uygulama Çözümleri"
          width={80}
          height={80}
          style={{ objectFit: 'contain' }}
          priority
        />
      </Box>
    ),
  },
  {
    title: "Veri Analizi ve Güvenliği",
    description:
      "Üretim ve tesisler arası kesintisiz iletişimle, operasyonel koordinasyonu güçlendiriyoruz.",
    icon: (
      <Box display="flex" justifyContent="center" alignItems="center">
        <Image
          src={images.dataAnalysisIcon}
          alt="Veri Analizi ve Güvenliği"
          width={80}
          height={80}
          style={{ objectFit: 'contain' }}
          priority
        />
      </Box>
    ),
  },
  {
    title: "Yapay Zeka Uygulamaları",
    description:
      "Makine öğrenimi ve derin öğrenme temelli sistemlerle veri analitiği ve süreç otomasyonunda çığır açıyoruz.",
    icon: (
      <Box display="flex" justifyContent="center" alignItems="center">
        <Image
          src={images.aiIcon}
          alt="Yapay Zeka Uygulamaları"
          width={80}
          height={80}
          style={{ objectFit: 'contain' }}
          priority
        />
      </Box>
    ),
  },
  {
    title: "Endüstriyel Haberleşme Sistemleri",
    description:
      "Üretim ve tesisler arası kesintisiz iletişimle, operasyonel koordinasyonu güçlendiriyoruz.",
    icon: (
      <Box display="flex" justifyContent="center" alignItems="center">
        <Image
          src={images.industrialIcon}
          alt="Endüstriyel Haberleşme Sistemleri"
          width={80}
          height={80}
          style={{ objectFit: 'contain' }}
          priority
        />
      </Box>
    ),
  },
  {
    title: "Hat Sonu İzleme Sistemleri",
    description:
      "Üretim hattındaki süreçlerin son aşamalarını izleyerek, hata tespiti ve verimlilik artışı sağlıyoruz.",
    icon: (
      <Box display="flex" justifyContent="center" alignItems="center">
        <Image
          src={images.endOfLineIcon}
          alt="Hat Sonu İzleme Sistemleri"
          width={80}
          height={80}
          style={{ objectFit: 'contain' }}
          priority
        />
      </Box>
    ),
  },
  {
    title: "Üretim & Envanter Takip Sistemleri",
    description:
      "Gerçek zamanlı entegre çözümlerimiz, üretim süreçleri ve stok yönetiminizi optimize eder.",
    icon: (
      <Box display="flex" justifyContent="center" alignItems="center">
        <Image
          src={images.inventoryIcon}
          alt="Üretim & Envanter Takip Sistemleri"
          width={80}
          height={80}
          style={{ objectFit: 'contain' }}
          priority
        />
      </Box>
    ),
  },
];

const Products = () => {
  return (
    <Container id="urunlerimiz" sx={{ py: 8, position: "relative" }}>
      {/* Header with Video Background – hidden below 768px */}
      <Box sx={{ position: "relative", mb: 4, "@media (max-width:768px)": { display: "none" } }}>
        {/* Video Background */}
        <Box
          sx={{
            position: "absolute",
            left: 0,
            top: "50%",
            transform: "translateY(-50%)",
            width: "100%",
            height: "120%",
            overflow: "hidden",
            borderRadius: "8px",
            zIndex: -1,
          }}
        >
          <video
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          >
            <source src={images.techAnimation} type="video/mp4" />
            Tarayıcınız video etiketini desteklemiyor.
          </video>
        </Box>
        {/* Header Text */}
        <Box sx={{ textAlign: "center", position: "relative", zIndex: 1 }}>
          <Typography
            variant="h3"
            sx={{
              fontFamily: "Helvetica, Arial, sans-serif",
              fontWeight: 200,
              mb: 2,
              color: "#fff",
              p: 6,
            }}
          >
            Yetkinliklerimiz
          </Typography>
        </Box>
      </Box>
      {/* Products Grid */}
      <Grid container spacing={4}>
        {products.map((product, index) => (
          <Grid item xs={12} sm={6} md={4} key={index} sx={{ display: "flex" }}>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              style={{ width: "100%" }}
            >
              <Card
                sx={{
                  p: 3,
                  textAlign: "center",
                  borderRadius: 3,
                  boxShadow: 3,
                  transition: "transform 0.3s, box-shadow 0.3s",
                  "&:hover": { transform: "scale(1.05)", boxShadow: 6 },
                  backgroundColor: "background.paper",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <CardContent>
                  <Box mb={2} display="flex" justifyContent="center" alignItems="center">
                    {product.icon}
                  </Box>
                  <Typography
                    variant="h5"
                    sx={{
                      fontFamily: "Helvetica, Arial, sans-serif",
                      fontWeight: 600,
                      mb: 1,
                    }}
                  >
                    {product.title}
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      fontFamily: "Helvetica, Arial, sans-serif",
                      color: "text.secondary",
                    }}
                  >
                    {product.description}
                  </Typography>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Products;
