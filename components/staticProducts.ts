export type Product = {
  id: string;
  name: string;
  category: string;
  description: string;
  image: string;
  price: number;
  version?: string;
  vendor?: string;
  deployment: 'cloud' | 'on-premise' | 'hybrid';
  tags: string[];
  compliance: string[];
  techSpecs: {
    aiIntegration: boolean;
    iotSupport: boolean;
    realTimeAnalytics: boolean;
    scalability: 'enterprise' | 'mid-size' | 'startup';
    apiAccess: boolean;
  };
  features: string[];
  highlights?: string[];
};

export const staticProducts: Product[] = [
  {
    id: 'cognitive-01',
    name: 'Yapay Zeka Destekli Dijital İkiz Platformu',
    category: 'cognitive-digital',
    description:
      'Makine öğrenmesi entegrasyonu ile yeni nesil sanal simülasyon ortamı.',
    image: '/assets/digital-twin-3d.webp',
    price: 45000,
    deployment: 'hybrid',
    tags: ['AI', 'Simulation', 'Predictive Modeling', '3D Visualization'],
    compliance: ['ISO 27001', 'GDPR', 'NIST'],
    techSpecs: {
      aiIntegration: true,
      iotSupport: true,
      realTimeAnalytics: true,
      scalability: 'enterprise',
      apiAccess: true,
    },
    features: [
      'Çoklu fizik simülasyon motoru',
      'Gerçek zamanlı işbirliği',
      'Makine öğrenmesi destekli anomali tespiti',
      'Çapraz platform uyumluluğu',
    ],
    highlights: [
      'Piyasaya çıkış süresinde %30 hızlanma',
      'Fiziksel prototipleme maliyetlerinde %40 azalma',
      'ISO sertifikalı güvenlik protokolleri',
    ],
    vendor: 'QuantumDigital Inc.',
    version: '2.3.1',
  },
  {
    id: 'auto-02',
    name: 'Akıllı Fabrika Orkestratörü',
    category: 'autonomous-ops',
    description:
      'Endüstri 4.0 üretimi için uçtan uca otomasyon platformu.',
    image: '/assets/smart-factory-ai.webp',
    price: 75000,
    deployment: 'cloud',
    tags: ['IIoT', 'Robotic Process Automation', 'Digital Thread'],
    compliance: ['IEC 62443', 'ISO 9001'],
    techSpecs: {
      aiIntegration: true,
      iotSupport: true,
      realTimeAnalytics: true,
      scalability: 'enterprise',
      apiAccess: true,
    },
    features: [
      'Bilişsel süreç optimizasyonu',
      'Dijital ikiz entegrasyonu',
      'Öngörücü bakım',
      'Enerji tüketimi analitiği',
    ],
    vendor: 'FutureManufacture Tech',
    version: '1.8.0',
  },
  {
    id: 'iot-03',
    name: 'Edge AI Ağ Geçidi',
    category: 'industrial-neural',
    description:
      'Dağıtılmış IoT ağları için güvenli kenar bilişim platformu.',
    image: '/assets/edge-ai-gateway.webp',
    price: 22000,
    deployment: 'on-premise',
    tags: ['Edge Computing', 'Federated Learning', '5G Ready'],
    compliance: ['NIST CSF', 'ISO 27001'],
    techSpecs: {
      aiIntegration: true,
      iotSupport: true,
      realTimeAnalytics: true,
      scalability: 'mid-size',
      apiAccess: true,
    },
    features: [
      'Yerel yapay zeka işleme',
      'Güvenli cihaz entegrasyonu',
      'Kablosuz güncellemeler',
      'Enerji verimli tasarım',
    ],
    highlights: [
      'Bulut veri transferinde %50 azalma',
      'Askeri standart şifreleme',
      '1000+ kenar düğümü desteği',
    ],
  },
  {
    id: 'cyber-04',
    name: 'Nöral İzinsiz Giriş Önleme Sistemi',
    category: 'quantum-cyber',
    description:
      'Kuantum direncine sahip şifreleme ile yapay zeka destekli ağ koruması.',
    image: '/assets/quantum-security.webp',
    price: 98000,
    deployment: 'hybrid',
    tags: ['Post-Quantum Crypto', 'Threat Hunting', 'Zero Trust'],
    compliance: ['NIST PQ', 'ISO 27001', 'SOC 2'],
    techSpecs: {
      aiIntegration: true,
      iotSupport: true,
      realTimeAnalytics: true,
      scalability: 'enterprise',
      apiAccess: true,
    },
    features: [
      'Kuantum anahtar dağıtımı',
      'Davranışsal anomali tespiti',
      'Otomatik tehdit yanıtı',
      'Dark web izleme',
    ],
    vendor: 'CyberShield Quantum',
    version: '3.0.0-rc1',
  },
];
