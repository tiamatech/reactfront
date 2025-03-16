import React, { useState } from "react";
import {
  Container,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  TextField,
  InputAdornment,
  Box,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import SearchIcon from "@mui/icons-material/Search";
import { industrialAnimations } from "../styles/animations";

const faqs = [
  {
    question: "Tiamat Tech kimdir?",
    answer:
      "Tiamat Tech, yapay zeka, veri analitiği, endüstriyel otomasyon ve dijital dönüşüm alanlarında uzmanlaşmış, ileri teknolojilerle donatılmış bir teknoloji şirketidir. Şirketimiz; yapay zeka destekli dijital ikiz sistemleri, IoT tabanlı akıllı sensör çözümleri ve gerçek zamanlı veri analitiği teknikleri ile üretim süreçlerini optimize ederek maliyetleri düşürür, verimliliği artırır ve rekabet avantajı sağlar.",
  },
  {
    question: "Hangi sektörlere hizmet veriyorsunuz?",
    answer:
      "Üretim, lojistik, endüstriyel otomasyon, veri analitiği ve dijital dönüşüm alanlarında kapsamlı çözümler sunuyoruz. Müşterilerimizin operasyonel verimliliğini artırmak için özelleştirilmiş sistem mimarileri geliştiriyoruz.",
  },
  {
    question: "Dijital dönüşüm fabrikamı nasıl iyileştirebilir?",
    answer:
      "Yapay zeka destekli dijital ikiz sistemler, IoT tabanlı akıllı sensörler ve gerçek zamanlı veri analizi ile üretim süreçlerinizi optimize eder; böylece kesinti sürelerini azaltır, kalite kontrolünü geliştirir ve üretkenliği artırır.",
  },
  {
    question: "Siber güvenlik ve veri koruması nasıl sağlanır?",
    answer:
      "Çözümlerimiz, gelişmiş siber güvenlik protokolleri, endüstriyel şifreleme teknikleri ve sürekli izleme sistemleriyle desteklenir. Böylece sistemlerinizin güvenliği, potansiyel saldırılara karşı maksimum düzeyde korunur.",
  },
  {
    question: "Endüstri 4.0’ın sunduğu avantajlar nelerdir?",
    answer:
      "Endüstri 4.0; dijital ikiz, yapay zeka, IoT ve veri analitiğini entegre ederek, operasyonel verimliliği artırır, maliyetleri düşürür ve işletmenize rekabet avantajı kazandırır. Bu sayede üretim süreçleri daha öngörülebilir ve yönetilebilir hale gelir.",
  },
  {
    question: "Çözümlerinizde hangi yenilikçi teknolojiler kullanılıyor?",
    answer:
      "Çözümlerimizde yapay zeka algoritmaları, akıllı sensör teknolojileri, veri odaklı analiz metotları ve dijital ikiz uygulamaları gibi ileri teknolojiler kullanılarak, süreç optimizasyonu ve dijital dönüşüm sağlanır.",
  },
  // Future Technologies Questions
  {
    question: "Gelecekte yapay zeka ne gibi yenilikler sunacak?",
    answer:
      "Gelecekte yapay zeka, gelişmiş makine öğrenimi algoritmaları ve öngörücü analitikle; otomatik karar destek sistemleri, kişiselleştirilmiş kullanıcı deneyimleri ve otonom sistemler sunacak. Bu yenilikler, endüstriyel süreçlerde verimliliği artırırken, iş modellerinde de radikal dönüşümlere yol açacaktır.",
  },
  {
    question: "Kuantum bilişim, teknolojide ne gibi değişiklikler getirecek?",
    answer:
      "Kuantum bilişim, klasik hesaplama yöntemlerinin ötesinde, karmaşık problemleri saniyeler içinde çözebilecek. Bu teknoloji, özellikle şifreleme, optimizasyon ve büyük veri analizinde devrim yaratacak; araştırma ve geliştirme süreçlerinde de önemli avantajlar sağlayarak, teknolojik dönüşümü hızlandıracaktır.",
  },
  {
    question: "Blockchain teknolojisinin geleceği nedir?",
    answer:
      "Blockchain, dağıtık defter teknolojisi sayesinde veri güvenliği, şeffaflık ve merkeziyetsizlik sağlayarak finans, tedarik zinciri ve sağlık gibi sektörlerde devrim yaratacak. Akıllı sözleşmeler ve merkeziyetsiz uygulamalar, gelecekte daha yaygın hale gelerek, iş süreçlerinde güven ve verimlilik sunacaktır.",
  },
  {
    question: "Dijital ikiz sistemler gelecekte nasıl evrilecek?",
    answer:
      "Gelecekte dijital ikiz sistemler, gerçek zamanlı veri akışı ve yapay zeka destekli simülasyonlarla daha öngörücü hale gelecek. Üretim hatlarındaki bakım, kalite kontrol ve süreç optimizasyonunu en üst düzeye çıkararak, işletmelerin stratejik karar alma süreçlerine yön verecek.",
  },
  {
    question: "Sürdürülebilir enerji teknolojileri dijital dönüşümle nasıl entegre olacak?",
    answer:
      "Yenilenebilir enerji kaynakları, akıllı enerji yönetim sistemleri ve IoT tabanlı sensör teknolojileriyle entegre edilerek, enerji verimliliğini artıracak, karbon ayak izini azaltacak ve enerji maliyetlerini düşürecek. Bu entegrasyon, sürdürülebilir bir gelecek için kritik bir rol oynayacaktır.",
  },
  {
    question: "Otonom robotik sistemler gelecekte ne gibi dönüşümler getirecek?",
    answer:
      "Otonom robotik sistemler, yapay zeka destekli algoritmalar ve öngörülebilir bakım teknolojileri sayesinde, üretim ve lojistik süreçlerde insan müdahalesini minimize edecek. Bu sistemler, daha hızlı, güvenli ve verimli operasyonlar sunarak, endüstriyel otomasyonun sınırlarını zorlayacak.",
  },
  {
    question: "5G ve ötesi iletişim teknolojileri gelecekte nasıl bir dönüşüm sağlayacak?",
    answer:
      "5G teknolojisi, ultra hızlı veri aktarımı ve düşük gecikme süreleri ile endüstriyel IoT, otonom araçlar ve akıllı şehirler gibi alanlarda devrim yaratıyor. Gelecekte, 6G gibi yeni nesil iletişim teknolojileriyle dijital dönüşümün hızı, kapsamı ve güvenilirliği daha da artacak.",
  },
];

const FAQ: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");

  // Filter FAQs based on the search query (case-insensitive)
  const filteredFaqs = faqs.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Container
      sx={{ py: 6 }}
      style={{ animation: `${industrialAnimations.slideIn} 1s` }}
    >
      <Typography variant="h4" align="center" gutterBottom>
        Teknoloji ve Dijital Dönüşüm S.S.S
      </Typography>
      <Box sx={{ maxWidth: "700px", mx: "auto", mb: 3 }}>
        <Typography variant="body1" align="center">
          Tiamat Tech, yapay zeka destekli dijital ikiz sistemleri, IoT tabanlı
          akıllı sensör teknolojileri ve gelişmiş veri analitiği yöntemleriyle
          endüstriyel otomasyonu ve dijital dönüşümü yeni bir çağa taşıyan,
          yenilikçi çözümler sunar. İşletmenizin verimliliğini artırmak ve
          rekabet gücünü yükseltmek için sunduğumuz stratejik yaklaşımları
          keşfedin.
        </Typography>
      </Box>

      {/* Dynamic Search Bar */}
      <TextField
        variant="outlined"
        placeholder="Sorunuzu veya anahtar kelimeyi girin..."
        fullWidth
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
        sx={{
          mb: 4,
          borderRadius: 2,
          backgroundColor: "#f9f9f9",
          "& .MuiOutlinedInput-root": {
            "& fieldset": { borderColor: "#e0e0e0" },
            "&:hover fieldset": { borderColor: "#c0c0c0" },
            "&.Mui-focused fieldset": { borderColor: "#a0a0a0" },
          },
        }}
      />

      {/* FAQ Accordions */}
      {filteredFaqs.length > 0 ? (
        filteredFaqs.map((faq, idx) => (
          <Accordion key={idx} sx={{ mb: 1 }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="h6">{faq.question}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body2">{faq.answer}</Typography>
            </AccordionDetails>
          </Accordion>
        ))
      ) : (
        <Typography variant="body2" align="center">
          Aradığınız konuda bir sonuç bulunamadı.
        </Typography>
      )}
    </Container>
  );
};

export default FAQ;
