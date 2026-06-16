/* ============================================================
   SARANSH MIDDHA PORTFOLIO — SHARED ENGINE v2
   Fixes: cursor offset · Three.js sizing · ticker · reveals
          tree keyboard · page transitions · stack stagger
   ============================================================ */

'use strict';

// ── DEFERRED INITIALIZATION FUNCTIONS ──

// Blank out scramble texts immediately to avoid text flashing during preload
document.querySelectorAll('[data-scramble], .hero-name-line span').forEach(el => {
  if (el.textContent.trim()) {
    el.dataset.originalText = el.textContent.trim();
    el.textContent = '';
  }
});

function startPageIntro() {
  document.documentElement.classList.add('page-enter');
  setTimeout(() => document.documentElement.classList.remove('page-enter'), 600);

  if (typeof initRevealDeferred === 'function') initRevealDeferred();
  if (typeof initStackRowsDeferred === 'function') initStackRowsDeferred();
  if (typeof initScrambleDeferred === 'function') initScrambleDeferred();
  if (typeof initHeroNameDeferred === 'function') initHeroNameDeferred();
}

(function initPreloader() {
  const preloader = document.getElementById('preloader');
  if (!preloader) return;

  const isSeen = sessionStorage.getItem('portfolio-loader-seen') === 'true';

  if (isSeen) {
    preloader.classList.add('loaded');
    startPageIntro();
    return;
  }

  document.body.classList.add('loading-lock');

  const canvas = document.getElementById('preloaderCanvas');
  const logEl = document.getElementById('preloaderLog');
  const barEl = document.getElementById('preloaderBar');
  const percentEl = document.getElementById('preloaderPercent');

  let percent = 0;
  let targetPercent = 0;
  let loadComplete = false;

  const logs = [
    { threshold: 0, text: "CONNECTING TO GRID MATRIX..." },
    { threshold: 15, text: "DECRYPTING CORE IDENTITY FILE: SARANSH_MIDDHA.json" },
    { threshold: 35, text: "RESOLVING IP (18.5204° N · 73.8567° E) ON NEURAL LABS..." },
    { threshold: 50, text: "BOOSTING THREE.JS wireframe RENDER ENGINE..." },
    { threshold: 68, text: "COMPILING 50+ IMMERSIVE GAME MATRIX BLOCKS..." },
    { threshold: 80, text: "OPTIMIZING SYSTEMS, LABS & CORE AUDIO DSP CURVES..." },
    { threshold: 92, text: "FINALIZING VECTORS AND INITIALIZING INTERFACE..." },
    { threshold: 98, text: "SYSTEM STATUS: SECURE. ONLINE." }
  ];

  let ctx, w, h;
  let particles = [];
  let mouse = { x: -1000, y: -1000 };
  let coreRotation = 0;
  let coreScale = 1;

  if (canvas) {
    ctx = canvas.getContext('2d');
    const resizeCanvas = () => {
      w = canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      h = canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };
    resizeCanvas();

    for (let i = 0; i < 40; i++) {
      spawnParticle(true);
    }

    preloader.addEventListener('mousemove', (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    }, { passive: true });

    preloader.addEventListener('mouseleave', () => {
      mouse.x = -1000;
      mouse.y = -1000;
    });

    preloader.addEventListener('click', (e) => {
      const rect = canvas.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const clickY = e.clientY - rect.top;

      for (let i = 0; i < 15; i++) {
        particles.push({
          x: clickX,
          y: clickY,
          vx: (Math.random() - 0.5) * 6,
          vy: (Math.random() - 0.5) * 6,
          radius: Math.random() * 2 + 1,
          color: '#4f8cff',
          alpha: 1,
          life: 0,
          maxLife: 40 + Math.random() * 20
        });
      }

      targetPercent = Math.min(100, targetPercent + 15);
      coreScale = 1.35;
    });
  }

  function spawnParticle(randomPos = false) {
    const center = 90;
    const angle = Math.random() * Math.PI * 2;
    const distance = randomPos ? Math.random() * 80 : 70;
    particles.push({
      x: center + Math.cos(angle) * distance,
      y: center + Math.sin(angle) * distance,
      vx: 0,
      vy: 0,
      radius: Math.random() * 1.5 + 0.5,
      color: Math.random() > 0.4 ? '#4f8cff' : '#ffffff',
      alpha: Math.random() * 0.5 + 0.3,
      orbitAngle: angle,
      orbitRadius: distance + (Math.random() - 0.5) * 10,
      orbitSpeed: (Math.random() * 0.015 + 0.005) * (Math.random() > 0.5 ? 1 : -1)
    });
  }

  function draw() {
    if (loadComplete) return;
    requestAnimationFrame(draw);

    if (!ctx) return;
    ctx.clearRect(0, 0, w, h);

    const center = 90;
    coreRotation += 0.01;
    coreScale += (1 - coreScale) * 0.1;

    ctx.shadowBlur = 15;
    ctx.shadowColor = 'rgba(79, 140, 255, 0.4)';

    ctx.strokeStyle = 'rgba(79, 140, 255, 0.3)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.arc(center, center, 55 * coreScale, 0, Math.PI * 2);
    ctx.stroke();

    ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
    ctx.lineWidth = 0.5;
    ctx.beginPath();
    ctx.arc(center, center, 65, 0, Math.PI * 2);
    ctx.stroke();

    ctx.strokeStyle = 'rgba(79, 140, 255, 0.8)';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    for (let i = 0; i < 6; i++) {
      const angle = coreRotation + (i * Math.PI / 3);
      const r = 24 * coreScale;
      const px = center + Math.cos(angle) * r;
      const py = center + Math.sin(angle) * r;
      if (i === 0) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    }
    ctx.closePath();
    ctx.stroke();

    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(center, center, 4 * coreScale + Math.sin(coreRotation * 5) * 1.5, 0, Math.PI * 2);
    ctx.fill();

    ctx.shadowBlur = 0;

    for (let i = particles.length - 1; i >= 0; i--) {
      const p = particles[i];

      if (p.maxLife) {
        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.95;
        p.vy *= 0.95;
        p.life++;
        p.alpha = 1 - (p.life / p.maxLife);
        
        ctx.fillStyle = p.color;
        ctx.globalAlpha = Math.max(0, p.alpha);
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();

        if (p.life >= p.maxLife) {
          particles.splice(i, 1);
        }
      } else {
        p.orbitAngle += p.orbitSpeed;
        let targetX = center + Math.cos(p.orbitAngle) * p.orbitRadius;
        let targetY = center + Math.sin(p.orbitAngle) * p.orbitRadius;

        if (mouse.x > 0 && mouse.y > 0) {
          const dx = mouse.x - p.x;
          const dy = mouse.y - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 70) {
            const force = (70 - dist) / 70;
            targetX += (mouse.x - targetX) * force * 0.35;
            targetY += (mouse.y - targetY) * force * 0.35;
          }
        }

        p.x += (targetX - p.x) * 0.1;
        p.y += (targetY - p.y) * 0.1;

        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
      }
    }
    ctx.globalAlpha = 1.0;
  }

  if (canvas) draw();

  const handleKeyDown = (e) => {
    if (e.key === ' ' || e.key === 'Spacebar') {
      e.preventDefault();
      targetPercent = 100;
    }
  };
  window.addEventListener('keydown', handleKeyDown);

  const interval = setInterval(() => {
    if (targetPercent < 100) {
      targetPercent = Math.min(99, targetPercent + Math.floor(Math.random() * 4) + 1);
    }
  }, 160);

  const updateProgress = () => {
    if (percent < targetPercent) {
      percent += Math.ceil((targetPercent - percent) * 0.15);
      if (percent > targetPercent) percent = targetPercent;
    }

    if (barEl) barEl.style.width = percent + '%';
    if (percentEl) percentEl.textContent = String(percent).padStart(2, '0') + '%';

    let activeLog = logs[0].text;
    for (let i = 0; i < logs.length; i++) {
      if (percent >= logs[i].threshold) {
        activeLog = logs[i].text;
      }
    }
    if (logEl && logEl.textContent !== activeLog) {
      logEl.textContent = activeLog;
    }

    if (percent >= 100) {
      clearInterval(interval);
      window.removeEventListener('keydown', handleKeyDown);
      loadComplete = true;

      setTimeout(() => {
        preloader.classList.add('loaded');
        document.body.classList.remove('loading-lock');
        sessionStorage.setItem('portfolio-loader-seen', 'true');
        
        const cursorDot = document.getElementById('cursorDot');
        if (cursorDot) {
          cursorDot.style.transform += ' scale(2.5)';
          setTimeout(() => { cursorDot.style.transform = cursorDot.style.transform.replace(' scale(2.5)', ''); }, 400);
        }

        startPageIntro();
      }, 350);
    } else {
      requestAnimationFrame(updateProgress);
    }
  };
  
  requestAnimationFrame(updateProgress);
})();


