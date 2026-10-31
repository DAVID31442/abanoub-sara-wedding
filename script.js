/**
 * Kerolos & Mera - Luxury Royal Wedding Invitation Web App
 * Interactive Logic, Envelope Physics, Audio Control, Calendar & Wishes
 */

// Wedding Data Model (Matching ChungDoi exact details with customizable capabilities)
const weddingConfig = {
  groom: {
    name: "Kerolos",
    fullName: "Kerolos Anwar Helmy",
    father: "Mr. Anwar Helmy",
    nameAr: "كيرلس",
    fullNameAr: "كيرلس أنور حلمي",
    fatherAr: "الأستاذ أنور حلمي"
  },
  bride: {
    name: "Mera",
    fullName: "Mera Nashaat Yosef",
    father: "Mr. Nashaat Yosef",
    nameAr: "ميرا",
    fullNameAr: "ميرا نشأت يوسف",
    fatherAr: "الأستاذ نشأت يوسف"
  },
  date: "2026-08-30",
  time: "20:00",
  timezone: "Africa/Cairo",
  church: {
    en: "St. Michael the Archangel Church – Girga",
    ar: "كنيسة رئيس الملائكة ميخائيل – جرجا"
  },
  reception: {
    en: "Golden Palace Hall",
    ar: "قاعة القصر الذهبي"
  },
  fullAddress: {
    en: "St. Michael the Archangel Church – Girga\nReception to follow at Golden Palace Hall",
    ar: "كنيسة رئيس الملائكة ميخائيل بجرجا\nوحفل الاستقبال بقاعة القصر الذهبي"
  },
  googleMapsUrl: "https://www.google.com/maps/place/%D9%82%D8%A7%D8%B9%D8%A9+%D8%A7%D9%84%D9%82%D8%B5%D8%B1+%D8%A7%D9%84%D8%B0%D9%87%D8%A8%D9%8A%E2%80%AD/@26.3493954,31.885048,17z/data=!3m1!4b1!4m6!3m5!1s0x144f4fbf26509575:0x24fc2f2064b39300!8m2!3d26.3493906!4d31.8876229!16s%2Fg%2F11ts4cj0v_?hl=en-US",
  music: "assets/music/perfect.mp3",
  gallery: [
    "assets/images/gallery-1.jpg",
    "assets/images/gallery-2.jpg",
    "assets/images/gallery-3.jpg",
    "assets/images/gallery-4.jpg",
    "assets/images/gallery-5.jpg",
    "assets/images/gallery-6.jpg"
  ]
};

let currentLang = 'en';
let audioPlaying = false;
let currentLightboxIdx = 0;

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  initAmbientParticles();
  initEnvelope();
  initAudio();
  initCountdown();
  initCalendar();
  initGallery();
  initRSVP();
  initWishes();
  initCustomizer();
});

/* ---------------- Ambient Particles Effect ---------------- */
function initAmbientParticles() {
  const container = document.getElementById('ambient-container');
  if (!container) return;

  const colors = ['#d4af37', '#e8c85a', '#ffffff', '#e06b7a', '#c4273b'];
  const particleCount = 28;

  for (let i = 0; i < particleCount; i++) {
    const p = document.createElement('div');
    p.className = 'ambient-particle';
    const size = Math.random() * 6 + 4;
    p.style.width = `${size}px`;
    p.style.height = `${size}px`;
    p.style.left = `${Math.random() * 100}vw`;
    p.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    p.style.boxShadow = `0 0 ${size * 2}px ${p.style.backgroundColor}`;
    
    // Heart or petal shapes for some
    if (Math.random() > 0.5) {
      p.style.borderRadius = '50% 0 50% 50%';
    }

    const duration = Math.random() * 10 + 8;
    const delay = Math.random() * 10;
    const isRising = Math.random() > 0.5;

    p.style.setProperty('--sway', `${(Math.random() - 0.5) * 60}px`);
    p.style.animation = `${isRising ? 'ambient-rise' : 'ambient-fall'} ${duration}s linear infinite ${delay}s`;

    container.appendChild(p);
  }
}

