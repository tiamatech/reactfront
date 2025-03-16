import React from 'react';
import { Container, Typography, Box } from '@mui/material';
import { industrialAnimations } from '../styles/animations';

const TermsOfService: React.FC = () => {
  return (
    <Container sx={{ py: 8 }} className="fade-in" style={{ animation: `${industrialAnimations.slideIn} 1s` }}>
      <Typography variant="h4" align="center" gutterBottom>
        Tiamat Tech Web Sitesi Kullanım Şartları
      </Typography>
      <Typography variant="subtitle1" align="center" gutterBottom>
        Güncelleme: 8 Şubat 2025
      </Typography>
      <Box sx={{ mt: 4 }}>
        <Typography variant="body1" paragraph>
          Aşağıdaki şartlar (bundan böyle “Kullanım Şartları” olarak anılacaktır) www.tiamattech.com adresindeki web sitemize (bundan böyle “Web Sitesi” olarak anılacaktır) erişiminizi ve kullanımınızı düzenlemektedir. Web Sitemiz üzerinden sunulan tüm içerik ve işlevler bu şartlara tabidir.
        </Typography>
        <Typography variant="body1" paragraph>
          Lütfen Web Sitemizi kullanmadan önce bu Kullanım Şartlarını dikkatle okuyunuz. Web Sitemizi kullanarak, bu Kullanım Şartlarına ve https://tiamatech.com/privacy adresinde bulunan Gizlilik Politikamıza (burada referans olarak dahil edilmiştir) bağlı kalmayı kabul etmiş olursunuz. Eğer bu şartları veya Gizlilik Politikamızı kabul etmiyorsanız, lütfen Web Sitemize erişmeyiniz.
        </Typography>
        <Typography variant="body1" paragraph>
          Kullanım Şartlarımızı zaman zaman, tamamen kendi takdirimize bağlı olarak gözden geçirip güncelleyebiliriz. Yapılan tüm değişiklikler yayınlandıkları anda yürürlüğe girer; Web Sitemizi kullanmaya devam etmeniz, bu değişiklikleri kabul ettiğiniz anlamına gelir.
        </Typography>
        <Typography variant="body1" paragraph>
          <strong>Fikri Mülkiyet Hakları:</strong> Web Sitemiz ve tüm içeriği, özellikleri ile işlevselliği Tiamat Tech, lisans verenleri veya bu materyali sağlayan diğer kuruluşlara aittir ve ABD ile uluslararası fikri mülkiyet yasaları kapsamında korunmaktadır.
        </Typography>
        <Typography variant="body1" paragraph>
          <strong>İzin Verilen Kullanım:</strong> Web Sitemizi yalnızca kişisel, ticari olmayan kullanımınız için kullanabilirsiniz. İzin verilmediği sürece, Web Sitemizde yer alan hiçbir materyali çoğaltamaz, dağıtamaz, değiştiremez veya farklı şekillerde kullanamazsınız.
        </Typography>
        <Typography variant="body1" paragraph>
          <strong>Ticari Markalar:</strong> Tiamat Tech’in ticari markalarını, logolarını veya marka unsurlarını, önceden yazılı izin almadan kullanmanız yasaktır.
        </Typography>
        <Typography variant="body1" paragraph>
          <strong>Yasaklı Kullanımlar:</strong> Web Sitemizi, işlevselliğini devre dışı bırakacak, aşırı yükleyecek, zarar verecek veya diğer kullanıcıların deneyimini engelleyecek şekilde kullanmayı kabul etmiyorsunuz.
        </Typography>
        <Typography variant="body1" paragraph>
          <strong>Bilgilere Dayalı Güven:</strong> Web Sitemizde yer alan bilgiler yalnızca genel amaçlıdır. Bilgilerin doğruluğu veya eksiksizliği garanti edilmemekte olup, kullanımınız tamamen kendi riskiniz altındadır.
        </Typography>
        <Typography variant="body1" paragraph>
          <strong>Yürürlükteki Hukuk:</strong> Bu Kullanım Şartları, ABD’nin Ohio eyaleti yasalarına tabi olup, tüm uyuşmazlıklar yalnızca Ohio, Hamilton County mahkemelerinde veya Cincinnati, Ohio’daki bağlayıcı tahkim yoluyla çözülecektir.
        </Typography>
        <Typography variant="body1" paragraph>
          <strong>Feragat ve Bölünebilirlik:</strong> Bu Şartlardan herhangi birinin uygulanmaması, o maddeye feragat edildiği anlamına gelmez; eğer herhangi bir madde geçersiz sayılırsa, kalan hükümler tam olarak yürürlükte kalmaya devam edecektir.
        </Typography>
        <Typography variant="body1" paragraph>
          <strong>Görüş ve Sorular:</strong> Herhangi bir geri bildirim veya sorunuz varsa, lütfen info@tiamatech.com adresine yazınız.
        </Typography>
      </Box>
    </Container>
  );
};

export default TermsOfService;