/* ═══════════════════════════════════════════════════════════
   1. CUSTOM CURSOR
   Fixed: dot offset correct (no translate shift needed),
   ring uses requestAnimationFrame for butter-smooth lag.
═══════════════════════════════════════════════════════════ */
(function initCursor() {
  const dot = document.getElementById('cursorDot');
  if (!dot) return;

  // Hide until mouse enters viewport
  dot.style.opacity = '0';

  let mx = -100, my = -100;
  let entered = false;

  document.addEventListener('mousemove', (e) => {
    if (!entered) {
      entered = true;
      dot.style.transition = 'opacity 0.3s';
      dot.style.opacity = '1';
    }
    mx = e.clientX;
    my = e.clientY;
    // Keep dot centered using translate(-50%, -50%)
    dot.style.transform = `translate3d(${mx}px, ${my}px, 0) translate(-50%, -50%)`;
  }, { passive: true });

  document.addEventListener('mouseleave', () => {
    dot.style.opacity = '0';
  });
  document.addEventListener('mouseenter', () => {
    if (entered) {
      dot.style.opacity = '1';
    }
  });

  document.addEventListener('mousedown', () => {
    dot.style.transform = `translate3d(${mx}px, ${my}px, 0) translate(-50%, -50%) scale(0.75)`;
  });
  document.addEventListener('mouseup', () => {
    dot.style.transform = `translate3d(${mx}px, ${my}px, 0) translate(-50%, -50%)`;
  });

  // Hover detection — use event delegation for dynamically added elements
  document.addEventListener('mouseover', (e) => {
    if (e.target.closest('a, button, .project-strip, .tree-item, .tech-chip, .social-link, .btn-ghost, [data-hover]')) {
      dot.classList.add('hovering');
    }
  });
  document.addEventListener('mouseout', (e) => {
    if (e.target.closest('a, button, .project-strip, .tree-item, .tech-chip, .social-link, .btn-ghost, [data-hover]')) {
      dot.classList.remove('hovering');
    }
  });
})();