/* ---------------- Interactive Wax Seal & Envelope Opening ---------------- */
function initEnvelope() {
  const overlay = document.getElementById('envelope-overlay');
  const waxSeal = document.getElementById('wax-seal');
  const sealRing = document.getElementById('wax-seal-ring');
  const wrapper = document.querySelector('.envelope-wrapper');

  if (!waxSeal || !overlay) return;

  const triggerOpen = () => {
    if (waxSeal.classList.contains('breaking')) return;

    // 1. Play seal break sound (synthesized audio context chime/click)
    playChimeSound();

    // 2. Animate wax seal cracking and pulse ring
    waxSeal.classList.add('breaking');
    if (sealRing) sealRing.classList.add('active');

    // 3. Create bursting particles
    const rect = waxSeal.getBoundingClientRect();
    createBurstParticles(rect.left + rect.width / 2, rect.top + rect.height / 2);

    // 4. Start background music automatically
    const audio = document.getElementById('bg-music');
    if (audio) {
      audio.play().then(() => {
        audioPlaying = true;
        updateMusicButton();
      }).catch(e => console.log('Audio autoplay prevented:', e));
    }

    // 5. Envelope unrolls / glides away smoothly
    setTimeout(() => {
      overlay.classList.add('opened');
      document.body.style.overflow = 'auto';
    }, 650);
  };

  waxSeal.addEventListener('click', (e) => {
    e.stopPropagation();
    triggerOpen();
  });

  if (wrapper) {
    wrapper.addEventListener('click', triggerOpen);
  }
}

function createBurstParticles(x, y) {
  const container = document.body;
  const particleCount = 36;
  const colors = ['#d4af37', '#fdf4dc', '#9e1b2b', '#ffffff', '#e85d75'];

  for (let i = 0; i < particleCount; i++) {
    const p = document.createElement('div');
    p.className = 'burst-particle';
    const size = Math.random() * 10 + 6;
    p.style.width = `${size}px`;
    p.style.height = `${size}px`;
    p.style.left = `${x}px`;
    p.style.top = `${y}px`;
    p.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    p.style.boxShadow = `0 0 10px ${p.style.backgroundColor}`;

    const angle = (Math.PI * 2 * i) / particleCount + (Math.random() - 0.5) * 0.5;
    const distance = Math.random() * 160 + 80;
    const dx = Math.cos(angle) * distance;
    const dy = Math.sin(angle) * distance;

    p.style.setProperty('--dx', `${dx}px`);
    p.style.setProperty('--dy', `${dy}px`);
    p.style.setProperty('--rot-start', `${Math.random() * 60 - 30}deg`);
    p.style.setProperty('--rot-end', `${Math.random() * 360}deg`);

    container.appendChild(p);
    setTimeout(() => p.remove(), 1000);
  }
}

function playChimeSound() {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(587.33, ctx.currentTime); // D5
    osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.15); // A5
    osc.frequency.exponentialRampToValueAtTime(1174.66, ctx.currentTime + 0.35); // D6
    gain.gain.setValueAtTime(0.3, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.6);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.65);
  } catch (e) {
    // AudioContext not allowed or supported
  }
}

/* ---------------- Audio Music Player ---------------- */
function initAudio() {
  const audio = document.getElementById('bg-music');
  const btn = document.getElementById('music-toggle-btn');
  if (!audio || !btn) return;

  btn.addEventListener('click', () => {
    if (audio.paused) {
      audio.play().then(() => {
        audioPlaying = true;
        updateMusicButton();
      });
    } else {
      audio.pause();
      audioPlaying = false;
      updateMusicButton();
    }
  });
}

function updateMusicButton() {
  const btn = document.getElementById('music-toggle-btn');
  if (!btn) return;
  if (audioPlaying) {
    btn.classList.add('playing');
    btn.innerHTML = `
      <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>
      </svg>`;
  } else {
    btn.classList.remove('playing');
    btn.innerHTML = `
      <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
        <path d="M4.27 3L3 4.27l9 9v.28c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4v-1.73l4.27 4.27L19.54 18l-7.54-7.54V7h4V3h-6v4.73L4.27 3z"/>
      </svg>`;
  }
}

