// src/app/utils/threeLayer.ts
// Three.js 3D background layer + glass card tilt effect.
// - Constellation particle field + floating wireframe geometry
// - Mouse parallax + scroll-driven camera drift
// - Transparent background: subject photo / frame video stays visible
// - Sets window.__three3dActive so the 2D fallback skips its own particles

import * as THREE from 'three';

declare global {
  interface Window {
    __three3dActive?: boolean;
  }
}

export function startThreeLayer(canvas: HTMLCanvasElement): () => void {
  // ---- Renderer / Scene / Camera ----
  const renderer = new THREE.WebGLRenderer({
    canvas,
    alpha: true,
    antialias: true,
    powerPreference: 'high-performance',
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75));
  renderer.setSize(window.innerWidth, window.innerHeight);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 100);

  const ACCENT = new THREE.Color('#ff1e2d');
  const BLUE = new THREE.Color('#3b82f6');
  const WHITE = new THREE.Color('#ffffff');

  // ---- Constellation Particle Field ----
  const COUNT = 260;
  const positions = new Float32Array(COUNT * 3);
  const colors = new Float32Array(COUNT * 3);

  for (let i = 0; i < COUNT; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 26;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 16;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 14;
    const pick = Math.random();
    const c = pick < 0.5 ? ACCENT : pick < 0.78 ? BLUE : WHITE;
    colors[i * 3] = c.r;
    colors[i * 3 + 1] = c.g;
    colors[i * 3 + 2] = c.b;
  }

  const particleGeo = new THREE.BufferGeometry();
  particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  particleGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

  const particles = new THREE.Points(
    particleGeo,
    new THREE.PointsMaterial({
      size: 0.075,
      vertexColors: true,
      transparent: true,
      opacity: 0.75,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    })
  );
  scene.add(particles);

  // ---- Floating Wireframe Shapes (kept on the edges so the center stays clear) ----
  const shapes: THREE.Mesh[] = [];
  function addShape(geo: THREE.BufferGeometry, color: THREE.Color, opacity: number, x: number, y: number, z: number) {
    const mesh = new THREE.Mesh(
      geo,
      new THREE.MeshBasicMaterial({ color, wireframe: true, transparent: true, opacity, depthWrite: false })
    );
    mesh.position.set(x, y, z);
    mesh.userData.baseY = y;
    scene.add(mesh);
    shapes.push(mesh);
  }
  addShape(new THREE.IcosahedronGeometry(1.6, 0), ACCENT, 0.25, -8.2, 2.8, -3.0);
  addShape(new THREE.TorusKnotGeometry(1.0, 0.3, 64, 10), BLUE, 0.18, 8.2, -1.8, -3.5);
  addShape(new THREE.OctahedronGeometry(1.0, 0), WHITE, 0.15, 7.2, 3.2, -5.0);
  addShape(new THREE.TorusGeometry(1.2, 0.32, 10, 40), ACCENT, 0.18, -9.0, 1.0, -6.0);

  // ---- Interaction State ----
  let mouseX = 0;
  let mouseY = 0;
  let targetX = 0;
  let targetY = 0;

  function onPointerMove(e: PointerEvent) {
    targetX = (e.clientX / window.innerWidth - 0.5) * 2;
    targetY = (e.clientY / window.innerHeight - 0.5) * 2;
  }
  window.addEventListener('pointermove', onPointerMove, { passive: true });

  // ---- Responsive camera pull-back on small screens ----
  function layoutCamera() {
    const mobile = window.innerWidth < 768;
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    camera.userData.baseZ = mobile ? 13.5 : 9;
    camera.position.z = camera.userData.baseZ as number;
  }
  layoutCamera();

  function onResize() {
    renderer.setSize(window.innerWidth, window.innerHeight);
    layoutCamera();
  }
  window.addEventListener('resize', onResize);

  // ---- Pause rendering when tab is hidden ----
  let running = true;
  function onVisibility() {
    running = !document.hidden;
    if (running) {
      clock.getDelta();
      tick();
    }
  }
  document.addEventListener('visibilitychange', onVisibility);

  const clock = new THREE.Clock();
  let rafId = 0;

  function tick() {
    if (!running) return;
    rafId = requestAnimationFrame(tick);

    const t = clock.getElapsedTime();
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    const scrollFrac = maxScroll > 0 ? Math.min(Math.max((window.scrollY || 0) / maxScroll, 0), 1) : 0;

    // Smooth mouse parallax
    mouseX += (targetX - mouseX) * 0.045;
    mouseY += (targetY - mouseY) * 0.045;

    // Particles: slow orbit + parallax + scroll drift
    particles.rotation.y = t * 0.04 + mouseX * 0.16;
    particles.rotation.x = mouseY * 0.09;
    particles.position.y = scrollFrac * 2.4;

    // Wireframe shapes: independent rotation + gentle float
    shapes.forEach((s, i) => {
      s.rotation.x += 0.0022 + (i % 2) * 0.0012;
      s.rotation.y += 0.0028 + (i % 3) * 0.0009;
      s.position.y = (s.userData.baseY as number) + Math.sin(t * 0.6 + i * 1.7) * 0.45;
      s.position.x += Math.cos(t * 0.35 + i * 2.1) * 0.0006;
    });

    // Camera: parallax + scroll drift
    camera.position.x = mouseX * 0.55;
    camera.position.y = -mouseY * 0.4 - scrollFrac * 1.0;
    camera.position.z = camera.userData.baseZ as number;
    camera.lookAt(0, 0, 0);

    renderer.render(scene, camera);
  }

  canvas.classList.add('ready');
  window.__three3dActive = true; // tell the 2D fallback to stop its own particles

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) {
    // Respect reduced-motion: render one static frame, no loop
    renderer.render(scene, camera);
  } else {
    tick();
  }

  // ---- Cleanup ----
  return () => {
    running = false;
    cancelAnimationFrame(rafId);
    window.removeEventListener('pointermove', onPointerMove);
    window.removeEventListener('resize', onResize);
    document.removeEventListener('visibilitychange', onVisibility);
    canvas.classList.remove('ready');
    window.__three3dActive = false;
    renderer.dispose();
  };
}

// ---- 3D Tilt on Glass Cards (Projects / Services / Timeline) ----
export function attachCardTilt(): () => void {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) return () => {};

  const tiltCards = Array.from(
    document.querySelectorAll<HTMLElement>('.glass-card.service-card, .glass-card.project-card, .timeline-card')
  );

  const handlers: Array<{ el: HTMLElement; move: (e: PointerEvent) => void; leave: () => void }> = [];

  tiltCards.forEach((card) => {
    card.style.willChange = 'transform';
    const move = (e: PointerEvent) => {
      const r = card.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      card.style.transform = `perspective(900px) rotateY(${(px * 7).toFixed(2)}deg) rotateX(${(-py * 7).toFixed(2)}deg) translateY(-4px)`;
    };
    const leave = () => {
      card.style.transform = '';
    };
    card.addEventListener('pointermove', move);
    card.addEventListener('pointerleave', leave);
    handlers.push({ el: card, move, leave });
  });

  return () => {
    handlers.forEach(({ el, move, leave }) => {
      el.removeEventListener('pointermove', move);
      el.removeEventListener('pointerleave', leave);
      el.style.transform = '';
      el.style.willChange = '';
    });
  };
}