/* ═══════════════════════════════════════════════════════════
   2. PAGE TRANSITIONS
   Fixed: use CSS class on <html> not inline body styles.
   Prevents layout shift and works with Three.js init.
═══════════════════════════════════════════════════════════ */
(function initPageTransitions() {
  // Inject transition style once
  const style = document.createElement('style');
  style.textContent = `
    html { transition: opacity 0.4s ease; }
    html.page-exit { opacity: 0; }
    html.page-enter { animation: pageEnterAnim 0.5s cubic-bezier(0.16,1,0.3,1) both; }
    @keyframes pageEnterAnim {
      from { opacity: 0; transform: translateY(14px); }
      to   { opacity: 1; transform: translateY(0); }
    }
  `;
  document.head.appendChild(style);

  // Fade out on nav click
  document.addEventListener('click', (e) => {
    const link = e.target.closest('a[href]');
    if (!link) return;
    const href = link.getAttribute('href');
    if (!href || href.startsWith('#') || href.startsWith('mailto:') ||
        href.startsWith('tel:') || href.startsWith('http') ||
        link.target === '_blank') return;

    e.preventDefault();
    document.documentElement.classList.add('page-exit');
    setTimeout(() => { window.location.href = href; }, 380);
  });
})();

/* ═══════════════════════════════════════════════════════════
   3. NAV — ACTIVE STATE
   Fixed: handles both file:// and http:// correctly.
═══════════════════════════════════════════════════════════ */
(function initNav() {
  const links = document.querySelectorAll('.nav-link');
  const path  = window.location.pathname;
  const file  = path.split('/').pop() || 'index.html';

  links.forEach(link => {
    const href = (link.getAttribute('href') || '').split('/').pop();
    const isHome = (file === 'index.html' || file === '') && href === 'index.html';
    if (href === file || isHome) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
})();

/* ═══════════════════════════════════════════════════════════
   4. SCROLL REVEAL — IntersectionObserver
   Fixed: stagger delay uses element index within viewport.
═══════════════════════════════════════════════════════════ */
function initRevealDeferred() {
  const targets = document.querySelectorAll(
    '.reveal, .tl-date-block, .tl-entry-block, .tl-callout, .stack-row'
  );
  if (!targets.length) return;

  // Elements already in viewport on load get immediate reveal
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' });

  targets.forEach(el => observer.observe(el));
};

/* ═══════════════════════════════════════════════════════════
   5. TICKER — Clone items inside the SAME track for seamless loop
   Fix: duplicate the children inside one track, not the track itself.
   CSS animates translateX(-50%) = exactly one set of items width.
═══════════════════════════════════════════════════════════ */
(function initTicker() {
  document.querySelectorAll('.ticker-track').forEach(track => {
    if (track.dataset.cloned) return;
    // Clone all current children and append to the same track
    const items = Array.from(track.children);
    items.forEach(item => {
      const clone = item.cloneNode(true);
      clone.setAttribute('aria-hidden', 'true');
      track.appendChild(clone);
    });
    track.dataset.cloned = 'true';
  });
})();

/* ═══════════════════════════════════════════════════════════
   6. THREE.JS WIREFRAME SCENE
   Fixed: size canvas AFTER layout paint using ResizeObserver,
   handle missing THREE gracefully.
═══════════════════════════════════════════════════════════ */
(function initWireframe() {
  const canvas = document.getElementById('heroCanvas');
  if (!canvas) return;

  if (typeof THREE === 'undefined') {
    // Fallback: CSS-only animated gradient placeholder
    canvas.style.background = 'radial-gradient(ellipse at 60% 50%, rgba(79,140,255,0.12) 0%, transparent 70%)';
    return;
  }

  let renderer, scene, camera, wireframe, innerWire, particles, mat, innerMat;
  let t = 0;
  let targetX = 0, targetY = 0, currentX = 0, currentY = 0;
  let animating = true;

  function buildScene(w, h) {
    renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(w, h, false); // false = don't set CSS size
    renderer.setClearColor(0x000000, 0);

    scene  = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(42, w / h, 0.1, 100);
    camera.position.z = 5.8;

    // Outer icosahedron
    const geo   = new THREE.IcosahedronGeometry(1.9, 2);
    const edges = new THREE.EdgesGeometry(geo);
    mat = new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.16 });
    wireframe = new THREE.LineSegments(edges, mat);
    scene.add(wireframe);

    // Inner octahedron
    const innerGeo   = new THREE.OctahedronGeometry(0.85, 1);
    const innerEdges = new THREE.EdgesGeometry(innerGeo);
    innerMat = new THREE.LineBasicMaterial({ color: 0x4f8cff, transparent: true, opacity: 0.24 });
    innerWire = new THREE.LineSegments(innerEdges, innerMat);
    scene.add(innerWire);

    // Particle halo
    const pGeo  = new THREE.BufferGeometry();
    const count = 70;
    const pos   = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi   = Math.acos(2 * Math.random() - 1);
      const r     = 2.0 + Math.random() * 1.4;
      pos[i*3]   = r * Math.sin(phi) * Math.cos(theta);
      pos[i*3+1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i*3+2] = r * Math.cos(phi);
    }
    pGeo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    const pMat = new THREE.PointsMaterial({ color: 0xffffff, size: 0.025, transparent: true, opacity: 0.45 });
    particles = new THREE.Points(pGeo, pMat);
    scene.add(particles);
  }

  function resize() {
    const rect = canvas.getBoundingClientRect();
    const w = Math.round(rect.width);
    const h = Math.round(rect.height);
    if (!w || !h) return;
    if (!renderer) { buildScene(w, h); startLoop(); return; }
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  }

  function startLoop() {
    function animate() {
      if (!animating) return;
      requestAnimationFrame(animate);
      t += 0.004;

      currentX += (targetX - currentX) * 0.035;
      currentY += (targetY - currentY) * 0.035;

      wireframe.rotation.y = t         + currentX;
      wireframe.rotation.x = t * 0.38  + currentY;
      wireframe.rotation.z = t * 0.16;

      innerWire.rotation.y = -t * 1.15 + currentX * 0.5;
      innerWire.rotation.x = -t * 0.65 + currentY * 0.5;

      particles.rotation.y = t * 0.12;
      particles.rotation.x = t * 0.07;

      mat.opacity      = 0.13 + Math.sin(t * 1.1) * 0.04;
      innerMat.opacity = 0.20 + Math.sin(t * 0.75 + 1) * 0.06;

      renderer.render(scene, camera);
    }
    animate();
  }

  // Mouse parallax
  document.addEventListener('mousemove', (e) => {
    targetX = ((e.clientX / window.innerWidth)  - 0.5) * 0.55;
    targetY = ((e.clientY / window.innerHeight) - 0.5) * 0.55;
  }, { passive: true });

  // Pause when tab hidden (save GPU)
  document.addEventListener('visibilitychange', () => {
    animating = !document.hidden;
    if (animating && renderer) startLoop();
  });

  // Use ResizeObserver to correctly get canvas size after CSS layout
  const ro = new ResizeObserver(() => resize());
  ro.observe(canvas.parentElement || canvas);

  // Also try immediately
  requestAnimationFrame(resize);
})();

