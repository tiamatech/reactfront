import React from "react";
import { Container, Typography, Grid,  Avatar, Paper } from "@mui/material";
import { motion } from "framer-motion";
import { images } from "../images";

const fadeInUp = {
  hidden: { opacity: 0, y: 100 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
};

const testimonials = [
  {
    name: "John Doe",
    position: "CEO, ABC Industries",
    testimonial: "Dijital çözümleri, üretim verimliliğimizi devrim niteliğinde artırdı!",
    avatar: images.avatar1,
  },
  {
    name: "Jane Smith",
    position: "CTO, XYZ Corp",
    testimonial: "Endüstriyel dönüşümde geleceğe yönelik bir yaklaşım. Gerçekten yenilikçi.",
    avatar: images.avatar2,
  },
];

const ClientTestimonials: React.FC = () => {
  return (
    <Container sx={{ py: 6, backgroundColor: "background.paper", borderRadius:'10px' }}>
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
          <Typography variant="h3" align="center" gutterBottom sx={{ color: "text.primary" }}>
            Müşterilerimiz Ne Diyor
          </Typography>
        </motion.div>
        <Grid container spacing={4} justifyContent="center">
          {testimonials.map((item, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                <Paper sx={{ p: 3, textAlign: "center", boxShadow: 3 }}>
                  <Avatar src={item.avatar} alt={item.name} sx={{ width: 80, height: 80, margin: "0 auto", mb: 2 }} />
                  <Typography variant="h6" sx={{ color: "text.primary" }}>
                    {item.name}
                  </Typography>
                  <Typography variant="subtitle2" sx={{ color: "text.secondary" }}>
                    {item.position}
                  </Typography>
                  <Typography variant="body2" sx={{ mt: 2, color: "text.secondary" }}>
                    {item.testimonial}
                  </Typography>
                </Paper>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Container>
  );
};

export default ClientTestimonials;
