// Çalışma ekranı: konu anlatımı, çoktan seçmeli soru akışı ve tekrar modu.
const Calisma = (() => {
  let icerik = null;
  let donus = null;
  let oturum = null;
  let tekrarModu = false;

  const kok = () => document.getElementById("calisma");
  const anaEkran = () => document.getElementById("anaEkran");
  const soruBul = id => icerik.sorular.find(s => s.id === id);

  function el(etiket, sinif, metin) {
    const e = document.createElement(etiket);
    if (sinif) e.className = sinif;
    if (metin !== undefined) e.textContent = metin;
    return e;
  }

  function dugme(sinif, metin, tikla) {
    const b = el("button", sinif, metin);
    b.type = "button";
    b.addEventListener("click", tikla);
    return b;
  }

  function goster(parcalar) {
    kok().replaceChildren(...parcalar);
    window.scrollTo(0, 0);
  }

  function ust() {
    return [
      dugme("geri", "← Ana ekran", kapat),
      el("h1", "", icerik.baslik),
      el("p", "kutu", icerik.uyari)
    ];
  }

  function kaynakKutusu(idler) {
    const kutu = el("div", "kaynak");
    const liste = (idler || []).map(id => icerik.kaynaklar.find(k => k.id === id)).filter(Boolean);
    if (!liste.length) {
      kutu.appendChild(el("p", "", "Kaynak: bu örnekte kaynak atfı yok."));
      kutu.appendChild(el("p", "", "Doğrulama durumu: doğrulanmadı."));
      return kutu;
    }
    for (const k of liste) {
      kutu.appendChild(el("p", "", "Kaynak: " + k.ad + (k.bolum ? " — " + k.bolum : "")));
      kutu.appendChild(el("p", "", "Doğrulama durumu: " + (k.dogrulama === "dogrulandi" ? "doğrulandı" : "doğrulanmadı")));
    }
    return kutu;
  }

  function ac(yeniIcerik, mod, donusFonksiyonu) {
    icerik = yeniIcerik;
    donus = donusFonksiyonu;
    tekrarModu = false;
    anaEkran().hidden = true;
    kok().hidden = false;
    if (mod === "ogren") dersEkrani(); else soruBaslat();
  }

  function tekrarAc(tumIcerikler, donusFonksiyonu) {
    donus = donusFonksiyonu;
    anaEkran().hidden = true;
    kok().hidden = false;
    const gruplar = Object.values(tumIcerikler || {})
      .map(ic => ({ ic, n: Depo.tekrarlar(ic.id).length }))
      .filter(g => g.n > 0);
    const geri = dugme("geri", "← Ana ekran", kapat);
    const baslik = el("h1", "", "Yanlışlarım ve eksiklerim");
    if (!gruplar.length) {
      goster([geri, baslik, el("p", "", "Tekrar bekleyen soru yok. Soru çözdükçe yanlışların ve emin olmadığın doğrular burada toplanır.")]);
      return;
    }
    if (gruplar.length === 1) { tekrarSorulariBaslat(gruplar[0].ic); return; }
    goster([geri, baslik, el("p", "", "Hangi konuyu tekrar etmek istersin?"),
      ...gruplar.map(g => dugme("ana-dugme ikincil", g.ic.baslik + " (" + g.n + " soru)", () => tekrarSorulariBaslat(g.ic)))]);
  }

  function tekrarSorulariBaslat(ic) {
    icerik = ic;
    tekrarModu = true;
    const sira = o => (o.sonSonuc === "yanlis" ? 0 : 1);
    const kayitlar = Depo.tekrarlar(ic.id).filter(o => soruBul(o.soruId)).sort((a, b) => sira(a) - sira(b));
    oturum = { kuyruk: kayitlar.map(o => o.soruId), i: 0, sonuclar: [], kayitHatasi: false };
    soruGoster();
  }

  function kapat() {
    kok().hidden = true;
    kok().replaceChildren();
    anaEkran().hidden = false;
    window.scrollTo(0, 0);
    if (donus) donus();
  }

  function dersEkrani() {
    const parcalar = ust();
    for (const b of icerik.ders.bolumler) {
      parcalar.push(el("h2", "", b.baslik));
      const ul = el("ul", "madde");
      for (const m of b.maddeler) ul.appendChild(el("li", "", m));
      parcalar.push(ul);
    }
    parcalar.push(el("p", "ozet", "Özet: " + icerik.ders.ozet));
    parcalar.push(kaynakKutusu(icerik.kaynaklar.map(k => k.id)));
    parcalar.push(dugme("ana-dugme", "Soruları çöz", soruBaslat));
    goster(parcalar);
  }

  function soruBaslat() {
    const varyantlar = icerik.sorular.map(s => s.varyant).filter(Boolean);
    const anaSorular = icerik.sorular.filter(s => !varyantlar.includes(s.id));
    tekrarModu = false;
    oturum = { kuyruk: anaSorular.map(s => s.id), i: 0, sonuclar: [], kayitHatasi: false };
    soruGoster();
  }

  function soruGoster() {
    const id = oturum.kuyruk[oturum.i];
    if (!id) { sonucEkrani(); return; }
    const s = soruBul(id);
    let secilen = null;

    const parcalar = ust();
    parcalar.push(el("p", "ilerleme", "Soru " + (oturum.i + 1) + " / " + oturum.kuyruk.length));
    parcalar.push(el("p", "soru", s.metin));

    const kontrol = dugme("ana-dugme", "Cevabı kontrol et", () => cevapla());
    kontrol.disabled = true;

    const liste = el("div", "secenekler");
    const secenekDugmeleri = [];
    for (const o of s.secenekler) {
      const b = dugme("secenek", o.id.toUpperCase() + ") " + o.metin, () => {
        secilen = o.id;
        for (const x of secenekDugmeleri) x.b.setAttribute("aria-pressed", String(x.id === o.id));
        kontrol.disabled = false;
      });
      b.setAttribute("aria-pressed", "false");
      secenekDugmeleri.push({ id: o.id, b });
      liste.appendChild(b);
    }
    parcalar.push(liste);

    const etiket = el("label", "emin");
    const kutucuk = document.createElement("input");
    kutucuk.type = "checkbox";
    etiket.appendChild(kutucuk);
    etiket.appendChild(document.createTextNode(" Emin değilim"));
    parcalar.push(etiket);
    parcalar.push(kontrol);
    goster(parcalar);

    function cevapla() {
      if (!secilen) return;
      const dogruMu = secilen === s.dogru;
      const emin = !kutucuk.checked;
      oturum.sonuclar.push({ id: s.id, secilen, dogru: dogruMu, emin });
      const sonucKodu = !dogruMu ? "yanlis" : (emin ? "dogru" : "dogru-emin-degil");
      const listedeydi = Depo.tekrarlar(icerik.id).some(o => o.soruId === s.id);
      const kayitTamam = Depo.kaydet(icerik.id, s.id, sonucKodu);
      if (!kayitTamam) oturum.kayitHatasi = true;

      for (const x of secenekDugmeleri) {
        x.b.disabled = true;
        if (x.id === s.dogru) {
          x.b.classList.add("dogru");
          x.b.appendChild(el("span", "isaret", "✓ Doğru cevap"));
        } else if (x.id === secilen) {
          x.b.classList.add("yanlis");
          x.b.appendChild(el("span", "isaret", "✗ Seçtiğin cevap"));
        }
      }
      kutucuk.disabled = true;
      kontrol.hidden = true;

      const dogruSecenek = s.secenekler.find(o => o.id === s.dogru);
      const secilenSecenek = s.secenekler.find(o => o.id === secilen);
      const gb = el("div", "geri-bildirim " + (dogruMu ? "iyi" : "kotu"));
      gb.appendChild(el("h2", "", dogruMu ? (emin ? "Doğru" : "Doğru, ama emin değildin") : "Yanlış"));

      if (!dogruMu) {
        gb.appendChild(el("h3", "", "Seçtiğin cevap neden yanlış?"));
        gb.appendChild(el("p", "", secilenSecenek.aciklama));
      }
      gb.appendChild(el("h3", "", "Doğru cevap: " + s.dogru.toUpperCase() + ") " + dogruSecenek.metin));
      gb.appendChild(el("p", "", dogruSecenek.aciklama));
      gb.appendChild(el("h3", "", "Temel bilgi"));
      gb.appendChild(el("p", "", s.temelBilgi));

      const diger = s.secenekler.filter(o => o.id !== s.dogru && o.id !== secilen);
      if (diger.length) {
        const det = document.createElement("details");
        det.open = !dogruMu;
        det.appendChild(el("summary", "", "Diğer seçenekler neden yanlış?"));
        for (const o of diger) det.appendChild(el("p", "", o.id.toUpperCase() + ") " + o.metin + " — " + o.aciklama));
        gb.appendChild(det);
      }

      gb.appendChild(kaynakKutusu(s.kaynakIds));

      if (!kayitTamam) {
        gb.appendChild(el("p", "not", "Bu tarayıcıda ilerleme kaydedilemedi (gizli sekme veya depolama kapalı olabilir)."));
      } else if (sonucKodu !== "dogru") {
        gb.appendChild(el("p", "not", "Bu soru tekrar listene eklendi. Ana ekrandan 'Yanlışlarım ve eksiklerim' ile çalışabilirsin."));
      } else if (listedeydi) {
        gb.appendChild(el("p", "not", "Emin olarak doğru bildin; bu soru tekrar listesinden çıkarıldı."));
      }
      if (!dogruMu && s.varyant && !oturum.kuyruk.includes(s.varyant)) {
        oturum.kuyruk.splice(oturum.i + 1, 0, s.varyant);
        gb.appendChild(el("p", "not", "Aynı bilgiyi farklı biçimde soran bir soru ekledim; sıradaki soru o."));
      }

      const son = oturum.i + 1 >= oturum.kuyruk.length;
      kok().appendChild(gb);
      kok().appendChild(dugme("ana-dugme", son ? "Sonucu gör" : "Sonraki soru", () => { oturum.i++; soruGoster(); }));
      gb.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }

  function sonucEkrani() {
    const r = oturum.sonuclar;
    const saglam = r.filter(x => x.dogru && x.emin).length;
    const eminDegil = r.filter(x => x.dogru && !x.emin).length;
    const yanlis = r.filter(x => !x.dogru).length;

    const parcalar = ust();
    parcalar.push(el("h2", "", "Oturum sonucu"));
    parcalar.push(el("p", "", "Emin olarak doğru: " + saglam));
    parcalar.push(el("p", "", "Doğru ama emin değildin: " + eminDegil));
    parcalar.push(el("p", "", "Yanlış: " + yanlis));

    const tekrar = r.filter(x => !x.dogru || !x.emin);
    if (tekrar.length) {
      parcalar.push(el("h2", "", "Tekrar edilecek bilgiler"));
      const ul = el("ul", "madde");
      for (const x of tekrar) {
        ul.appendChild(el("li", "", soruBul(x.id).baslik + (x.dogru ? " (doğru ama emin değildin)" : " (yanlış)")));
      }
      parcalar.push(ul);
    }
    parcalar.push(el("p", "not", oturum.kayitHatasi
      ? "İlerleme bu tarayıcıda kaydedilemedi."
      : "İlerlemen bu cihazın tarayıcısına kaydedildi."));
    if (tekrarModu) {
      if (Depo.tekrarlar(icerik.id).length) parcalar.push(dugme("ana-dugme", "Kalan tekrarları çöz", () => tekrarSorulariBaslat(icerik)));
    } else {
      parcalar.push(dugme("ana-dugme", "Soruları yeniden çöz", soruBaslat));
    }
    parcalar.push(dugme("ana-dugme ikincil", "Konu anlatımını oku", dersEkrani));
    parcalar.push(dugme("ana-dugme ikincil", "Ana ekrana dön", kapat));
    goster(parcalar);
  }

  return { ac, tekrar: tekrarAc };
})();