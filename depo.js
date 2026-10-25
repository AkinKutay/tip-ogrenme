// İlerleme kaydı. Veriler yalnızca bu cihazın tarayıcısında (localStorage) saklanır.
// İleride başka bir depolamaya (ör. IndexedDB) geçmek için yalnızca bu dosya değişir.
const Depo = (() => {
  const ANAHTAR = "tip-ogrenme-ilerleme-v1";
  const bos = () => ({ surum: 1, sorular: {} });

  function oku() {
    try {
      const ham = localStorage.getItem(ANAHTAR);
      if (!ham) return bos();
      const v = JSON.parse(ham);
      return v && typeof v === "object" && v.sorular ? v : bos();
    } catch (e) {
      return bos();
    }
  }

  function yaz(v) {
    try {
      localStorage.setItem(ANAHTAR, JSON.stringify(v));
      return true;
    } catch (e) {
      return false;
    }
  }

  // sonuc: "dogru" | "dogru-emin-degil" | "yanlis"
  function kaydet(konuId, soruId, sonuc) {
    const v = oku();
    const anahtar = konuId + ":" + soruId;
    const o = v.sorular[anahtar] || { konuId, soruId, deneme: 0, dogru: 0, yanlis: 0, eminDegil: 0 };
    o.deneme += 1;
    if (sonuc === "yanlis") o.yanlis += 1; else o.dogru += 1;
    if (sonuc === "dogru-emin-degil") o.eminDegil += 1;
    o.sonSonuc = sonuc;
    o.sonTarih = new Date().toISOString();
    o.tekrarGerekli = sonuc !== "dogru";
    v.sorular[anahtar] = o;
    return yaz(v);
  }

  const tumu = () => Object.values(oku().sorular);
  const tekrarlar = konuId => tumu().filter(o => o.tekrarGerekli && (!konuId || o.konuId === konuId));
  const ozet = () => {
    const t = tumu();
    return { cozulen: t.length, tekrar: t.filter(o => o.tekrarGerekli).length };
  };

  function sifirla() {
    try { localStorage.removeItem(ANAHTAR); return true; } catch (e) { return false; }
  }

  return { kaydet, tumu, tekrarlar, ozet, sifirla };
})();