/* ═══════════════════════════════════════════════════════════
   7. LABS: TREE EXPAND / COLLAPSE
   Fixed: keyboard accessible (Enter/Space), ARIA updates.
═══════════════════════════════════════════════════════════ */
(function initTreeItems() {
  document.querySelectorAll('.tree-item').forEach(item => {
    const header = item.querySelector('.tree-item-header');
    const detail = item.querySelector('.tree-detail');
    if (!header) return;

    function toggle() {
      const wasExpanded = item.classList.contains('expanded');
      // Collapse siblings
      const siblings = item.closest('.tree-root')
        ? item.closest('.tree-root').querySelectorAll('.tree-item.expanded')
        : [];
      siblings.forEach(el => {
        el.classList.remove('expanded');
        el.querySelector('.tree-item-header')?.setAttribute('aria-expanded', 'false');
        const d = el.querySelector('.tree-detail');
        if (d) d.setAttribute('aria-hidden', 'true');
      });
      if (!wasExpanded) {
        item.classList.add('expanded');
        header.setAttribute('aria-expanded', 'true');
        if (detail) detail.setAttribute('aria-hidden', 'false');
      }
    }

    header.addEventListener('click', toggle);
    header.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggle(); }
    });
  });
})();

/* ═══════════════════════════════════════════════════════════
   8. TIMELINE: NODE REVEAL
   Fixed: separate observer from global reveal to allow
   different threshold/delay without interference.
═══════════════════════════════════════════════════════════ */
(function initTimeline() {
  // Already handled by global reveal observer.
  // Just mark the first (current) node as active.
  const firstNode = document.querySelector('.tl-date-block.tl-node');
  if (firstNode) firstNode.classList.add('active');
})();

