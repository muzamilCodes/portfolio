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

  // ---------- Full-image subject view with video-like animation & ambient extension ----------
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

        // Continuous organic video camera motion: gentle breathing zoom + cinematic drift
        const breathing = 1.0 + 0.025 * Math.sin(time * 0.38);
        const panX = Math.sin(time * 0.22) * 14 + mouseX * 20;
        const panY = Math.cos(time * 0.28) * 10 + mouseY * 14 - scrollFrac * 30;

        // 1. AMBIENT BACKGROUND LAYER (Fills entire screen edge-to-edge with matching photo colors)
        const bgCoverScale = Math.max(cw / iw, ch / ih) * 1.06;
        const bgW = iw * bgCoverScale;
        const bgH = ih * bgCoverScale;
        const bgX = (cw - bgW) / 2 + panX * 0.3;
        const bgY = (ch - bgH) / 2 + panY * 0.3;

        ctx.save();
        ctx.globalAlpha = 0.55;
        if (ctx.filter) {
          ctx.filter = 'blur(16px)';
        }
        ctx.drawImage(img, bgX, bgY, bgW, bgH);
        ctx.restore();

        // Subtle dark cinematic tint for ambient background
        ctx.fillStyle = 'rgba(7, 8, 12, 0.35)';
        ctx.fillRect(0, 0, cw, ch);

        // 2. CRISP FULL PHOTO IN BACKGROUND (100% complete photo visible, uncropped head & body)
        const isMobile = cw < ch;
        const scale = (isMobile ? (cw / iw) * 0.98 : (ch / ih) * 0.98) * breathing;
        const nw = Math.round(iw * scale);
        const nh = Math.round(ih * scale);

        // Positioned in center with subtle dynamic drift
        const px = Math.round((cw - nw) / 2 + panX);
        const py = Math.round((ch - nh) / 2 + panY);

        // Subtle glowing aura behind subject
        const subjectGlow = ctx.createRadialGradient(
          cw / 2,
          py + nh * 0.35,
          30,
          cw / 2,
          py + nh * 0.45,
          nw * 0.6
        );
        subjectGlow.addColorStop(0, 'rgba(255, 30, 45, 0.18)');
        subjectGlow.addColorStop(0.5, 'rgba(59, 130, 246, 0.08)');
        subjectGlow.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = subjectGlow;
        ctx.fillRect(0, 0, cw, ch);

        // Draw the complete, crisp, uncropped photo
        ctx.save();
        ctx.drawImage(img, px, py, nw, nh);
        ctx.restore();

        // Soft left & right side edge blend so crisp photo melts seamlessly into ambient backdrop
        // (Head, sunglasses, face and body are never masked or covered with black paint!)
        const featherW = Math.min(35, Math.round(nw * 0.04));
        if (featherW > 0) {
          const fLeft = ctx.createLinearGradient(px, 0, px + featherW, 0);
          fLeft.addColorStop(0, 'rgba(7, 8, 12, 0.45)');
          fLeft.addColorStop(1, 'rgba(7, 8, 12, 0)');
          ctx.fillStyle = fLeft;
          ctx.fillRect(px, py, featherW, nh);

          const fRight = ctx.createLinearGradient(px + nw - featherW, 0, px + nw, 0);
          fRight.addColorStop(0, 'rgba(7, 8, 12, 0)');
          fRight.addColorStop(1, 'rgba(7, 8, 12, 0.45)');
          ctx.fillStyle = fRight;
          ctx.fillRect(px + nw - featherW, py, featherW, nh);
        }

        // 3. GENTLE READABILITY SHADING FOR FOREGROUND TEXT (keeps photo luminous and clear)
        const leftGrad = ctx.createLinearGradient(0, 0, cw * 0.38, 0);
        leftGrad.addColorStop(0, 'rgba(7, 8, 12, 0.42)');
        leftGrad.addColorStop(0.7, 'rgba(7, 8, 12, 0.15)');
        leftGrad.addColorStop(1, 'rgba(7, 8, 12, 0)');
        ctx.fillStyle = leftGrad;
        ctx.fillRect(0, 0, cw * 0.38, ch);

        // 4. ANAMORPHIC VIDEO LENS FLARE SWEEP
        const sweepPeriod = 8;
        const sweepProgress = (time % sweepPeriod) / sweepPeriod;
        if (sweepProgress < 0.4) {
          const sweepX = (sweepProgress / 0.4) * (cw + 500) - 250;
          const sweepGrad = ctx.createLinearGradient(sweepX - 100, 0, sweepX + 100, ch);
          sweepGrad.addColorStop(0, 'rgba(255, 30, 45, 0)');
          sweepGrad.addColorStop(0.5, 'rgba(255, 60, 80, 0.045)');
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