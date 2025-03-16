import React from 'react';
import { Container, Typography, Grid, Card, CardContent, Button } from '@mui/material';
import { industrialAnimations } from '../styles/animations';

const jobPositions = [
  {
    id: 1,
    title: "Yazılım Mühendisi",
    location: "Teknoloji Vadisi, TV",
    description:
      "Endüstriyel IoT çözümlerinde deneyimli, yetenekli bir yazılım mühendisi arıyoruz.",
  },
  {
    id: 2,
    title: "Veri Analisti",
    location: "Teknoloji Vadisi, TV",
    description:
      "Endüstriyel verileri analiz edip yapay zeka içgörüleri üretecek ekibimize katılın.",
  },
];

const Careers: React.FC = () => {
  return (
    <Container
      sx={{ py: 8 }}
      className="fade-in"
      style={{ animation: `${industrialAnimations.slideIn} 1s` }}
    >
      <Typography variant="h2" align="center" gutterBottom>
        Kariyer
      </Typography>
      <Typography variant="body1" align="center" sx={{ mb: 4 }}>
        Ekibimize katılın ve endüstriyel dijital dönüşümün geleceğini şekillendirmemize yardımcı olun.
      </Typography>
      <Grid container spacing={4}>
        {jobPositions.map((job) => (
          <Grid item key={job.id} xs={12} md={6}>
            <Card
              sx={{
                p: 3,
                borderRadius: 2,
                boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
              }}
            >
              <CardContent>
                <Typography variant="h3" gutterBottom>
                  {job.title}
                </Typography>
                <Typography variant="subtitle1" color="text.secondary">
                  {job.location}
                </Typography>
                <Typography variant="body1" sx={{ mt: 2 }}>
                  {job.description}
                </Typography>
              </CardContent>
              <Button
                variant="contained"
                color="primary"
                sx={{ m: 2 }}
              >
                Şimdi Başvur
              </Button>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Careers;
