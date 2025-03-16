// src/products.ts

import { images } from "../images";

export type Product = {
  id: string;
  name: string;
  category: string;
  description: string;
  image: string;
  price: number;
  version?: string;
  vendor?: string;
  deployment: "cloud" | "on-premise" | "hybrid";
  tags: string[];
  compliance: string[];
  techSpecs: {
    aiIntegration: boolean;
    iotSupport: boolean;
    realTimeAnalytics: boolean;
    scalability: "enterprise" | "mid-size" | "startup";
    apiAccess: boolean;
  };
  features: string[];
  highlights?: string[];
};

export const Products: Product[] = [
  {
    id: "cognitive-01",
    name: "Websitesi Tasarım ve Oluşturma",
    category: "cognitive-digital",
    description:
      "Modern tasarım prensipleri ve yenilikçi teknolojik entegrasyonlarla, işletmenizin dijital yüzünü estetik ve işlevsel olarak yeniden tanımlayın. Kullanıcı deneyimini maksimize eden, interaktif ve duyarlı arayüzlerle fark yaratın.",
    image: images.webDesign, // previously webDesgn
    price: 45000,
    deployment: "hybrid",
    tags: ["UI/UX", "Responsive Tasarım", "SEO", "Interaktif Deneyim"],
    compliance: ["ISO 27001", "GDPR", "NIST"],
    techSpecs: {
      aiIntegration: true,
      iotSupport: true,
      realTimeAnalytics: true,
      scalability: "enterprise",
      apiAccess: true,
    },
    features: [
      "Mobil ve masaüstü uyumlu dinamik arayüz",
      "Özel grafik tasarım ve animasyon entegrasyonu",
      "SEO odaklı yapılandırma",
      "Kullanıcı merkezli etkileşim optimizasyonu",
    ],
    highlights: [
      "Yüksek etkileşim oranı",
      "Hızlı sayfa yükleme süreleri",
      "Gelişmiş veri güvenliği",
    ],
    vendor: "QuantumDigital Inc.",
    version: "2.3.1",
  },
  {
    id: "cognitive-02",
    name: "Websitesi Geliştirme",
    category: "cognitive-digital",
    description:
      "Özel kodlama teknikleri ve güçlü altyapı çözümleriyle, dinamik ve ölçeklenebilir web uygulamaları geliştirin. Güvenlik, performans ve modern entegrasyonları bir araya getirerek işletmenizin dijital dönüşümünü destekler.",
    image: images.webDev,
    price: 45000,
    deployment: "hybrid",
    tags: ["API Entegrasyonu", "Modüler Mimari", "Güvenlik", "Performans"],
    compliance: ["ISO 27001", "GDPR", "NIST"],
    techSpecs: {
      aiIntegration: true,
      iotSupport: true,
      realTimeAnalytics: true,
      scalability: "enterprise",
      apiAccess: true,
    },
    features: [
      "Modüler ve ölçeklenebilir kod yapısı",
      "Güçlü API entegrasyonları",
      "Gelişmiş güvenlik protokolleri",
      "Performans odaklı sunucu altyapısı",
    ],
    highlights: [
      "Hızlı entegrasyon süreleri",
      "Düşük bakım maliyetleri",
      "Endüstri standartlarına uyum",
    ],
    vendor: "QuantumDigital Inc.",
    version: "2.3.1",
  },
  {
    id: "cognitive-03",
    name: "Mobil Uygulama Tasarım ve Oluşturma",
    category: "cognitive-digital",
    description:
      "Mobil deneyimi yeniden tanımlayan, estetik ve işlevsel arayüzlerle donatılmış uygulama tasarım çözümleri. Kullanıcı odaklı yaklaşım ile modern mobil tasarım trendlerini yakalayın.",
    image: images.mobileDesign, // previously mobileDesgn
    price: 45000,
    deployment: "hybrid",
    tags: ["UX Tasarım", "Mobil UI", "Kullanıcı Deneyimi", "Modern Tasarım"],
    compliance: ["ISO 27001", "GDPR", "NIST"],
    techSpecs: {
      aiIntegration: true,
      iotSupport: true,
      realTimeAnalytics: true,
      scalability: "enterprise",
      apiAccess: true,
    },
    features: [
      "Özel mobil arayüz ve dokunmatik etkileşim",
      "Cross-platform uyumluluk",
      "Esnek ve dinamik tasarım çözümleri",
      "Modern renk ve tipografi yönetimi",
    ],
    highlights: [
      "Yüksek kullanıcı memnuniyeti",
      "Hızlı erişim ve düşük gecikme",
      "Estetik ve fonksiyonel tasarım",
    ],
    vendor: "QuantumDigital Inc.",
    version: "2.3.1",
  },
  {
    id: "cognitive-04",
    name: "Mobil Uygulama Geliştirme",
    category: "cognitive-digital",
    description:
      "Yenilikçi mobil teknolojiler ve performans odaklı altyapı ile, işletmenizin dijital dönüşümünü destekleyen mobil uygulamalar geliştirin. Güvenli, ölçeklenebilir ve kullanıcı dostu çözümler sunar.",
    image: images.mobileDev,
    price: 45000,
    deployment: "hybrid",
    tags: ["Mobil Entegrasyon", "Performans", "Güvenlik", "Ölçeklenebilirlik"],
    compliance: ["ISO 27001", "GDPR", "NIST"],
    techSpecs: {
      aiIntegration: true,
      iotSupport: true,
      realTimeAnalytics: true,
      scalability: "enterprise",
      apiAccess: true,
    },
    features: [
      "Yüksek performanslı mobil uygulama mimarisi",
      "Güvenli veri alışverişi",
      "Yerel ve hibrit uygulama desteği",
      "Modern API entegrasyonları",
    ],
    highlights: [
      "Kesintisiz kullanıcı deneyimi",
      "Hızlı veri senkronizasyonu",
      "Gelişmiş güvenlik altyapısı",
    ],
    vendor: "QuantumDigital Inc.",
    version: "2.3.1",
  },
  {
    id: "auto-01",
    name: "Akıllı Depo Yazılımı",
    category: "autonomous-ops",
    description:
      "Endüstri 4.0 teknolojileriyle entegre, depo yönetiminde verimliliği artıran akıllı yazılım çözümü. IoT destekli sensör ağları ve gerçek zamanlı veri analizi ile stok ve lojistik süreçlerinizi optimize eder.",
    image: images.smartWarehouse,
    price: 75000,
    deployment: "cloud",
    tags: ["IIoT", "Otomasyon", "Veri Analizi", "Lojistik Yönetimi"],
    compliance: ["IEC 62443", "ISO 9001"],
    techSpecs: {
      aiIntegration: true,
      iotSupport: true,
      realTimeAnalytics: true,
      scalability: "enterprise",
      apiAccess: true,
    },
    features: [
      "Gerçek zamanlı envanter kontrolü",
      "IoT tabanlı otomasyon entegrasyonu",
      "Dinamik raporlama sistemi",
      "Enerji verimliliği analizi",
    ],
    highlights: [
      "Depo operasyonlarında %50 artış verimlilik",
      "Hassas stok takibi",
      "Entegre otomasyon altyapısı",
    ],
    vendor: "FutureManufacture Tech",
    version: "1.8.0",
  },
  {
    id: "auto-02",
    name: "Görüntü İşleme Yazılımı",
    category: "autonomous-ops",
    description:
      "Yüksek çözünürlüklü görüntü işleme algoritmaları ile üretim süreçlerinde kalite kontrol ve hata tespitini optimize eden, makine öğrenmesi destekli yazılım çözümü. Üretimde anlık müdahale imkanı sağlar.",
    image: images.imageSoft, // previously imagePros
    price: 75000,
    deployment: "cloud",
    tags: ["Görüntü Analizi", "Makine Öğrenmesi", "Kalite Kontrol", "Algoritma Optimizasyonu"],
    compliance: ["IEC 62443", "ISO 9001"],
    techSpecs: {
      aiIntegration: true,
      iotSupport: true,
      realTimeAnalytics: true,
      scalability: "enterprise",
      apiAccess: true,
    },
    features: [
      "Otomatik görüntü analizi",
      "Gerçek zamanlı hata tespiti",
      "Yüksek çözünürlük desteği",
      "Ölçeklenebilir analiz altyapısı",
    ],
    highlights: [
      "Üretim süreçlerinde %40 verimlilik artışı",
      "Hassas ve hızlı analiz mekanizması",
      "Kullanıcı dostu arayüz",
    ],
    vendor: "FutureManufacture Tech",
    version: "1.8.0",
  },
  {
    id: "auto-03",
    name: "Üretim & Envanter Takip Yazılımı",
    category: "autonomous-ops",
    description:
      "Üretim süreçlerinizi dijitalleştiren, envanter yönetimini ve üretim hatlarını gerçek zamanlı izleyen akıllı yazılım çözümü. Otomatik veri toplama ve analitik raporlama ile operasyonel verimliliği maksimize eder.",
    image: images.inventory, // previously inventorySoft
    price: 75000,
    deployment: "cloud",
    tags: ["Üretim Yönetimi", "Envanter Takibi", "Veri Raporlama", "Mobil Erişim"],
    compliance: ["IEC 62443", "ISO 9001"],
    techSpecs: {
      aiIntegration: true,
      iotSupport: true,
      realTimeAnalytics: true,
      scalability: "enterprise",
      apiAccess: true,
    },
    features: [
      "Entegre üretim yönetimi modülü",
      "Otomatik envanter güncelleme",
      "Gerçek zamanlı veri raporlaması",
      "Mobil erişim ve kontrol imkanı",
    ],
    highlights: [
      "Üretim maliyetlerinde %30 azalma",
      "Veriye dayalı karar destek sistemi",
      "Yüksek doğruluk oranı",
    ],
    vendor: "FutureManufacture Tech",
    version: "1.8.0",
  },
  {
    id: "auto-04",
    name: "Barkod Okuyucu Yazılımı",
    category: "autonomous-ops",
    description:
      "Endüstriyel barkod okuma teknolojilerini entegre eden, hızlı ve güvenilir veri toplama çözümü. Lojistik süreçlerde hatasız operasyon ve gerçek zamanlı veri doğrulama sağlar.",
    image: images.barcodeReaderSoft,
    price: 75000,
    deployment: "cloud",
    tags: ["Barkod Tarama", "Veri Toplama", "Mobil Entegrasyon", "Otomasyon"],
    compliance: ["IEC 62443", "ISO 9001"],
    techSpecs: {
      aiIntegration: true,
      iotSupport: true,
      realTimeAnalytics: true,
      scalability: "enterprise",
      apiAccess: true,
    },
    features: [
      "Hızlı ve doğru barkod tarama algoritmaları",
      "Mobil cihaz entegrasyonu",
      "Veri doğrulama ve işleme modülü",
      "Düşük hata oranı",
    ],
    highlights: [
      "Operasyonel verimlilik artışı",
      "Kolay sistem entegrasyonu",
      "Gelişmiş hata tespiti mekanizması",
    ],
    vendor: "FutureManufacture Tech",
    version: "1.8.0",
  },
  {
    id: "auto-05",
    name: "Görüntü İşleme Kamera Sistemleri",
    category: "autonomous-ops",
    description:
      "Yüksek performanslı görüntü işleme teknolojileriyle donatılmış kamera sistemleri; üretim ve güvenlik alanında, anlık olay algılama ve otomatik tanıma yetenekleri sunar.",
    image: images.camera, // previously cameRa
    price: 75000,
    deployment: "cloud",
    tags: ["HD Kamera", "Olay Algılama", "Akıllı Görüntü Analizi", "Güvenlik"],
    compliance: ["IEC 62443", "ISO 9001"],
    techSpecs: {
      aiIntegration: true,
      iotSupport: true,
      realTimeAnalytics: true,
      scalability: "enterprise",
      apiAccess: true,
    },
    features: [
      "Yüksek çözünürlüklü görüntü yakalama",
      "Gerçek zamanlı olay tespiti",
      "Akıllı kamera kontrol sistemi",
      "Gelişmiş görüntü analiz algoritmaları",
    ],
    highlights: [
      "Güvenlik süreçlerinde %95 başarı oranı",
      "Kolay kurulum ve yönetim",
      "Hızlı ve güvenilir analiz",
    ],
    vendor: "FutureManufacture Tech",
    version: "1.8.0",
  },
  {
    id: "auto-06",
    name: "El Terminali",
    category: "autonomous-ops",
    description:
      "Mobil veri toplama ve endüstriyel uygulamalar için optimize edilmiş, ergonomik tasarıma sahip el terminali. Gerçek zamanlı veri senkronizasyonu ve dayanıklı yapısıyla sahada maksimum performans sunar.",
    image: images.barcodeReader, // previously barcReader
    price: 75000,
    deployment: "cloud",
    tags: ["Mobil Veri", "Ergonomik Tasarım", "Dayanıklılık", "Kablosuz Bağlantı"],
    compliance: ["IEC 62443", "ISO 9001"],
    techSpecs: {
      aiIntegration: true,
      iotSupport: true,
      realTimeAnalytics: true,
      scalability: "enterprise",
      apiAccess: true,
    },
    features: [
      "Dokunmatik ekranlı hızlı veri işleme",
      "Dayanıklı yapı ve uzun pil ömrü",
      "Kablosuz bağlantı desteği",
      "Anlık veri senkronizasyonu",
    ],
    highlights: [
      "Saha performansında yüksek verimlilik",
      "Kullanıcı dostu arayüz",
      "Gelişmiş veri güvenliği",
    ],
    vendor: "FutureManufacture Tech",
    version: "1.8.0",
  },
  {
    id: "iot-01",
    name: "Endüstriyel Haberleşme Yazılımları",
    category: "industrial-neural",
    description:
      "Dağıtık IoT ağları için optimize edilmiş, güvenli ve düşük gecikmeli haberleşme altyapısı. Kenar bilişim teknolojileriyle endüstriyel cihazlar arasında kesintisiz ve şifreli veri alışverişi sağlar.",
    image: images.endCommunication, // previously endComm
    price: 22000,
    deployment: "on-premise",
    tags: ["Kenar Bilişim", "Güvenli İletişim", "Düşük Gecikme", "Ölçeklenebilir Ağ"],
    compliance: ["NIST CSF", "ISO 27001"],
    techSpecs: {
      aiIntegration: true,
      iotSupport: true,
      realTimeAnalytics: true,
      scalability: "mid-size",
      apiAccess: true,
    },
    features: [
      "Gelişmiş şifreleme protokolleri",
      "Düşük gecikmeli veri iletimi",
      "Ölçeklenebilir ağ yapısı",
      "Gerçek zamanlı veri işleme",
    ],
    highlights: [
      "Tam güvenlik uyumluluğu",
      "Kesintisiz iletişim altyapısı",
      "Kapsamlı ağ yönetimi",
    ],
  },
  {
    id: "iot-02",
    name: "Hat Sonu İzleme Yazılımları",
    category: "industrial-neural",
    description:
      "Üretim hatlarının son noktasında, performans ve güvenlik odaklı izleme yazılımı. IoT ve kenar bilişim teknolojileriyle, hat sonu cihazlarının durumunu sürekli takip ederek operasyonel verimliliği artırır.",
    image: images.endOfLine, // previously endOf
    price: 22000,
    deployment: "on-premise",
    tags: ["Gerçek Zamanlı İzleme", "Durum Analizi", "Enerji Verimliliği", "Hata Raporlama"],
    compliance: ["NIST CSF", "ISO 27001"],
    techSpecs: {
      aiIntegration: true,
      iotSupport: true,
      realTimeAnalytics: true,
      scalability: "mid-size",
      apiAccess: true,
    },
    features: [
      "Sürekli durum güncellemeleri",
      "Gelişmiş hata raporlama sistemi",
      "Enerji verimliliği analizi",
      "Anlık uyarı mekanizması",
    ],
    highlights: [
      "Operasyonel kesintilerde belirgin azalma",
      "Yüksek izlenebilirlik",
      "Gelişmiş uyarı ve müdahale sistemi",
    ],
  },
  {
    id: "cyber-01",
    name: "Veri Analizi ve Güvenliği Sistemi",
    category: "quantum-cyber",
    description:
      "Kuantum dirençli şifreleme ve yapay zeka destekli analiz teknolojileriyle, ağ güvenliğinde devrim yaratan bir çözüm. Tehdit algılama, anomali tespiti ve otomatik müdahale özellikleri ile kurumsal verilerinizi en üst düzeyde korur.",
    image: images.dataAnalysis, // previously datAnls
    price: 98000,
    deployment: "hybrid",
    tags: ["Kuantum Şifreleme", "Tehdit Analizi", "Zero Trust", "Dark Web İzleme"],
    compliance: ["NIST PQ", "ISO 27001", "SOC 2"],
    techSpecs: {
      aiIntegration: true,
      iotSupport: true,
      realTimeAnalytics: true,
      scalability: "enterprise",
      apiAccess: true,
    },
    features: [
      "Kuantum şifreleme algoritmaları",
      "Gerçek zamanlı tehdit ve anomali tespiti",
      "Otomatik saldırı yanıtı",
      "Dark web izleme modülü",
    ],
    highlights: [
      "Siber saldırılara karşı %99 güvenlik",
      "Yüksek performanslı veri koruma",
      "Öncü siber güvenlik protokolleri",
    ],
    vendor: "CyberShield Quantum",
    version: "3.0.0-rc1",
  },
];
