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

  $("basla").disabled = !(staj && durum.mod);
  $("sonuc").textContent = "";
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
  const staj = VERI.stajlar.find(s => s.id === durum.staj);
  const altdal = staj.altDallar.find(a => a.id === durum.altdal);
  const konu = altdal && altdal.konular.find(k => k.id === durum.konu);
  const mod = VERI.modlar.find(m => m.id === durum.mod);

  const icerik = konu && window.ICERIK && window.ICERIK[konu.id];
  if (icerik && (mod.id === "ogren" || mod.id === "test")) {
    Calisma.ac(icerik, mod.id, () => { $("sonuc").textContent = ""; });
    return;
  }

  let not;
  if (!konu) not = " Çalışmak için bir konu seç.";
  else if (!icerik) not = " Bu konu için örnek içerik henüz yok. Şu an yalnızca Genel Cerrahi › Akut batın › Akut apandisit hazır.";
  else not = " Bu mod için ekran henüz yok; şu an yalnızca 'Konu öğrenme' ve 'Çoktan seçmeli soru' çalışıyor.";

  $("sonuc").textContent =
    "Seçimin: " + staj.ad + " › " + (altdal ? altdal.ad : "tüm alt dallar") +
    " › " + (konu ? konu.ad : "tüm konular") + " · " + mod.ad + " · " +
    (durum.sure ? durum.sure + " dk" : "süresiz") + "." + not;
});

render();