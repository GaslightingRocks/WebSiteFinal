/* =============================================================
   main.js – Alcedo Media
   Struktur:
   1.  Galerie-Video: Hover Play/Pause
   2.  YouTube-Modal: Öffnen & Schließen
   3.  Bild-Lightbox: Öffnen & Schließen
   4.  Hamburger-Menü: Toggle
   5.  Galerie: Rechtsklick sperren
   ============================================================= */

document.addEventListener('DOMContentLoaded', () => {


  /* ── 1. Galerie-Video: Hover Play / Pause ───────────────── */

  document.querySelectorAll('.gallery-item-wrapper').forEach(wrapper => {
    const video = wrapper.querySelector('video');
    if (!video) return;

    wrapper.addEventListener('mouseenter', () => video.play());
    wrapper.addEventListener('mouseleave', () => {
      video.pause();
      video.currentTime = 0;
    });
  });


  /* ── 2. YouTube-Modal ───────────────────────────────────── */

  const youtubeModal  = document.getElementById('youtube-modal');
  const youtubeIframe = document.getElementById('youtube-iframe');
  const youtubeClose  = document.querySelector('.close-btn');

  // Modal öffnen beim Klick auf einen Youtube-Link
  document.querySelectorAll('.youtube-link').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const videoId = link.getAttribute('data-youtube');
      youtubeIframe.src = `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1`;
      youtubeModal.style.display = 'flex';
    });
  });

  const closeYoutubeModal = () => {
    youtubeModal.style.display = 'none';
    youtubeIframe.src = ''; // Wichtig: Audio stoppen
  };

  youtubeClose.addEventListener('click', closeYoutubeModal);
  youtubeModal.addEventListener('click', (e) => {
    if (e.target === youtubeModal) closeYoutubeModal();
  });


  /* ── 3. Bild-Lightbox ───────────────────────────────────── */

  const lightbox        = document.getElementById('image-lightbox');
  const lightboxImg     = document.getElementById('lightbox-img');
  const lightboxCaption = document.getElementById('lightbox-caption');
  const lightboxClose   = document.querySelector('.lightbox-close');

  // Lightbox öffnen beim Klick/Tap auf ein Bild-Item
  document.querySelectorAll('.gallery-item-wrapper.image-item').forEach(item => {
    item.addEventListener('click', () => {
      const img = item.querySelector('img');
      lightboxImg.src     = img.src;
      lightboxImg.alt     = img.alt;
      lightboxCaption.textContent = item.getAttribute('data-caption') || '';
      lightbox.classList.add('active');
      document.body.style.overflow = 'hidden'; // Scrollen sperren
    });
  });

  const closeLightbox = () => {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  };

  lightboxClose.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });


  /* ── 4. ESC-Taste schließt alle Modals ──────────────────── */

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeLightbox();
      closeYoutubeModal();
    }
  });


  /* ── 5. Hamburger-Menü ──────────────────────────────────── */

  const hamburger = document.getElementById('hamburger');
  const nav       = document.getElementById('nav');

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    nav.classList.toggle('open');
  });

  // Menü schließen, wenn ein Link angeklickt wird
  nav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      nav.classList.remove('open');
    });
  });


  /* ── 6. Galerie: Rechtsklick sperren ────────────────────── */

  document.addEventListener('contextmenu', (e) => {
    if (e.target.closest('.gallery')) e.preventDefault();
  });


}); // Ende DOMContentLoaded