/* ---------------- Countdown Timer ---------------- */
function initCountdown() {
  const targetDate = new Date(`${weddingConfig.date}T${weddingConfig.time}:00+02:00`).getTime();

  function update() {
    const now = new Date().getTime();
    const diff = targetDate - now;

    if (diff <= 0) {
      document.getElementById('days').innerText = '00';
      document.getElementById('hours').innerText = '00';
      document.getElementById('minutes').innerText = '00';
      document.getElementById('seconds').innerText = '00';
      return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    const pad = (n) => (n < 10 ? '0' + n : n);

    document.getElementById('days').innerText = pad(days);
    document.getElementById('hours').innerText = pad(hours);
    document.getElementById('minutes').innerText = pad(minutes);
    document.getElementById('seconds').innerText = pad(seconds);
  }

  update();
  setInterval(update, 1000);
}

/* ---------------- Calendar Widget ---------------- */
function initCalendar() {
  const container = document.getElementById('calendar-grid');
  if (!container) return;

  // August 2026: starts on Saturday (1st)
  // Mo Tu We Th Fr Sa Su
  //              1  2
  // Days in August: 31
  // Saturday is column index 5 (0-based: Mo=0, Tu=1, We=2, Th=3, Fr=4, Sa=5, Su=6)
  const emptyCellsBefore = 5; 
  const totalDays = 31;
  const weddingDay = 30; // Sunday

  container.innerHTML = '';

  for (let i = 0; i < emptyCellsBefore; i++) {
    const empty = document.createElement('div');
    empty.className = 'calendar-cell empty';
    container.appendChild(empty);
  }

  for (let day = 1; day <= totalDays; day++) {
    const cell = document.createElement('div');
    cell.className = 'calendar-cell';
    cell.innerText = day;
    if (day === weddingDay) {
      cell.classList.add('wedding-day');
      cell.title = "Wedding Day!";
    }
    container.appendChild(cell);
  }
}

/* ---------------- Add to Calendar (.ics & Google Calendar) ---------------- */
window.addToCalendar = function(type) {
  const title = "Wedding of Kerolos & Mera";
  const desc = "We joyfully invite you to celebrate the wedding of Kerolos & Mera at St. Michael Church Girga and Golden Palace Hall";
  const location = "Golden Palace Hall, Girga, Sohag, Egypt";
  const startIso = "20260830T180000Z"; // 8:00 PM Cairo (UTC+2) is 18:00 UTC
  const endIso = "20260830T230000Z";

  if (type === 'google') {
    const url = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(title)}&dates=${startIso}/${endIso}&details=${encodeURIComponent(desc)}&location=${encodeURIComponent(location)}`;
    window.open(url, '_blank');
  } else {
    // Generate .ics file download
    const icsContent = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//Kerolos & Mera Wedding//EN",
      "CALSCALE:GREGORIAN",
      "BEGIN:VEVENT",
      `SUMMARY:${title}`,
      `DESCRIPTION:${desc}`,
      `LOCATION:${location}`,
      `DTSTART:${startIso}`,
      `DTEND:${endIso}`,
      "STATUS:CONFIRMED",
      "END:VEVENT",
      "END:VCALENDAR"
    ].join("\r\n");

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', 'Kerolos_and_Mera_Wedding.ics');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
};

/* ---------------- Photo Gallery Lightbox ---------------- */
function initGallery() {
  const cards = document.querySelectorAll('.gallery-card');
  const modal = document.getElementById('lightbox-modal');
  const lightboxImg = document.getElementById('lightbox-img');
  const closeBtn = document.querySelector('.lightbox-close');
  const prevBtn = document.querySelector('.lightbox-arrow.prev');
  const nextBtn = document.querySelector('.lightbox-arrow.next');

  cards.forEach((card, index) => {
    card.addEventListener('click', () => {
      currentLightboxIdx = index;
      openLightbox();
    });
  });

  function openLightbox() {
    lightboxImg.src = weddingConfig.gallery[currentLightboxIdx];
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
  }

  function prevImg() {
    currentLightboxIdx = (currentLightboxIdx - 1 + weddingConfig.gallery.length) % weddingConfig.gallery.length;
    lightboxImg.src = weddingConfig.gallery[currentLightboxIdx];
  }

  function nextImg() {
    currentLightboxIdx = (currentLightboxIdx + 1) % weddingConfig.gallery.length;
    lightboxImg.src = weddingConfig.gallery[currentLightboxIdx];
  }

  if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
  if (prevBtn) prevBtn.addEventListener('click', prevImg);
  if (nextBtn) nextBtn.addEventListener('click', nextImg);

  // Keyboard controls
  document.addEventListener('keydown', (e) => {
    if (!modal.classList.contains('active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') prevImg();
    if (e.key === 'ArrowRight') nextImg();
  });

  // Close when tapping backdrop
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeLightbox();
  });
}

/* ---------------- Interactive RSVP Form ---------------- */
function initRSVP() {
  const form = document.getElementById('rsvp-form');
  const statusMsg = document.getElementById('rsvp-status');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const guestName = document.getElementById('rsvp-name').value.trim();
    const guestsCount = document.getElementById('rsvp-count').value;
    const attending = document.querySelector('input[name="attendance"]:checked').value;
    const note = document.getElementById('rsvp-note').value.trim();

    const rsvpEntry = {
      guestName,
      guestsCount,
      attending,
      note,
      timestamp: new Date().toISOString()
    };

    // Save to localStorage
    const saved = JSON.parse(localStorage.getItem('wedding_rsvps') || '[]');
    saved.push(rsvpEntry);
    localStorage.setItem('wedding_rsvps', JSON.stringify(saved));

    // Show success message
    statusMsg.innerText = currentLang === 'ar' 
      ? 'شكراً جزيلاً! تم تأكيد حضوركم بنجاح.' 
      : 'Thank you! Your RSVP has been received successfully.';
    statusMsg.style.display = 'block';
    statusMsg.style.color = '#721626';

    form.reset();
    setTimeout(() => {
      statusMsg.style.display = 'none';
    }, 4000);
  });
}

/* ---------------- Guestbook / Wishes Wall ---------------- */
function initWishes() {
  const form = document.getElementById('wishes-form');
  const feed = document.getElementById('wishes-feed');
  if (!form || !feed) return;

  // Default warm blessings
  const defaultWishes = [
    { name: "Mina & Marina", text: "الف مبروك يا كيرلس ويا ميرا ربنا يتمملكم على خير ويسعدكم دايماً!", time: "2 hours ago" },
    { name: "George Safwat", text: "Congratulations Kerolos & Mera! Wishing you a lifetime of endless love, joy, and peace.", time: "5 hours ago" },
    { name: "Uncle Youhanna", text: "ألف مليون مبروك لأجمل عروسين، بالرفاء والبنين وبركة صلوات القديسين.", time: "1 day ago" }
  ];

  const localWishes = JSON.parse(localStorage.getItem('wedding_wishes') || '[]');
  const allWishes = [...localWishes, ...defaultWishes];

  function renderWishes() {
    feed.innerHTML = '';
    allWishes.forEach(item => {
      const el = document.createElement('div');
      el.className = 'wish-item';
      el.innerHTML = `
        <div class="wish-author">${escapeHtml(item.name)} <span style="color:#d4af37">♥</span></div>
        <div class="wish-text">${escapeHtml(item.text)}</div>
        <div class="wish-time">${item.time}</div>
      `;
      feed.appendChild(el);
    });
  }

  renderWishes();

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const nameInput = document.getElementById('wish-name');
    const msgInput = document.getElementById('wish-message');

    const newWish = {
      name: nameInput.value.trim(),
      text: msgInput.value.trim(),
      time: currentLang === 'ar' ? 'الآن' : 'Just now'
    };

    allWishes.unshift(newWish);
    localWishes.unshift(newWish);
    localStorage.setItem('wedding_wishes', JSON.stringify(localWishes));

    renderWishes();
    form.reset();
  });
}

function escapeHtml(text) {
  const map = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' };
  return text.replace(/[&<>"']/g, m => map[m]);
}

/* ---------------- Bilingual Language Switcher (EN / AR) ---------------- */
window.toggleLanguage = function() {
  currentLang = currentLang === 'en' ? 'ar' : 'en';
  document.documentElement.setAttribute('dir', currentLang === 'ar' ? 'rtl' : 'ltr');
  document.documentElement.setAttribute('lang', currentLang);

  const langBtn = document.getElementById('lang-toggle-btn');
  if (langBtn) {
    langBtn.innerText = currentLang === 'en' ? 'العربية' : 'English';
  }

  // Update text content with data-en and data-ar attributes
  document.querySelectorAll('[data-en]').forEach(el => {
    el.innerText = el.getAttribute(`data-${currentLang}`) || el.getAttribute('data-en');
  });
};

/* ---------------- Live Customizer Drawer ---------------- */
function initCustomizer() {
  const drawer = document.getElementById('customizer-drawer');
  const toggleBtn = document.getElementById('customizer-toggle-btn');
  const closeBtn = document.getElementById('customizer-close-btn');

  if (toggleBtn && drawer) {
    toggleBtn.addEventListener('click', () => drawer.classList.toggle('active'));
  }
  if (closeBtn && drawer) {
    closeBtn.addEventListener('click', () => drawer.classList.remove('active'));
  }
}
