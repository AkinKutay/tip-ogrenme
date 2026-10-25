const durum = { staj: null, altdal: null, konu: null, mod: null, sure: null };
const $ = id => document.getElementById(id);

function dugme(sinif, metin, aciklama, secili, tikla) {
  const b = document.createElement("button");
  b.type = "button";
  b.className = sinif;
  b.textContent = metin;
  if (aciklama) {
    const s = document.createElement("span");
    s.textContent = aciklama;
    b.appendChild(s);
  }
  b.setAttribute("aria-pressed", String(secili));
  b.addEventListener("click", tikla);
  return b;
}

const sec = (alan, deger) => { durum[alan] = durum[alan] === deger ? null : deger; };

function ilerlemeYaz() {
  const o = Depo.ozet();
  $("ilerlemeOzet").textContent = o.cozulen
    ? "İlerleme: " + o.cozulen + " soru çözüldü · " + o.tekrar + " soru tekrar bekliyor."
    : "Henüz soru çözmedin.";
}

function render() {
  const staj = VERI.stajlar.find(s => s.id === durum.staj);
  const altdal = staj && staj.altDallar.find(a => a.id === durum.altdal);

  $("staj").replaceChildren(...VERI.stajlar.map(s =>
    dugme("chip", s.ad, "", s.id === durum.staj, () => {
      sec("staj", s.id); durum.altdal = null; durum.konu = null; render();
    })));

  $("altdalBolum").hidden = !staj;
  $("altdal").replaceChildren(...(staj ? staj.altDallar : []).map(a =>
    dugme("chip", a.ad, "", a.id === durum.altdal, () => {
      sec("altdal", a.id); durum.konu = null; render();
    })));

  $("konuBolum").hidden = !altdal;
  $("konu").replaceChildren(...(altdal ? altdal.konular : []).map(k =>
    dugme("chip", k.ad, "", k.id === durum.konu, () => { sec("konu", k.id); render(); })));

  $("mod").replaceChildren(...VERI.modlar.map(m =>
    dugme("kart", m.ad, m.aciklama, m.id === durum.mod, () => { sec("mod", m.id); render(); })));

  $("sure").replaceChildren(...VERI.sureler.map(d =>
    dugme("chip", d + " dk", "", d === durum.sure, () => { sec("sure", d); render(); })));

  $("basla").disabled = !(durum.mod && (durum.mod === "yanlis" || staj));
  $("sonuc").textContent = "";
  ilerlemeYaz();
}

$("ara").addEventListener("input", () => {
  const q = $("ara").value.trim().toLocaleLowerCase("tr");
  const liste = $("aramaSonuc");
  if (!q) { liste.replaceChildren(); return; }
  const bulunan = [];
  for (const s of VERI.stajlar)
    for (const a of s.altDallar)
      for (const k of a.konular)
        if (k.ad.toLocaleLowerCase("tr").includes(q)) bulunan.push({ s, a, k });
  if (!bulunan.length) { liste.textContent = "Sonuç bulunamadı."; return; }
  liste.replaceChildren(...bulunan.map(({ s, a, k }) =>
    dugme("chip", k.ad + " — " + s.ad + " › " + a.ad, "", false, () => {
      Object.assign(durum, { staj: s.id, altdal: a.id, konu: k.id });
      $("ara").value = "";
      liste.replaceChildren();
      render();
    })));
});

$("basla").addEventListener("click", () => {
  const mod = VERI.modlar.find(m => m.id === durum.mod);
  if (mod.id === "yanlis") {
    Calisma.tekrar(window.ICERIK || {}, render);
    return;
  }

  const staj = VERI.stajlar.find(s => s.id === durum.staj);
  const altdal = staj.altDallar.find(a => a.id === durum.altdal);
  const konu = altdal && altdal.konular.find(k => k.id === durum.konu);

  const icerik = konu && window.ICERIK && window.ICERIK[konu.id];
  if (icerik && (mod.id === "ogren" || mod.id === "test")) {
    Calisma.ac(icerik, mod.id, render);
    return;
  }

  let not;
  if (!konu) not = " Çalışmak için bir konu seç.";
  else if (!icerik) not = " Bu konu için örnek içerik henüz yok. Şu an yalnızca Genel Cerrahi › Akut batın › Akut apandisit hazır.";
  else not = " Bu mod için ekran henüz yok; şu an 'Konu öğrenme', 'Çoktan seçmeli soru' ve 'Yanlışlarım ve eksiklerim' çalışıyor.";

  $("sonuc").textContent =
    "Seçimin: " + staj.ad + " › " + (altdal ? altdal.ad : "tüm alt dallar") +
    " › " + (konu ? konu.ad : "tüm konular") + " · " + mod.ad + " · " +
    (durum.sure ? durum.sure + " dk" : "süresiz") + "." + not;
});

$("sifirla").addEventListener("click", () => {
  if (!confirm("Tüm ilerleme (çözülen sorular ve tekrar listesi) silinsin mi? Bu geri alınamaz.")) return;
  Depo.sifirla();
  render();
});

// Çevrimdışı kullanım durumu
let cevrimdisiHazir = false;
function cevrimdisiYaz() {
  const e = $("cevrimdisi");
  if (!("serviceWorker" in navigator)) { e.textContent = "Bu tarayıcı çevrimdışı kullanımı desteklemiyor."; return; }
  if (!cevrimdisiHazir) { e.textContent = "Çevrimdışı kullanım hazırlanıyor…"; return; }
  e.textContent = "Çevrimdışı kullanıma hazır ✓" + (navigator.onLine ? "" : " · şu an çevrimdışısın");
}

if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("./sw.js")
    .then(() => navigator.serviceWorker.ready)
    .then(() => { cevrimdisiHazir = true; cevrimdisiYaz(); })
    .catch(() => { $("cevrimdisi").textContent = "Çevrimdışı mod kurulamadı; internet varken normal çalışır."; });
}
window.addEventListener("online", cevrimdisiYaz);
window.addEventListener("offline", cevrimdisiYaz);

render();
cevrimdisiYaz();