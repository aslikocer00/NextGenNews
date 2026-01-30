export interface Story {
  id: string;
  category: string;
  title: string;
  author: string;
  image: string;
  date?: string;
  commentCount?: number;
  featured?: boolean;
  description?: string;
}

export interface StreamItem {
  id: string;
  time: string;
  title: string;
  commentCount: number;
}

export interface PopularItem {
  id: string;
  rank: string;
  title: string;
}

export const featuredStories: Story[] = [
  {
    id: "1",
    category: "Yapay Zeka",
    title: "OpenAI'ın yeni modeli 'o2' düşünme yeteneğiyle şaşırttı",
    author: "Canan Yılmaz",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=1600&auto=format&fit=crop",
    featured: true,
    date: "2 SAAT ÖNCE",
    description: "Teknoloji dünyasında deprem etkisi yaratan gelişme."
  },
  {
    id: "2",
    category: "Oyun",
    title: "GTA VI çıkış tarihi ertelendi mi? Rockstar'dan açıklama",
    author: "Emre Demir",
    image: "https://images.unsplash.com/photo-1605901309584-818e25960b8f?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "3",
    category: "Donanım",
    title: "NVIDIA RTX 5090'ın güç tüketimi korkutuyor",
    author: "Selin Kaya",
    image: "https://images.unsplash.com/photo-1591488320449-011701bb6704?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "4",
    category: "Uzay",
    title: "SpaceX Starship dördüncü uçuşunda yörüngeye ulaştı",
    author: "Burak Y.",
    image: "https://images.unsplash.com/photo-1517976487492-5750f3195933?q=80&w=800&auto=format&fit=crop",
  }
];

export const streamItems: StreamItem[] = [
  { id: "101", time: "14:30", title: "Apple Vision Pro Avrupa satış tarihi açıklandı", commentCount: 42 },
  { id: "102", time: "13:15", title: "Steam Deck 2 için yeni ekran paneli sızıntısı", commentCount: 128 },
  { id: "103", time: "11:45", title: "Cyberpunk 2077'nin yönetmeni yeni projeyi duyurdu", commentCount: 15 },
  { id: "104", time: "10:20", title: "Spotify Hi-Fi özelliği yine ertelendi", commentCount: 89 },
  { id: "105", time: "09:00", title: "Tesla Model Y yenilenen tasarımıyla görüntülendi", commentCount: 230 },
];

export const popularItems: PopularItem[] = [
  { id: "p1", rank: "01", title: "Neden herkes bu yeni sosyal medya uygulamasını konuşuyor?" },
  { id: "p2", rank: "02", title: "iPhone 16 sızıntıları: Beklediğimize değecek mi?" },
  { id: "p3", rank: "03", title: "Netflix şifre paylaşım yasağı işe yaradı mı?" },
  { id: "p4", rank: "04", title: "Elektrikli araç satışlarında büyük düşüş" },
  { id: "p5", rank: "05", title: "Yapay zeka işinizi elinizden almayacak (şimdilik)" },
];

export const freeTodayItems = [
  { id: "f1", title: "Haftanın Ücretsiz Oyunu", subtitle: "Epic Games", image: "https://images.unsplash.com/photo-1614680376593-902f74cf0d41?q=80&w=400&auto=format&fit=crop" },
  { id: "f2", title: "Ücretsiz İndie Paketi", subtitle: "Steam", image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=400&auto=format&fit=crop" },
  { id: "f3", title: "Açık Kaynak Araçlar", subtitle: "GitHub", image: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=400&auto=format&fit=crop" },
  { id: "f4", title: "Tasarım Kaynakları", subtitle: "Figma", image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=400&auto=format&fit=crop" },
];

export const mainFeedStories: Story[] = [
  {
    id: "feed1",
    category: "Teknoloji",
    title: "Teknoloji devleri yeni standartlar belirliyor: Gelecek burada mı?",
    description: "Yapay zeka, kuantum bilgisayarlar ve uzay teknolojilerinde yaşanan son gelişmeler, insanlığın geleceğini nasıl şekillendirecek? Uzmanlar tartışıyor.",
    author: "Ahmet Yılmaz",
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=600&auto=format&fit=crop",
    date: "4 Saat Önce",
    commentCount: 12
  },
  {
    id: "feed2",
    category: "Bilim",
    title: "Mars kolonisi için kritik eşik aşıldı",
    description: "Kızıl gezegende oksijen üretimi konusunda yapılan son deneyler beklenenden daha verimli sonuçlar verdi. İnsanlı görev için geri sayım hızlandı.",
    author: "Zeynep Tekin",
    image: "https://images.unsplash.com/photo-1614728853911-49e22395637e?q=80&w=600&auto=format&fit=crop",
    date: "6 Saat Önce",
    commentCount: 45
  },
  {
    id: "feed3",
    category: "Mobil",
    title: "Katlanabilir telefonlar sonunda ucuzluyor mu?",
    description: "Yeni nesil ekran teknolojileri üretim maliyetlerini düşürdü. Artık herkesin cebinde katlanabilir bir ekran olabilir.",
    author: "Mehmet Demir",
    image: "https://images.unsplash.com/photo-1611532763815-51e6cb747346?q=80&w=600&auto=format&fit=crop",
    date: "8 Saat Önce",
    commentCount: 23
  },
  {
    id: "feed4",
    category: "Kripto",
    title: "Bitcoin ETF onayı piyasaları nasıl etkiledi?",
    description: "Finans dünyasının beklediği karar sonrası piyasalarda hareketlilik sürüyor. Uzmanlar önümüzdeki çeyrek için ne diyor?",
    author: "Ali Vural",
    image: "https://images.unsplash.com/photo-1518546305927-5a555bb7020d?q=80&w=600&auto=format&fit=crop",
    date: "12 Saat Önce",
    commentCount: 156
  },
  {
    id: "feed5",
    category: "Otomobil",
    title: "Elektrikli araçlarda menzil sorunu tarih oluyor",
    description: "Katı hal pilleri laboratuvardan çıkıp yollara inmeye hazırlanıyor. 1000km menzil artık hayal değil.",
    author: "Ayşe Kaya",
    image: "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?q=80&w=600&auto=format&fit=crop",
    date: "1 Gün Önce",
    commentCount: 89
  }
];
