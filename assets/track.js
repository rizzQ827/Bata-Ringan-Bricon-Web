/* ============================================================================
   BRICON — pelacak perilaku pengunjung (dipakai index.html & semua kota/*.html)

   Yang dicatat ke Google Analytics 4 (G-8MHNWYQ1HF):
   - scroll_depth     : pengunjung sudah scroll 25 / 50 / 75 / 90 / 100 %
   - lihat_section    : section mana saja yang benar-benar dilihat (≥ 1 detik)
   - waktu_aktif      : sudah aktif membaca 15 / 30 / 60 / 120 / 300 detik
   - keluar_halaman   : saat menutup / pindah tab — scroll terjauh, section
                        terakhir, dan lama aktif. Inilah "sampai mana dia keluar".
   - buka_faq         : pertanyaan FAQ yang dibuka
   - klik_telepon, klik_maps, klik_kota : klik penting selain WhatsApp
   (Klik WhatsApp & form sudah dicatat sendiri: whatsapp_click, wa_form_buka,
    wa_form_kirim + konversi Google Ads.)

   Microsoft Clarity (rekaman layar & heatmap, gratis):
   isi CLARITY_ID di bawah dengan Project ID dari clarity.microsoft.com.
   Selama masih kosong, Clarity tidak dimuat dan tidak ada yang rusak.
   ============================================================================ */
(function () {
  'use strict';

  var CLARITY_ID = 'ziww63a1qg';

  function kirim(nama, data) {
    if (typeof window.gtag !== 'function') return;
    data = data || {};
    data.kota = window.BRICON_KOTA || 'lain';
    window.gtag('event', nama, data);
  }

  /* ---------- Microsoft Clarity ---------- */
  if (CLARITY_ID) {
    (function (c, l, a, r, i, t, y) {
      c[a] = c[a] || function () { (c[a].q = c[a].q || []).push(arguments); };
      t = l.createElement(r); t.async = 1; t.src = 'https://www.clarity.ms/tag/' + i;
      y = l.getElementsByTagName(r)[0]; y.parentNode.insertBefore(t, y);
    })(window, document, 'clarity', 'script', CLARITY_ID);
    window.clarity('set', 'kota', window.BRICON_KOTA || 'lain');
  }
  function tagClarity(k, v) { if (typeof window.clarity === 'function') window.clarity('set', k, String(v)); }

  /* ---------- Scroll depth ---------- */
  var batas = [25, 50, 75, 90, 100], terkirim = {}, scrollMaks = 0;
  function cekScroll() {
    var d = document.documentElement;
    var tinggi = Math.max(d.scrollHeight - window.innerHeight, 1);
    var persen = Math.min(100, Math.round((window.scrollY || d.scrollTop) / tinggi * 100));
    if (persen > scrollMaks) scrollMaks = persen;
    for (var i = 0; i < batas.length; i++) {
      var b = batas[i];
      if (scrollMaks >= b && !terkirim[b]) { terkirim[b] = 1; kirim('scroll_depth', { persen: b }); tagClarity('scroll_maks', b); }
    }
  }
  var antre = false;
  window.addEventListener('scroll', function () {
    if (antre) return; antre = true;
    requestAnimationFrame(function () { antre = false; cekScroll(); });
  }, { passive: true });

  /* ---------- Section yang dilihat ---------- */
  var sectionTerakhir = 'hero', dilihat = {}, timer = {};
  function namaSection(el) { return el.id || el.getAttribute('aria-label') || el.className.split(' ')[0]; }
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        var n = namaSection(e.target);
        if (e.isIntersecting) {
          sectionTerakhir = n;
          if (dilihat[n]) return;
          timer[n] = setTimeout(function () {
            dilihat[n] = 1;
            kirim('lihat_section', { section: n });
          }, 1000);
        } else if (timer[n]) { clearTimeout(timer[n]); timer[n] = null; }
      });
    }, { threshold: 0.35 });
    document.querySelectorAll('main section, section[id], footer').forEach(function (el) {
      if (!el.hidden) io.observe(el);
    });
  }

  /* ---------- Waktu aktif (hanya dihitung saat tab terlihat) ---------- */
  var aktifDetik = 0, tandaWaktu = [15, 30, 60, 120, 300], waktuTerkirim = {};
  setInterval(function () {
    if (document.visibilityState !== 'visible') return;
    aktifDetik++;
    for (var i = 0; i < tandaWaktu.length; i++) {
      var t = tandaWaktu[i];
      if (aktifDetik === t && !waktuTerkirim[t]) { waktuTerkirim[t] = 1; kirim('waktu_aktif', { detik: t }); }
    }
  }, 1000);

  /* ---------- Saat keluar / pindah tab ---------- */
  var sudahKeluar = false;
  function keluar() {
    if (sudahKeluar) return; sudahKeluar = true;
    kirim('keluar_halaman', {
      scroll_maks: scrollMaks,
      section_terakhir: sectionTerakhir,
      detik_aktif: aktifDetik,
      transport_type: 'beacon'
    });
  }
  document.addEventListener('visibilitychange', function () {
    if (document.visibilityState === 'hidden') keluar();
    else sudahKeluar = false;   // balik lagi ke tab: boleh dicatat lagi nanti
  });
  window.addEventListener('pagehide', keluar);

  /* ---------- Klik penting ---------- */
  document.addEventListener('click', function (ev) {
    var faq = ev.target.closest && ev.target.closest('.faq-trigger');
    if (faq && faq.getAttribute('aria-expanded') === 'false') {
      var q = faq.querySelector('.faq-q');
      kirim('buka_faq', { pertanyaan: q ? q.textContent.trim().slice(0, 95) : '' });
      return;
    }
    var a = ev.target.closest && ev.target.closest('a[href]');
    if (!a) return;
    var href = a.getAttribute('href');
    if (/^tel:/.test(href)) kirim('klik_telepon', {});
    else if (/maps\.app\.goo\.gl|google\.[a-z.]+\/maps/.test(href)) kirim('klik_maps', {});
    else if (/\/kota\//.test(href)) kirim('klik_kota', { tujuan: href.replace(/.*\/kota\//, '') });
  }, true);
})();
