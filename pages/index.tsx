import React, { useState, useCallback } from "react";
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  Link,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { motion } from "framer-motion";
import { images } from "../images";
import Image from 'next/image';

import ChatPortal from "../components/ChatPortal";
import EnhancedCapabilities from "../components/EnhancedCapabilities";
import InnovationsSection from "../components/Innovations";
import ClientTestimonials from "./ClientTestimonials";
import FloatingContactButtons from '../components/FloatingContactButtons';

const fadeInUp = {
  hidden: { opacity: 0, y: 100 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
};

const Home: React.FC = () => {
  const [chatOpen, setChatOpen] = useState(false);

  // Move handleExploreMore inside the component
  const handleExploreMore = useCallback(() => {
    const target = document.getElementById("innovations");
    if (target) {
      const startPosition = window.pageYOffset;
      const targetPosition =
        target.getBoundingClientRect().top + startPosition - 80;
      const distance = targetPosition - startPosition;
      const duration = 50;
      let startTime: number | null = null;

      const easeInOutQuad = (t: number, b: number, c: number, d: number) => {
        t /= d / 2;
        if (t < 1) return (c / 2) * t * t + b;
        t--;
        return (-c / 2) * (t * (t - 2) - 1) + b;
      };

      const animateScroll = (currentTime: number) => {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const nextScrollPosition = easeInOutQuad(
          timeElapsed,
          startPosition,
          distance,
          duration
        );
        window.scrollTo(0, nextScrollPosition);
        if (timeElapsed < duration) {
          requestAnimationFrame(animateScroll);
        }
      };

      requestAnimationFrame(animateScroll);
    }
  }, []);

  return (
    <>
      {/* HERO SECTION */}
      <Box sx={{ position: "relative", height: "100vh", overflow: "hidden" }}>
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        >
          <source src={images.heroVideo} type="video/mp4" />
          Tarayıcınız video etiketini desteklemiyor.
        </video>
        <Box
          sx={{
            position: "relative",
            zIndex: 1,
            height: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            px: 2,
            backgroundColor: "rgba(0, 0, 0, 0.3)",
          }}
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2 }}
          >
            <Typography
              variant="h3"
              gutterBottom
              sx={{
                color: "common.white",
                textShadow: "2px 2px 4px rgba(0,0,0,0.8)",
              }}
            >
              Dijital Dönüşüm Çözümleri
            </Typography>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2, delay: 0.5 }}
          >
            <Typography
              variant="h5"
              gutterBottom
              sx={{
                color: "common.white",
                textShadow: "1px 1px 3px rgba(0,0,0,0.8)",
              }}
            >
              Gelecek İçin Modern, Dinamik ve Yenilikçi Çözümler
            </Typography>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 1 }}
          >
            <Link href="/products-services">
              <Button
                variant="contained"
                size="large"
                sx={{
                  mt: 3,
                  background: "linear-gradient(45deg, #2196F3, #21CBF3)",
                  color: "#fff",
                  borderRadius: 3,
                  px: 4,
                  py: 1.5,
                  boxShadow: "0px 4px 12px rgba(33,203,243,0.4)",
                  "&:hover": { opacity: 0.9 },
                  textDecoration: "none"
                }}
              >
                Çözümlerimiz
              </Button>
            </Link>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.5 }}
          >
            <Button
              variant="text"
              size="large"
              startIcon={<KeyboardArrowDownIcon />}
              sx={{
                mt: 2,
                color: "common.white",
                textShadow: "1px 1px 3px rgba(0,0,0,0.8)",
              }}
              onClick={handleExploreMore}
            >
              Daha Fazla Keşfet
            </Button>
          </motion.div>
        </Box>
      </Box>

      {/* ABOUT SECTION */}
      <Container id="about" sx={{ py: 6, position: "relative" }}>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          <Typography
            variant="h3"
            align="center"
            gutterBottom
            sx={{ color: "text.primary" }}
          >
            Ne Yapıyoruz
          </Typography>
          <Typography
            variant="body1"
            align="center"
            paragraph
            sx={{
              maxWidth: "800px",
              mx: "auto",
              color: "text.secondary",
            }}
          >
            Amacımız, müşterilerimizin iş süreçlerini dijital dönüşüm yolculuğunda
            en son teknolojilerle güçlendirerek verimlilik ve rekabet avantajı
            sağlamaktır. Modern tasarım anlayışımızı, özelleştirilmiş çözümler ve
            entegre sistem mimarileriyle birleştirerek; esnek, ölçeklenebilir ve
            sürdürülebilir teknolojik altyapılar sunuyoruz.
          </Typography>
        </motion.div>

        {/* MISSION & VISION SECTION */}
        <Container id="mission-vision" sx={{ py: 2 }}>
          <Grid container spacing={4}>
            {/* Mission Card */}
            <Grid item xs={12} md={6}>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
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
                  }}
                >
                  <CardContent>
                    <Box
                      sx={{
                        mb: 2,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Image
                        src={images.missionIcon}
                        alt="Misyon"
                        width={80}
                        height={80}
                        priority
                      />
                    </Box>
                    <Typography
                      variant="h4"
                      gutterBottom
                      sx={{ color: "text.primary" }}
                    >
                      Misyon
                    </Typography>
                    <Typography variant="body1" sx={{ color: "text.secondary" }}>
                      Her iş ortağının benzersiz ihtiyaçlarını analiz ederek, uçtan uca
                      özelleştirilmiş iş çözümleri sunarız. Böylece, standart hizmet
                      anlayışını aşan stratejik bir deneyim sağlarız.
                    </Typography>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
            {/* Vision Card */}
            <Grid item xs={12} md={6}>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
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
                  }}
                >
                  <CardContent>
                    <Box
                      sx={{
                        mb: 2,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Image
                        src={images.visionIcon}
                        alt="Vizyon"
                        width={80}
                        height={80}
                        priority
                      />
                    </Box>
                    <Typography
                      variant="h4"
                      gutterBottom
                      sx={{ color: "text.primary" }}
                    >
                      Vizyon
                    </Typography>
                    <Typography variant="body1" sx={{ color: "text.secondary" }}>
                      Kurumsal vizyonumuz, entegre ve ölçeklenebilir dijital çözümlerle
                      marka kimliğini güçlendirmek ve rekabet avantajı yaratmaktır.
                    </Typography>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          </Grid>
        </Container>
      </Container>

      {/* CORE CAPABILITIES SECTION */}
      <EnhancedCapabilities />

      {/* INNOVATIONS SECTION */}
      <InnovationsSection />

      {/* TESTIMONIALS SECTION */}
      <ClientTestimonials />

      {/* CONTACT SECTION */}
      <Container
        sx={{
          py: 6,
          position: "relative",
          background: `url(${images.mediaGif1}) no-repeat center center`,
          backgroundSize: "cover",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 1,
          }}
        />
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          style={{ position: "relative", zIndex: 2 }}
        >
          <Typography
            variant="h3"
            align="center"
            gutterBottom
            sx={{ color: "common.white" }}
          >
            İletişime Geçin
          </Typography>
          <Typography
            variant="body1"
            align="center"
            paragraph
            sx={{ color: "common.white" }}
          >
            Bize ulaşın:{" "}
            <Link
              href="mailto:contact@tiamat.tech"
              underline="hover"
              color="secondary"
            >
              info@tiamatech.com
            </Link>
          </Typography>
          <Box sx={{ textAlign: "center", mt: 4 }}>
            <Button
              variant="contained"
              size="large"
              sx={{
                background: "linear-gradient(45deg, #2196F3, #21CBF3)",
                color: "#fff",
                borderRadius: 3,
                px: 4,
                py: 1.5,
                boxShadow: "0px 4px 12px rgba(33,203,243,0.4)",
                "&:hover": { opacity: 0.9 },
              }}
              href="contact"
            >
              Bize Ulaşın
            </Button>
          </Box>
        </motion.div>
      </Container>

      {/* Floating Chat & WhatsApp Buttons */}
      <FloatingContactButtons onOpenChat={() => setChatOpen(true)} />
      <ChatPortal open={chatOpen} onClose={() => setChatOpen(false)} />
    </>
  );
};

export default Home;
