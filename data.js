const K = ad => ({ id: ad.toLocaleLowerCase("tr").replace(/[^a-z0-9ğüşıöç]+/g, "-"), ad });

const VERI = {
  ornek: true,
  stajlar: [
    { id: "dahiliye", ad: "Dahiliye", altDallar: [
      { id: "kardiyoloji", ad: "Kardiyoloji", konular: [K("Hipertansiyon"), K("Kalp yetmezliği"), K("Akut koroner sendrom")] },
      { id: "gastro", ad: "Gastroenteroloji", konular: [K("Peptik ülser"), K("Siroz")] },
      { id: "endokrin", ad: "Endokrinoloji", konular: [K("Diabetes mellitus"), K("Hipotiroidi")] }
    ]},
    { id: "cerrahi", ad: "Genel Cerrahi", altDallar: [
      { id: "akut-batin", ad: "Akut batın", konular: [K("Akut apandisit"), K("İntestinal obstrüksiyon")] },
      { id: "hepatobiliyer", ad: "Hepatobiliyer", konular: [K("Kolelitiazis"), K("Akut kolesistit")] }
    ]},
    { id: "pediatri", ad: "Pediatri", altDallar: [
      { id: "ped-enfeksiyon", ad: "Çocuk enfeksiyon", konular: [K("Kızamık"), K("Akut otitis media")] },
      { id: "buyume", ad: "Büyüme ve gelişme", konular: [K("Gelişim basamakları"), K("Aşı takvimi")] }
    ]},
    { id: "kadin-dogum", ad: "Kadın Hastalıkları ve Doğum", altDallar: [
      { id: "obstetri", ad: "Obstetri", konular: [K("Preeklampsi"), K("Gestasyonel diyabet")] }
    ]}
  ],
  modlar: [
    { id: "ogren", ad: "Konu öğrenme", aciklama: "Konuyu adım adım öğren" },
    { id: "test", ad: "Çoktan seçmeli soru", aciklama: "Soru çöz, hatalardan öğren" },
    { id: "kart", ad: "Bilgi kartları", aciklama: "Hızlı tekrar" },
    { id: "vaka", ad: "Klinik vaka", aciklama: "Vaka üzerinden düşün" },
    { id: "sozlu", ad: "Yazılı / sözlü simülasyon", aciklama: "Sınav provası" },
    { id: "kaynak", ad: "Kaynak inceleme", aciklama: "Kaynaklara göz at" },
    { id: "yanlis", ad: "Yanlışlarım ve eksiklerim", aciklama: "Zayıf noktalara çalış" }
  ],
  sureler: [5, 15, 30, 60]
};