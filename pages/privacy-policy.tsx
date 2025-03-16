import React from 'react';
import { Container, Typography, Box } from '@mui/material';
import { industrialAnimations } from '../styles/animations';

const PrivacyPolicy: React.FC = () => {
  return (
    <Container sx={{ py: 8 }} className="fade-in" style={{ animation: `${industrialAnimations.slideIn} 1s` }}>
      <Typography variant="h4" align="center" gutterBottom>
        Tiamat Tech Web Sitesi Gizlilik Politikası
      </Typography>
      <Typography variant="subtitle1" align="center" gutterBottom>
        Güncellendi: 8 Şubat 2025
      </Typography>
      <Box sx={{ mt: 4 }}>
        <Typography variant="body1" paragraph>
          Bu, Tiamat Tech’in Web Sitesi Gizlilik Politikası (“Gizlilik Politikası”)dır. Tiamat Tech olarak (biz, bize veya bizim) gizliliğiniz son derece önemlidir. Bu politika, web sitemizi ziyaret ettiğinizde kişisel bilgilerinizin nasıl toplandığını, kullanıldığını, ifşa edildiğini ve korunduğunu açıklar.
        </Typography>
        <Typography variant="body1" paragraph>
          <strong>Topladığımız Bilgiler:</strong> Adınız, e-posta adresiniz, demografik bilgileriniz gibi sağladığınız verilerin yanı sıra, IP adresiniz, tarayıcı türünüz ve ziyaret ettiğiniz sayfalar gibi otomatik olarak toplanan bilgileri de içerebiliriz.
        </Typography>
        <Typography variant="body1" paragraph>
          <strong>Üçüncü Taraf Teknolojiler:</strong> Google Analytics, Facebook Pixel, LinkedIn Insights gibi araçları, deneyiminizi geliştirmek ve reklamları özelleştirmek amacıyla kullanıyoruz.
        </Typography>
        <Typography variant="body1" paragraph>
          <strong>Tercihleriniz:</strong> Üçüncü taraf reklam verenlerden kişiselleştirilmiş reklam almayı reddedebilirsiniz. Ayrıntılar için lütfen hello@tiamatech.com adresinden bizimle iletişime geçin.
        </Typography>
        <Typography variant="body1" paragraph>
          <strong>Güvenlik:</strong> Bilgilerinizi korumak için makul önlemler uyguluyoruz; ancak hiçbir sistem tamamen güvenli değildir.
        </Typography>
        <Typography variant="body1" paragraph>
          <strong>Güncellemeler:</strong> Bu Gizlilik Politikasını herhangi bir zamanda güncelleme hakkımızı saklı tutarız. Sitemizi kullanmaya devam etmeniz, yapılan değişiklikleri kabul ettiğiniz anlamına gelir.
        </Typography>
        <Typography variant="body1" paragraph>
          <strong>Sorular:</strong> Herhangi bir sorunuz varsa lütfen hello@tiamatech.com adresinden bizimle iletişime geçin.
        </Typography>
      </Box>
    </Container>
  );
};

export default PrivacyPolicy;
