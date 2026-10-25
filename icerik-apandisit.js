// ÖRNEK İÇERİK. Kaynakla doğrulanmadı.
// kaynaklar öğesi biçimi (şimdilik boş):
// { id: "k1", ad: "Kitap veya kılavuz adı", bolum: "bölüm/sayfa", url: "", dogrulama: "dogrulandi" | "dogrulanmadi", dogrulayan: "", tarih: "" }
window.ICERIK = window.ICERIK || {};
ICERIK["akut-apandisit"] = {
  id: "akut-apandisit",
  baslik: "Akut apandisit",
  uyari: "ÖRNEK İÇERİK: Bu ders ve sorular prototipi denemek için hazırlandı. Kaynakla doğrulanmadı; sınav hazırlığında dayanak olarak kullanma.",
  kaynaklar: [],
  ders: {
    bolumler: [
      { baslik: "Tanım ve önemi", maddeler: [
        "Apendiks vermiformisin akut iltihabıdır.",
        "Acil cerrahi gerektiren karın ağrısı nedenleri arasında sık görülür."
      ]},
      { baslik: "Patogenez", maddeler: [
        "Genellikle apendiks lümeninin tıkanmasıyla başlar (fekalit, lenfoid doku hiperplazisi gibi).",
        "Tıkanma sonrası lümen içi basınç artar, bakteriler çoğalır ve damar akımı bozulur; tedavi edilmezse iskemi, nekroz ve perforasyon gelişebilir."
      ]},
      { baslik: "Klinik", maddeler: [
        "Klasik öykü: önce göbek çevresinde künt, yaygın ağrı (visseral); saatler içinde sağ alt kadrana yerleşen, daha keskin ağrı (parietal peritonun tutulumu).",
        "İştahsızlık, bulantı, kusma ve hafif ateş eşlik edebilir; bulantı ve kusma genellikle ağrıdan sonra başlar.",
        "Çocuklarda, yaşlılarda ve gebelerde tablo atipik olabilir."
      ]},
      { baslik: "Fizik muayene", maddeler: [
        "McBurney noktasında hassasiyet; rebound ve defans peritoneal irritasyonu gösterir.",
        "Rovsing bulgusu: sol alt kadran palpasyonunda sağ alt kadranda ağrı.",
        "Psoas bulgusu: kalça ekstansiyonunda ağrı; retrosekal yerleşimde görülebilir.",
        "Obturator bulgusu: fleksiyondaki kalçanın iç rotasyonunda ağrı; pelvik yerleşimde görülebilir."
      ]},
      { baslik: "Tanı", maddeler: [
        "Tanıda öykü ve muayene temeldir; lökositoz ve CRP yüksekliği destekler ama tek başına tanı koydurmaz.",
        "Görüntülemede erişkinde genellikle BT, çocuk ve gebede genellikle önce ultrason kullanılır; seçim olanaklara ve kılavuzlara göre değişir."
      ]},
      { baslik: "Tedavi ve komplikasyonlar", maddeler: [
        "Standart tedavi apendektomidir (açık veya laparoskopik); antibiyotik uygulanır.",
        "Seçilmiş, komplike olmayan olgularda yalnız antibiyotik tedavisi de tartışılmaktadır; bu tercih yerel kılavuza göre değişir.",
        "Komplikasyonlar: perforasyon, periapendiküler apse, peritonit."
      ]}
    ],
    ozet: "Klasik tablo: göbek çevresinden sağ alt kadrana göç eden ağrı, iştahsızlık, bulantı, McBurney hassasiyeti ve peritoneal irritasyon bulguları. Standart tedavi apendektomidir."
  },
  sorular: [
    {
      id: "q1", baslik: "Klasik apandisit öyküsü ve muayenesi",
      metin: "24 yaşında erkek hasta, 12 saat önce göbek çevresinde başlayıp sonradan sağ alt kadrana yerleşen karın ağrısı, iştahsızlık ve bulantı ile başvuruyor. Ateşi 37,8 °C. Muayenede McBurney noktasında hassasiyet ve rebound saptanıyor. En olası tanı hangisidir?",
      secenekler: [
        { id: "a", metin: "Akut apandisit", aciklama: "Öykü (ağrının göbek çevresinden sağ alt kadrana göçü, iştahsızlık, bulantı, hafif ateş) ve muayene (McBurney hassasiyeti, rebound) klasik akut apandisit tablosuna uyar." },
        { id: "b", metin: "Akut kolesistit", aciklama: "Ağrı tipik olarak sağ üst kadrandadır ve Murphy bulgusu beklenir; göbek çevresinden sağ alt kadrana göç tipik değildir." },
        { id: "c", metin: "Akut pankreatit", aciklama: "Epigastrik, sıklıkla sırta yayılan şiddetli ağrı ve amilaz/lipaz yüksekliği beklenir." },
        { id: "d", metin: "Renal kolik", aciklama: "Yan tarafta başlayıp kasığa yayılan dalgalı ağrı, hastanın rahat pozisyon bulamaması ve sıklıkla hematüri beklenir; peritoneal irritasyon bulguları beklenmez." },
        { id: "e", metin: "Sigmoid divertikülit", aciklama: "Ağrı ve hassasiyet tipik olarak sol alt kadrandadır." }
      ],
      dogru: "a",
      temelBilgi: "Tanıda en önemli basamak anamnezdir: önce göbek çevresinde yaygın ağrı, sonra sağ alt kadrana yerleşme, iştahsızlık ve bulantı; muayenede McBurney hassasiyeti ve peritoneal irritasyon bulguları klasik tablodur.",
      kaynakIds: []
    },
    {
      id: "q2", baslik: "Başlangıç ağrısının göbek çevresinde olması",
      metin: "Akut apandisitte ağrı başlangıçta göbek çevresinde hissedilir. Bunun en iyi açıklaması hangisidir?",
      secenekler: [
        { id: "a", metin: "Parietal peritonun irritasyonu", aciklama: "Parietal peritonun tutulumu iyi lokalize, keskin ağrı yapar; bu, ağrının sağ alt kadrana yerleştiği sonraki evreyi açıklar." },
        { id: "b", metin: "Visseral afferent liflerin uyarılması; ağrının orta barsak (midgut) kökenli yapılar için periumbilikal bölgeye yansıması", aciklama: "Apendiks midgut kökenlidir. Lümen gerilmesi visseral lifleri uyarır ve ağrı künt, yaygın biçimde göbek çevresinde algılanır." },
        { id: "c", metin: "Diyafram irritasyonu", aciklama: "Diyafram irritasyonu omuza yansıyan ağrı yapar; apandisitin erken dönemini açıklamaz." },
        { id: "d", metin: "Mezenterik lenfadenit", aciklama: "Özellikle çocuklarda apandisiti taklit edebilen ayırıcı tanıdır; başlangıç ağrısının göbek çevresinde olmasını açıklayan mekanizma değildir." },
        { id: "e", metin: "Sağ üreterin irritasyonu", aciklama: "Üreter kaynaklı ağrı yan tarafta başlayıp kasığa yayılır; apandisitteki göbek çevresi ağrısının mekanizması değildir." }
      ],
      dogru: "b",
      temelBilgi: "İç organ (visseral) ağrısı künt ve yaygındır, organın embriyolojik kökenine uygun bölgede hissedilir. Midgut kökenli apendiksin erken ağrısı bu yüzden göbek çevresindedir.",
      kaynakIds: [],
      varyant: "q3"
    },
    {
      id: "q3", baslik: "Ağrının sağ alt kadrana yerleşmesi",
      metin: "Akut apandisitte göbek çevresindeki ağrı saatler içinde sağ alt kadrana yerleşir. Bu değişimi en iyi açıklayan mekanizma hangisidir?",
      secenekler: [
        { id: "a", metin: "Visseral afferent liflerin daha şiddetli uyarılması", aciklama: "Visseral ağrının şiddeti artsa da yeri değişmez; ağrı künt ve orta hatta kalır." },
        { id: "b", metin: "İltihabın apendiks serozasına ve komşu parietal peritona ulaşması", aciklama: "Parietal peritonda somatik duyu lifleri vardır; bu lifler ağrıyı keskin ve iyi lokalize yapar, ağrı apendiksin bulunduğu sağ alt kadranda hissedilir." },
        { id: "c", metin: "Ağrının midgut'tan hindgut'a geçmesi", aciklama: "Böyle bir geçiş yoktur; apendiks midgut kökenlidir ve ağrının yer değiştirmesi peritonun tutulmasıyla ilgilidir." },
        { id: "d", metin: "Bağırsak hareketlerinin artması", aciklama: "Peristaltizmin artması ağrının yerleşimini açıklamaz." },
        { id: "e", metin: "Apendiksin ilk saatlerde perfore olması", aciklama: "Perforasyon ağrının klasik göçünü açıklamaz; perforasyonda ağrı genellikle yaygınlaşır ve peritonit tablosu gelişir." }
      ],
      dogru: "b",
      temelBilgi: "Erken evre ağrısı visseral (künt, göbek çevresi), sonraki evre ağrısı parietal peritonun tutulmasıyla somatik (keskin, sağ alt kadran) niteliktedir.",
      kaynakIds: []
    },
    {
      id: "q4", baslik: "Obturator bulgusu ve apendiks yerleşimi",
      metin: "Muayenede, kalçası ve dizi fleksiyondayken kalçanın iç rotasyonu sırasında hastanın sağ alt kadran ağrısı artıyor (obturator bulgusu). Bu bulgu apendiksin hangi yerleşimini en çok düşündürür?",
      secenekler: [
        { id: "a", metin: "Pelvik yerleşim", aciklama: "Pelvik apendiks obturator internus kasına komşudur; kalçanın iç rotasyonu bu kası gerer ve komşu iltihaplı apendiksi uyarır." },
        { id: "b", metin: "Retrosekal yerleşim", aciklama: "Retrosekal yerleşimde daha çok psoas bulgusu (kalça ekstansiyonunda ağrı) beklenir." },
        { id: "c", metin: "Subhepatik yerleşim", aciklama: "Ağrı ve hassasiyet daha yukarıda, sağ üst kadrana doğru kayar; obturator bulgusuyla ilişkilendirilmez." },
        { id: "d", metin: "Ön (preileal) yerleşim", aciklama: "Karın ön duvarına komşu olduğu için belirgin ön duvar hassasiyeti ve peritoneal irritasyon bulguları öne çıkar; obturator bulgusu beklenmez." },
        { id: "e", metin: "Sol alt kadranda yerleşim (situs inversus gibi nadir durumlar)", aciklama: "Bu durumda ağrı sol alt kadranda olurdu; obturator bulgusunu açıklamaz." }
      ],
      dogru: "a",
      temelBilgi: "Apendiksin yerleşimi muayene bulgularını değiştirir: retrosekal yerleşimde psoas, pelvik yerleşimde obturator bulgusu öne çıkabilir; ön yerleşimde belirgin peritoneal irritasyon bulguları görülür.",
      kaynakIds: []
    }
  ]
};