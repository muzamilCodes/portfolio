// src/app/utils/frameEngine.ts
// Scroll-driven frame-sequence engine (2D canvas) — ported from the static template.
// - Plays frames/ sequence like a video as the user scrolls
// - Falls back to a cinematic dark-mode profile photo render when frames are missing
// - Drives scroll progress bar, typewriter role, active nav highlighting, mobile menu

export interface FrameEngineHandles {
  canvas: HTMLCanvasElement;
  progressBar: HTMLElement | null;
  framesNotice: HTMLElement | null;
  typedRoleEl: HTMLElement | null;
  yearEl: HTMLElement | null;
  navPillMenu: HTMLElement | null;
  mobileToggle: HTMLElement | null;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
}

export function startFrameEngine(handles: FrameEngineHandles): () => void {
  const { canvas, progressBar, framesNotice, typedRoleEl, yearEl, navPillMenu, mobileToggle } = handles;
  const context = canvas.getContext('2d');
  if (!context) return () => {};
  const ctx = context;

  const TOTAL_FRAMES = 192;
  const FRAME_PATH = '/frames/img_';

  const images: HTMLImageElement[] = [];
  let imagesLoadedCount = 0;
  let hasCustomFrames = false;
  let fallbackLoaded = false;
  let currentFrameIndex = 0;
  let targetFrameIndex = 0;
  let rafId = 0;

  const fallbackImage = new Image();
  let time = 0;
  let mouseX = 0;
  let mouseY = 0;
  let targetMouseX = 0;
  let targetMouseY = 0;

  function onMouseMove(e: MouseEvent) {
    targetMouseX = (e.clientX / window.innerWidth - 0.5) * 2;
    targetMouseY = (e.clientY / window.innerHeight - 0.5) * 2;
  }
  window.addEventListener('mousemove', onMouseMove, { passive: true });

  const particles: Particle[] = [];
  const PARTICLE_COUNT = 60;

  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  // ---------- Typewriter role in hero ----------
  const roles = [
    'Full Stack Developer',
    'MERN Stack Specialist',
    'React & Next.js Engineer',
    'REST API & Backend Architect',
    'MongoDB & PostgreSQL Developer',
  ];
  let roleIdx = 0;
  let charIdx = 0;
  let isDeleting = false;
  let typeTimer: ReturnType<typeof setTimeout>;

  function typeWriter() {
    if (!typedRoleEl) return;
    const currentRole = roles[roleIdx];
    charIdx = isDeleting ? charIdx - 1 : charIdx + 1;
    typedRoleEl.textContent = currentRole.substring(0, Math.max(charIdx, 0));

    let typingSpeed = isDeleting ? 40 : 80;
    if (!isDeleting && charIdx === currentRole.length) {
      typingSpeed = 2200;
      isDeleting = true;
    } else if (isDeleting && charIdx === 0) {
      isDeleting = false;
      roleIdx = (roleIdx + 1) % roles.length;
      typingSpeed = 400;
    }
    typeTimer = setTimeout(typeWriter, typingSpeed);
  }
  typeWriter();

  // ---------- Fallback subject image ----------
  fallbackImage.src = '/muzamil.jpg';
  fallbackImage.onload = () => {
    fallbackLoaded = true;
  };
  fallbackImage.onerror = () => {
    if (!fallbackImage.src.endsWith('/public/muzamil.jpg')) {
      fallbackImage.src = '/public/muzamil.jpg';
    }
  };

  // ---------- Canvas sizing (HiDPI) ----------
  function resizeCanvas() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    drawCurrentFrame();
  }

  // ---------- Preload frame sequence (probes first frame to avoid 192 failed requests) ----------
  function preloadFrames() {
    const probe = new Image();
    probe.src = `${FRAME_PATH}00001.jpg`;
    probe.onload = () => {
      hasCustomFrames = true;
      images[0] = probe;
      imagesLoadedCount = 1;
      if (framesNotice) framesNotice.classList.remove('show');
      drawCurrentFrame();

      for (let i = 2; i <= TOTAL_FRAMES; i++) {
        const img = new Image();
        const frameNum = String(i).padStart(5, '0');
        img.src = `${FRAME_PATH}${frameNum}.jpg`;
        img.onload = () => {
          imagesLoadedCount++;
        };
        images.push(img);
      }
    };
    probe.onerror = () => {
      hasCustomFrames = false;
    };
  }

  // ---------- Ambient particles (only when Three.js layer is NOT active) ----------
  for (let i = 0; i < PARTICLE_COUNT; i++) {
    particles.push({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      size: Math.random() * 2 + 1,
      alpha: Math.random() * 0.4 + 0.1,
    });
  }

  function drawImageCover(img: HTMLImageElement) {
    const cw = window.innerWidth;
    const ch = window.innerHeight;
    const iw = img.naturalWidth || img.width;
    const ih = img.naturalHeight || img.height;
    if (!iw || !ih) return;

    const scale = Math.max(cw / iw, ch / ih);
    const nw = iw * scale;
    const nh = ih * scale;
    const cx = (cw - nw) / 2;
    const cy = (ch - nh) / 2;
    ctx.drawImage(img, cx, cy, nw, nh);
  }

  // ---------- Full-screen cinematic video motion fallback ----------
  function renderFallback() {
    if (hasCustomFrames) return;

    const cw = window.innerWidth;
    const ch = window.innerHeight;
    time += 0.016;

    // Smooth mouse inertia tracking for interactive camera drift
    mouseX += (targetMouseX - mouseX) * 0.04;
    mouseY += (targetMouseY - mouseY) * 0.04;

    ctx.clearRect(0, 0, cw, ch);

    if (fallbackLoaded && fallbackImage.complete) {
      const img = fallbackImage;
      const iw = img.naturalWidth || img.width;
      const ih = img.naturalHeight || img.height;
      if (iw && ih) {
        // Scroll fraction for scroll-scrub video camera animation
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
        const scrollFrac = maxScroll > 0 ? Math.min(Math.max(scrollTop / maxScroll, 0), 1) : 0;

        // Continuous organic video camera motion: slow breathing zoom + drift + scroll tracking
        const organicZoom = 1.07 + 0.035 * Math.sin(time * 0.38) + scrollFrac * 0.06;
        const panX = Math.sin(time * 0.22) * 18 + mouseX * 24;
        const panY = Math.cos(time * 0.28) * 14 + mouseY * 18 - scrollFrac * 40;

        // Full-bleed cover scale: image covers the entire background completely
        const baseScale = Math.max(cw / iw, ch / ih);
        const finalScale = baseScale * organicZoom;
        const nw = iw * finalScale;
        const nh = ih * finalScale;
        const px = (cw - nw) / 2 + panX;
        const py = (ch - nh) / 2 + panY;

        ctx.save();
        ctx.drawImage(img, px, py, nw, nh);
        ctx.restore();

        // Atmospheric dark-mode film grading: preserves subject clarity while keeping text 100% readable
        const darkGrad = ctx.createLinearGradient(0, 0, 0, ch);
        darkGrad.addColorStop(0, 'rgba(7, 8, 12, 0.48)');
        darkGrad.addColorStop(0.4, 'rgba(7, 8, 12, 0.32)');
        darkGrad.addColorStop(0.75, 'rgba(7, 8, 12, 0.65)');
        darkGrad.addColorStop(1, 'rgba(7, 8, 12, 0.94)');
        ctx.fillStyle = darkGrad;
        ctx.fillRect(0, 0, cw, ch);

        // Radial vignette focusing on subject in center
        const radialVignette = ctx.createRadialGradient(
          cw / 2 + mouseX * 35,
          ch * 0.42 + mouseY * 25,
          Math.min(cw, ch) * 0.25,
          cw / 2,
          ch / 2,
          Math.max(cw, ch) * 0.75
        );
        radialVignette.addColorStop(0, 'rgba(0, 0, 0, 0)');
        radialVignette.addColorStop(0.7, 'rgba(5, 6, 10, 0.32)');
        radialVignette.addColorStop(1, 'rgba(5, 6, 10, 0.78)');
        ctx.fillStyle = radialVignette;
        ctx.fillRect(0, 0, cw, ch);

        // Anamorphic video light flare sweep across the screen
        const sweepPeriod = 8;
        const sweepProgress = (time % sweepPeriod) / sweepPeriod;
        if (sweepProgress < 0.4) {
          const sweepX = (sweepProgress / 0.4) * (cw + 500) - 250;
          const sweepGrad = ctx.createLinearGradient(sweepX - 120, 0, sweepX + 120, ch);
          sweepGrad.addColorStop(0, 'rgba(255, 30, 45, 0)');
          sweepGrad.addColorStop(0.5, 'rgba(255, 50, 70, 0.055)');
          sweepGrad.addColorStop(1, 'rgba(255, 30, 45, 0)');
          ctx.fillStyle = sweepGrad;
          ctx.fillRect(0, 0, cw, ch);
        }
      }
    } else {
      ctx.fillStyle = '#05060a';
      ctx.fillRect(0, 0, cw, ch);
    }

    // Ambient particles (skipped when the Three.js 3D layer is active)
    if (!window.__three3dActive) {
      particles.forEach((p, idx) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = cw;
        if (p.x > cw) p.x = 0;
        if (p.y < 0) p.y = ch;
        if (p.y > ch) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 30, 45, ${p.alpha})`;
        ctx.fill();

        for (let j = idx + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dist = Math.hypot(p.x - p2.x, p.y - p2.y);
          if (dist < 100) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(255, 255, 255, ${0.08 * (1 - dist / 100)})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      });
    }

    rafId = requestAnimationFrame(renderFallback);
  }

  // ---------- Frame drawing ----------
  function drawCurrentFrame() {
    const cw = window.innerWidth;
    const ch = window.innerHeight;

    if (hasCustomFrames && images[currentFrameIndex] && images[currentFrameIndex].complete) {
      ctx.clearRect(0, 0, cw, ch);
      drawImageCover(images[currentFrameIndex]);
    } else if (!hasCustomFrames && !fallbackLoaded) {
      ctx.fillStyle = '#05060a';
      ctx.fillRect(0, 0, cw, ch);
    }
  }

  // ---------- Smooth frame interpolation loop ----------
  function updateCanvasAnimation() {
    if (hasCustomFrames) {
      const diff = targetFrameIndex - currentFrameIndex;
      if (Math.abs(diff) > 0.05) {
        currentFrameIndex += diff * 0.2;
        const idx = Math.min(Math.max(Math.round(currentFrameIndex), 0), TOTAL_FRAMES - 1);
        if (images[idx] && images[idx].complete) {
          const cw = window.innerWidth;
          const ch = window.innerHeight;
          ctx.clearRect(0, 0, cw, ch);
          drawImageCover(images[idx]);
        }
      }
    }
    rafId = requestAnimationFrame(updateCanvasAnimation);
  }

  // ---------- Scroll: progress bar + frame mapping + active nav ----------
  const sections = Array.from(document.querySelectorAll<HTMLElement>('section[id]'));
  const navLinks = Array.from(document.querySelectorAll<HTMLElement>('.nav-link'));

  function updateActiveNav() {
    let currentId = 'hero';
    const scrollMid = window.scrollY + window.innerHeight * 0.35;
    const isBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 60;

    if (isBottom) {
      currentId = 'contact';
    } else {
      sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        if (scrollMid >= sectionTop && scrollMid < sectionTop + sectionHeight) {
          currentId = section.getAttribute('id') || 'hero';
        }
      });
    }

    navLinks.forEach((link) => {
      const href = (link.getAttribute('href') || '').replace('#', '');
      if (href === currentId) link.classList.add('active');
      else link.classList.remove('active');
    });
  }

  function onScroll() {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    const scrollFraction = maxScroll > 0 ? Math.min(Math.max(scrollTop / maxScroll, 0), 1) : 0;

    if (progressBar) progressBar.style.width = `${scrollFraction * 100}%`;
    targetFrameIndex = Math.floor(scrollFraction * (TOTAL_FRAMES - 1));
    updateActiveNav();
  }

  // ---------- Mobile menu ----------
  function onMenuToggle() {
    if (!navPillMenu || !mobileToggle) return;
    navPillMenu.classList.toggle('mobile-open');
    const isOpen = navPillMenu.classList.contains('mobile-open');
    mobileToggle.innerHTML = isOpen
      ? '<i class="fa-solid fa-xmark"></i> <span>Close</span>'
      : '<i class="fa-solid fa-bars"></i> <span>Menu</span>';
  }

  function onNavLinkClick() {
    if (navPillMenu && mobileToggle && navPillMenu.classList.contains('mobile-open')) {
      navPillMenu.classList.remove('mobile-open');
      mobileToggle.innerHTML = '<i class="fa-solid fa-bars"></i> <span>Menu</span>';
    }
  }

  // ---------- Init ----------
  resizeCanvas();
  preloadFrames();
  updateCanvasAnimation();
  renderFallback();
  updateActiveNav();

  window.addEventListener('resize', resizeCanvas);
  window.addEventListener('scroll', onScroll, { passive: true });
  mobileToggle?.addEventListener('click', onMenuToggle);
  navLinks.forEach((link) => link.addEventListener('click', onNavLinkClick));

  // ---------- Cleanup ----------
  return () => {
    cancelAnimationFrame(rafId);
    clearTimeout(typeTimer);
    window.removeEventListener('mousemove', onMouseMove);
    window.removeEventListener('resize', resizeCanvas);
    window.removeEventListener('scroll', onScroll);
    mobileToggle?.removeEventListener('click', onMenuToggle);
    navLinks.forEach((link) => link.removeEventListener('click', onNavLinkClick));
  };
}