/* ═══════════════════════════════════════════════════════════
   9. STACK: STAGGERED ROW REVEAL
   Fixed: stagger index resets per batch, not global idx.
═══════════════════════════════════════════════════════════ */
function initStackRowsDeferred() {
  const rows = document.querySelectorAll('.stack-row');
  if (!rows.length) return;

  const observer = new IntersectionObserver((entries) => {
    const visible = entries.filter(e => e.isIntersecting);
    visible.forEach((entry, i) => {
      setTimeout(() => {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }, i * 60);
    });
  }, { threshold: 0.06, rootMargin: '0px 0px -20px 0px' });

  rows.forEach(el => observer.observe(el));
};

/* ═══════════════════════════════════════════════════════════
   10. SCRAMBLE TEXT EFFECT
   Fixed: stores original text before blanking, works with
   CSS slide-in animation that already shows the container.
═══════════════════════════════════════════════════════════ */
function initScrambleDeferred() {
  const els = document.querySelectorAll('[data-scramble]');
  if (!els.length) return;

  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

  function scramble(el, finalText, delay = 0) {
    setTimeout(() => {
      const total = Math.ceil(finalText.length * 1.8);
      let frame = 0;
      const id = setInterval(() => {
        el.textContent = finalText.split('').map((ch, i) => {
          if (ch === ' ') return ' ';
          const progress = frame / total;
          if (i < progress * finalText.length) return ch;
          return chars[Math.floor(Math.random() * chars.length)];
        }).join('');
        frame++;
        if (frame >= total) { el.textContent = finalText; clearInterval(id); }
      }, 28);
    }, delay);
  }

  els.forEach((el, i) => {
    const text = el.dataset.originalText || el.dataset.scramble || el.textContent;
    scramble(el, text, i * 180 + 100);
  });
};

/* ═══════════════════════════════════════════════════════════
   11. HERO NAME SLIDE-IN
   The .hero-name-line span CSS animation handles the slide.
   This just adds scramble on top once visible.
═══════════════════════════════════════════════════════════ */
function initHeroNameDeferred() {
  document.querySelectorAll('.hero-name-line span').forEach((el, i) => {
    const text = el.dataset.originalText || el.textContent.trim();
    if (!text) return;

    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const delay = i * 220 + 150;
    setTimeout(() => {
      const total = Math.ceil(text.length * 1.6);
      let frame = 0;
      const id = setInterval(() => {
        el.textContent = text.split('').map((ch, ci) => {
          if (ch === ' ') return ' ';
          if (ci < (frame / total) * text.length) return ch;
          return chars[Math.floor(Math.random() * chars.length)];
        }).join('');
        frame++;
        if (frame >= total) { el.textContent = text; clearInterval(id); }
      }, 26);
    }, delay);
  });
};
