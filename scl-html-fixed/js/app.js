/* ============================================================
   app.js  —  SCL Contracts Pvt Ltd
   All JavaScript: cursor, loader, navbar, hero, sections
   ============================================================ */

/* ═══════════════════════════════════════════════════════════
   1. CURSOR
═══════════════════════════════════════════════════════════ */
(function initCursor() {
  const dot  = document.getElementById('cursor-dot');
  const ring = document.getElementById('cursor-ring');
  if (!dot || !ring) return;
  if (window.matchMedia('(max-width:768px)').matches) return;

  let mx=0, my=0, rx=0, ry=0;
  const lerp = (a,b,t) => a + (b-a)*t;

  window.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    dot.style.left = mx + 'px'; dot.style.top = my + 'px';
  }, {passive:true});

  (function animate() {
    rx = lerp(rx,mx,.12); ry = lerp(ry,my,.12);
    ring.style.left = rx + 'px'; ring.style.top = ry + 'px';
    requestAnimationFrame(animate);
  })();

  document.querySelectorAll('a,button,input,textarea,select,[data-hover]').forEach(el => {
    el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
    el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
  });
})();

/* ═══════════════════════════════════════════════════════════
   2. LOADER
═══════════════════════════════════════════════════════════ */
(function initLoader() {
  const loader = document.getElementById('loader');
  const fill   = document.getElementById('loader-fill');
  const pct    = document.getElementById('loader-pct');
  if (!loader) return;

  const steps = [12,30,52,70,88,100];
  let i = 0;
  const advance = () => {
    if (i >= steps.length) {
      loader.classList.add('hidden');
      document.body.classList.remove('no-scroll');
      return;
    }
    const v = steps[i++];
    fill.style.width = v + '%';
    pct.textContent  = v + '%';
    setTimeout(advance, 320 + Math.random()*200);
  };
  document.body.classList.add('no-scroll');
  setTimeout(advance, 200);
})();

/* ═══════════════════════════════════════════════════════════
   3. NAVBAR
═══════════════════════════════════════════════════════════ */
(function initNavbar() {
  const nav   = document.getElementById('navbar');
  const burger = document.getElementById('hamburger');
  const menu  = document.getElementById('mobile-menu');

  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 40);
  }, {passive:true});

  if (burger && menu) {
    burger.addEventListener('click', () => {
      burger.classList.toggle('open');
      menu.classList.toggle('open');
    });
  }

  // Active section tracking
  const sections = document.querySelectorAll('section[id]');
  const links    = document.querySelectorAll('.nav-link[data-section]');
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        links.forEach(l => l.classList.toggle('active', l.dataset.section === e.target.id));
      }
    });
  }, { threshold: 0.4 });
  sections.forEach(s => obs.observe(s));

  // Smooth scroll helper — preventDefault stops href="#" from jumping to top
  document.querySelectorAll('[data-scroll]').forEach(el => {
    el.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.getElementById(el.dataset.scroll);
      if (target) { target.scrollIntoView({ behavior: 'smooth' }); }
      // Close mobile menu
      if (menu) { menu.classList.remove('open'); burger && burger.classList.remove('open'); }
    });
  });
})();

/* ═══════════════════════════════════════════════════════════
   4. HERO — typing animation + parallax particles
═══════════════════════════════════════════════════════════ */
(function initHero() {
  // Typing animation
  const el = document.getElementById('typed-text');
  if (!el) return;
  const lines = [
    'Facade Renovation, Waterproofing & Design-Build.',
    'Expert Specialty, Roofing & Acoustic Solutions.',
    'NSE-listed Siddhika Group · 6 cities across India.',
    'Trusted by 60% repeat clients · 20+ years strong.'
  ];
  let li=0, ci=0, deleting=false;
  function type() {
    const line = lines[li];
    if (!deleting) {
      el.textContent = line.slice(0, ++ci);
      if (ci === line.length) { deleting=true; setTimeout(type, 2200); return; }
      setTimeout(type, 48);
    } else {
      el.textContent = line.slice(0, --ci);
      if (ci === 0) { deleting=false; li=(li+1)%lines.length; setTimeout(type, 400); return; }
      setTimeout(type, 22);
    }
  }
  setTimeout(type, 800);

  // Parallax on mouse move
  const content = document.getElementById('hero-content');
  window.addEventListener('mousemove', e => {
    const dx = (e.clientX/innerWidth  - .5)*22;
    const dy = (e.clientY/innerHeight - .5)*12;
    if (content) content.style.transform = `translate(${dx*.3}px,${dy*.3}px)`;
  }, {passive:true});
})();

/* ═══════════════════════════════════════════════════════════
   5. SCROLL REVEAL — global reusable observer
═══════════════════════════════════════════════════════════ */
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      const delay = +e.target.dataset.delay || 0;
      setTimeout(() => e.target.classList.add('visible'), delay * 110);
      revealObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -50px 0px' });

function observeReveal(root) {
  const scope = root || document;
  scope.querySelectorAll('.reveal:not(.visible),.reveal-left:not(.visible),.reveal-right:not(.visible),.stat-card:not(.visible)').forEach(el => revealObserver.observe(el));
}

// Observe initial (static) elements immediately
observeReveal();

/* ═══════════════════════════════════════════════════════════
   6. STATS COUNTER
═══════════════════════════════════════════════════════════ */
(function initStats() {
  const counters = document.querySelectorAll('[data-count]');
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      obs.unobserve(e.target);
      const el      = e.target;
      const target  = +el.dataset.count;
      const suffix  = el.dataset.suffix || '';
      const dur     = 2000;
      const step    = 16;
      const inc     = target / (dur/step);
      let cur       = 0;
      const t = setInterval(() => {
        cur = Math.min(cur + inc, target);
        el.textContent = (target >= 1000
          ? Math.round(cur).toLocaleString('en-IN')
          : Math.round(cur * 10)/10) + suffix;
        if (cur >= target) clearInterval(t);
      }, step);
    });
  }, { threshold: .5 });
  counters.forEach(c => obs.observe(c));
})();

/* ═══════════════════════════════════════════════════════════
   7. SERVICES — render cards + 3D tilt
═══════════════════════════════════════════════════════════ */
(function initServices() {
  const grid = document.getElementById('services-grid');
  if (!grid) return;

  SERVICES.forEach((s, i) => {
    const card = document.createElement('div');
    card.className = 'service-card glass reveal';
    card.dataset.delay = i % 3;
    card.style.cssText = `border-color:${s.color}18;`;

    card.innerHTML = `
      <div class="service-card-corner" style="background:radial-gradient(circle at 80% 20%,${s.color},transparent)"></div>
      <div class="service-icon" style="background:${s.color}14;border:1px solid ${s.color}28;box-shadow:0 0 18px ${s.color}12;">
        ${s.icon}
      </div>
      <div class="service-title" style="color:${s.color};">${s.title}</div>
      <div class="service-desc">${s.short}</div>
      <ul class="service-features">
        ${s.features.map(f => `<li><span class="service-feat-dot" style="background:${s.color};box-shadow:0 0 6px ${s.color};"></span>${f}</li>`).join('')}
      </ul>
      <div class="service-card-bottom" style="background:linear-gradient(90deg,transparent,${s.color}55,transparent);"></div>
    `;

    // 3D tilt effect
    card.addEventListener('mousemove', e => {
      const r    = card.getBoundingClientRect();
      const x    = e.clientX - r.left, y = e.clientY - r.top;
      const cx   = r.width/2, cy = r.height/2;
      const tx   = ((y-cy)/cy)*-7, ty = ((x-cx)/cx)*7;
      card.style.transform    = `perspective(900px) rotateX(${tx}deg) rotateY(${ty}deg) translateY(-8px) scale(1.01)`;
      card.style.transition   = 'transform .1s';
      card.style.background   = `radial-gradient(circle at ${x}px ${y}px,${s.color}10 0%,rgba(255,255,255,.02) 60%),rgba(255,255,255,.04)`;
      card.style.boxShadow    = `0 20px 55px ${s.color}14,0 0 0 1px ${s.color}1a`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform  = 'perspective(900px) rotateX(0) rotateY(0) translateY(0) scale(1)';
      card.style.transition = 'transform .5s cubic-bezier(.16,1,.3,1)';
      card.style.background = '';
      card.style.boxShadow  = '';
    });

    grid.appendChild(card);
  });

  // Observe newly added service cards
  setTimeout(() => observeReveal(grid), 50);
})();

/* ═══════════════════════════════════════════════════════════
   8. PROJECTS — render + filter + modal
═══════════════════════════════════════════════════════════ */
(function initProjects() {
  const grid   = document.getElementById('projects-grid');
  const modal  = document.getElementById('modal');
  const mClose = document.getElementById('modal-close');
  if (!grid) return;

  let activeFilter = 'all';

  function renderProjects() {
    grid.innerHTML = '';
    const filtered = activeFilter === 'all' ? PROJECTS : PROJECTS.filter(p => p.category === activeFilter);
    if (!filtered.length) {
      grid.innerHTML = '<p style="text-align:center;color:rgba(255,255,255,.25);font-family:var(--font-mono);font-size:.85rem;padding:60px 0;grid-column:1/-1">No projects found.</p>';
      return;
    }
    filtered.forEach((p, i) => {
      const card = document.createElement('div');
      card.className = 'project-card glass reveal';
      card.dataset.delay = i % 3;
      const statusColor = p.status === 'Completed' ? '#00FF64' : '#FFB400';
      card.innerHTML = `
        <div class="project-thumb">
          <img src="${p.image}" alt="${p.title}" loading="lazy">
          <div class="project-thumb-overlay"></div>
          <div class="project-thumb-cat"><span class="badge">${p.category}</span></div>
          <div class="project-status-dot" style="background:${statusColor};box-shadow:0 0 8px ${statusColor};" title="${p.status}"></div>
          <div class="project-hover-icon">
            <div class="project-hover-icon-inner">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#00D4FF" stroke-width="2"><path d="M15 3h6v6M14 10l6.1-6.1M9 21H3v-6M10 14l-6.1 6.1"/></svg>
            </div>
          </div>
        </div>
        <div class="project-info">
          <div class="project-title">${p.title}</div>
          <div class="project-loc">
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/><circle cx="12" cy="9" r="2.5"/></svg>
            ${p.location}
          </div>
          <div class="project-foot">
            <span class="project-value">${p.value}</span>
            <span class="project-year">${p.year}</span>
          </div>
        </div>
      `;
      card.addEventListener('click', () => openModal(p));
      grid.appendChild(card);
    });
    // Re-observe newly rendered project cards
    setTimeout(() => observeReveal(grid), 50);
  }

  // Remove the old per-element triggerReveal — use global observer instead

  // Filters
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeFilter = btn.dataset.filter;
      renderProjects();
    });
  });

  // Modal
  function openModal(p) {
    const statusColor = p.status === 'Completed' ? '#00FF64' : '#FFB400';
    document.getElementById('modal-img').src = p.image;
    document.getElementById('modal-title').textContent = p.title;
    document.getElementById('modal-desc').textContent = p.description;
    document.getElementById('modal-status').innerHTML = `<span class="badge" style="color:${statusColor};border-color:${statusColor}40;background:${statusColor}10">● ${p.status}</span>`;
    document.getElementById('modal-tags').innerHTML = p.tags.map(t=>`<span class="badge">${t}</span>`).join('');
    document.getElementById('modal-meta').innerHTML = [
      {label:'Location',val:p.location},
      {label:'Year',val:p.year},
      {label:'Scale',val:p.area},
      {label:'Value',val:p.value}
    ].map(m=>`
      <div class="modal-meta-cell glass">
        <div class="modal-meta-label">${m.label}</div>
        <div class="modal-meta-val">${m.val}</div>
      </div>
    `).join('');
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modal.classList.remove('open');
    document.body.style.overflow = '';
  }

  mClose && mClose.addEventListener('click', closeModal);
  modal  && modal.addEventListener('click', e => { if(e.target===modal) closeModal(); });
  document.addEventListener('keydown', e => { if(e.key==='Escape') closeModal(); });

  renderProjects();
})();

/* ═══════════════════════════════════════════════════════════
   9. ABOUT — directors + timeline
═══════════════════════════════════════════════════════════ */
(function initAbout() {

  function makeDirectorCard(d, delay) {
    const card = document.createElement('div');
    card.className = 'director-card glass reveal';
    card.dataset.delay = delay;
    card.style.borderColor = `${d.color}18`;
    card.addEventListener('mouseenter', () => {
      card.style.boxShadow = `0 20px 60px ${d.color}18,0 0 0 1px ${d.color}25`;
    });
    card.addEventListener('mouseleave', () => { card.style.boxShadow = ''; });
    card.innerHTML = `
      <div class="director-card-glow" style="background:radial-gradient(circle,${d.color},transparent)"></div>
      <div class="director-avatar" style="background:linear-gradient(135deg,${d.color}1a,${d.color}08);border:1.5px solid ${d.color}30;box-shadow:0 0 20px ${d.color}14;">
        <span class="director-initials" style="color:${d.color};">${d.initials}</span>
        <div class="director-avatar-dot" style="background:${d.color};box-shadow:0 0 8px ${d.color};"></div>
      </div>
      <div class="director-name">${d.name}</div>
      <div class="director-role-badge" style="color:${d.color};background:${d.color}12;border:1px solid ${d.color}25;">${d.role}</div>
      <div class="director-bio">${d.bio}</div>
      <div class="director-card-bottom" style="background:linear-gradient(90deg,transparent,${d.color}50,transparent);"></div>
    `;
    return card;
  }

  // Timeline
  const tlGrid = document.getElementById('timeline-grid');
  if (tlGrid) {
    const half = Math.ceil(TIMELINE.length / 2);
    [TIMELINE.slice(0, half), TIMELINE.slice(half)].forEach((group, gi) => {
      const col = document.createElement('div');
      if (gi === 1) col.style.marginTop = '56px';
      group.forEach(m => {
        col.innerHTML += `
          <div class="timeline-item reveal" data-delay="${gi}">
            <div class="timeline-spine">
              <div class="timeline-dot"><div class="timeline-dot-inner"></div></div>
              <div class="timeline-line"></div>
            </div>
            <div class="timeline-body">
              <div class="timeline-year">${m.year}</div>
              <div class="timeline-title">${m.title}</div>
              <div class="timeline-desc">${m.desc}</div>
            </div>
          </div>
        `;
      });
      tlGrid.appendChild(col);
    });
  }

  // Directors
  const dGrid  = document.getElementById('directors-grid');
  const dGrid2 = document.getElementById('directors-grid-2');
  if (dGrid)  DIRECTORS.slice(0, 3).forEach((d, i) => dGrid.appendChild(makeDirectorCard(d, i)));
  if (dGrid2) DIRECTORS.slice(3).forEach((d, i) => dGrid2.appendChild(makeDirectorCard(d, i + 3)));

  // Re-observe newly added elements
  setTimeout(() => {
    observeReveal(tlGrid);
    observeReveal(dGrid);
    observeReveal(dGrid2);
  }, 50);

})();

/* ═══════════════════════════════════════════════════════════
   10. OFFICES — render
═══════════════════════════════════════════════════════════ */
(function initOffices() {
  const list = document.getElementById('offices-list');
  if (!list) return;
  OFFICES.forEach(o => {
    const div = document.createElement('div');
    div.className = 'office-card glass';
    div.style.borderColor = o.hq ? 'rgba(0,212,255,.2)' : 'rgba(255,255,255,.06)';
    div.innerHTML = `
      <span class="office-flag">${o.flag}</span>
      <div style="flex:1;min-width:0;">
        <div class="office-city">
          ${o.city}
          ${o.hq ? '<span class="office-hq-badge">HQ</span>' : ''}
        </div>
        <div class="office-addr">${o.address}</div>
      </div>
      <a href="tel:${o.phone.replace(/\s/g,'')}" class="office-phone">${o.phone}</a>
    `;
    list.appendChild(div);
  });
})();

/* ═══════════════════════════════════════════════════════════
   11. SMART ESTIMATOR
═══════════════════════════════════════════════════════════ */
(function initEstimator() {
  const RATES = {
    residential:   { metro:2800, tier2:2200, tier3:1700 },
    commercial:    { metro:3600, tier2:2800, tier3:2200 },
    industrial:    { metro:2200, tier2:1700, tier3:1300 },
    institutional: { metro:3200, tier2:2500, tier3:1900 }
  };
  const SPEC = { standard:1, premium:1.4, luxury:1.85 };

  let type='residential', tier='metro', spec='standard', area=5000, floors=1;

  const fmt = n => {
    if (n>=10000000) return '₹'+(n/10000000).toFixed(2)+' Cr';
    if (n>=100000)   return '₹'+(n/100000).toFixed(2)+' Lakh';
    return '₹'+Math.round(n).toLocaleString('en-IN');
  };

  function calc() {
    const rate  = RATES[type][tier];
    const mult  = SPEC[spec];
    const total = rate * mult * area * floors;
    const base  = rate * area * floors;
    return {
      total, perSqft: Math.round(rate*mult),
      fnd:   Math.round(base*.15),
      str:   Math.round(base*.35),
      fin:   Math.round((total-base) + base*.5),
      mep:   Math.round(base*.12)
    };
  }

  function update() {
    const r = calc();
    const el = id => document.getElementById(id);
    if (el('est-total'))   el('est-total').textContent   = fmt(r.total);
    if (el('est-rate'))    el('est-rate').textContent    = `≈ ${fmt(r.perSqft)} / sq.ft`;
    if (el('est-fnd'))     el('est-fnd').textContent     = fmt(r.fnd);
    if (el('est-str'))     el('est-str').textContent     = fmt(r.str);
    if (el('est-fin'))     el('est-fin').textContent     = fmt(r.fin);
    if (el('est-mep'))     el('est-mep').textContent     = fmt(r.mep);
  }

  // Toggle button groups
  document.querySelectorAll('[data-est-type]').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('[data-est-type]').forEach(b => b.classList.remove('active-blue'));
      btn.classList.add('active-blue'); type = btn.dataset.estType; update();
    });
  });
  document.querySelectorAll('[data-est-tier]').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('[data-est-tier]').forEach(b => b.classList.remove('active-orange'));
      btn.classList.add('active-orange'); tier = btn.dataset.estTier; update();
    });
  });
  document.querySelectorAll('[data-est-spec]').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('[data-est-spec]').forEach(b => b.classList.remove('active-purple'));
      btn.classList.add('active-purple'); spec = btn.dataset.estSpec; update();
    });
  });

  // Area slider
  const areaSlider = document.getElementById('area-slider');
  const areaDisp   = document.getElementById('area-display');
  if (areaSlider) {
    areaSlider.addEventListener('input', () => {
      area = +areaSlider.value;
      areaDisp.textContent = (+area).toLocaleString('en-IN') + ' sq.ft';
      update();
    });
  }

  // Floors slider
  const floorsSlider = document.getElementById('floors-slider');
  const floorsDisp   = document.getElementById('floors-display');
  if (floorsSlider) {
    floorsSlider.addEventListener('input', () => {
      floors = +floorsSlider.value;
      floorsDisp.textContent = floors;
      update();
    });
  }

  update();
})();

/* ═══════════════════════════════════════════════════════════
   12. CONTACT FORM
═══════════════════════════════════════════════════════════ */
(function initContact() {
  const form    = document.getElementById('contact-form');
  const success = document.getElementById('form-success');
  if (!form) return;

  function showErr(name, msg) {
    const input = form.querySelector(`[name="${name}"]`);
    const err   = form.querySelector(`[data-err="${name}"]`);
    if (input) input.classList.add('err');
    if (err)   { err.textContent = msg; err.classList.add('show'); }
  }
  function clearErr(name) {
    const input = form.querySelector(`[name="${name}"]`);
    const err   = form.querySelector(`[data-err="${name}"]`);
    if (input) input.classList.remove('err');
    if (err)   err.classList.remove('show');
  }

  form.querySelectorAll('input,textarea').forEach(el => {
    el.addEventListener('input', () => clearErr(el.name));
  });

  form.addEventListener('submit', e => {
    e.preventDefault();
    let valid = true;
    const data = Object.fromEntries(new FormData(form));

    if (!data.name.trim())                                              { showErr('name','Name is required'); valid=false; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email))               { showErr('email','Valid email required'); valid=false; }
    if (data.phone && !/^[\d\s+\-()]{8,15}$/.test(data.phone))        { showErr('phone','Enter a valid phone number'); valid=false; }
    if (!data.message.trim() || data.message.trim().length<20)         { showErr('message','Message must be at least 20 characters'); valid=false; }
    if (!valid) return;

    const btn = form.querySelector('[type="submit"]');
    btn.disabled = true;
    btn.innerHTML = '<span style="display:flex;align-items:center;gap:8px;"><span style="width:16px;height:16px;border:1.5px solid rgba(0,212,255,.3);border-top-color:var(--neon);border-radius:50%;animation:spin 1s linear infinite;display:inline-block;"></span>Sending…</span>';

    setTimeout(() => {
      form.style.display = 'none';
      success.classList.add('show');
    }, 1800);
  });

  const resetBtn = document.getElementById('form-reset');
  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      form.reset(); form.style.display = '';
      success.classList.remove('show');
      const btn = form.querySelector('[type="submit"]');
      btn.disabled = false;
      btn.innerHTML = 'Book Free Site Visit <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 2 11 13M22 2l-7 20-4-9-9-4 20-7z"/></svg>';
    });
  }
})();

/* ═══════════════════════════════════════════════════════════
   13. CHATBOT
═══════════════════════════════════════════════════════════ */
(function initChatbot() {
  const toggle   = document.getElementById('chat-toggle');
  const win      = document.getElementById('chat-window');
  const messages = document.getElementById('chat-messages');
  const input    = document.getElementById('chat-input');
  const sendBtn  = document.getElementById('chat-send');
  const clearBtn = document.getElementById('chat-clear');
  const badge    = document.getElementById('chat-badge');
  if (!toggle || !win) return;

  let isOpen   = false;
  let unread   = 1;
  let msgCount = 0;

  function now() {
    return new Date().toLocaleTimeString([],{hour:'2-digit',minute:'2-digit'});
  }

  function addMsg(text, from) {
    const isBot = from==='bot';
    const wrap = document.createElement('div');
    wrap.className = `chat-msg ${from}`;
    wrap.style.animation = 'fadeInUp .3s ease';

    if (isBot) {
      wrap.innerHTML = `
        <div class="chat-bot-avatar">AI</div>
        <div>
          <div class="chat-bubble bot">${text}</div>
          <div class="chat-time">${now()}</div>
        </div>
      `;
    } else {
      wrap.innerHTML = `
        <div style="display:flex;flex-direction:column;align-items:flex-end;">
          <div class="chat-bubble user">${text}</div>
          <div class="chat-time" style="text-align:right;">${now()}</div>
        </div>
      `;
    }
    messages.appendChild(wrap);
    messages.scrollTop = messages.scrollHeight;
    msgCount++;

    if (!isOpen && isBot && msgCount>1) {
      unread++;
      badge.textContent = unread;
      badge.style.display='flex';
    }
  }

  function showTyping() {
    const wrap = document.createElement('div');
    wrap.className = 'chat-msg bot'; wrap.id='typing-indicator';
    wrap.innerHTML = `
      <div class="chat-bot-avatar">AI</div>
      <div class="typing-indicator">
        <div class="typing-dot"></div>
        <div class="typing-dot"></div>
        <div class="typing-dot"></div>
      </div>
    `;
    messages.appendChild(wrap);
    messages.scrollTop = messages.scrollHeight;
  }

  function removeTyping() {
    const t = document.getElementById('typing-indicator');
    if (t) t.remove();
  }

  function sendMessage(text) {
    const t = text.trim();
    if (!t) return;
    input.value='';
    sendBtn.disabled=true;
    addMsg(t, 'user');
    showTyping();
    setTimeout(() => {
      removeTyping();
      addMsg(chatbotReply(t), 'bot');
    }, 600 + Math.random()*700);
  }

  // Events
  toggle.addEventListener('click', () => {
    isOpen = !isOpen;
    win.classList.toggle('open', isOpen);
    toggle.classList.toggle('close-mode', isOpen);
    if (isOpen) {
      unread=0; badge.style.display='none';
      setTimeout(()=>input.focus(),200);
    }
  });

  sendBtn && sendBtn.addEventListener('click', () => sendMessage(input.value));
  input   && input.addEventListener('keydown', e => {
    if (e.key==='Enter'&&!e.shiftKey) { e.preventDefault(); sendMessage(input.value); }
  });
  input   && input.addEventListener('input', () => { sendBtn.disabled = !input.value.trim(); });

  clearBtn && clearBtn.addEventListener('click', () => {
    messages.innerHTML='';
    addMsg("Hi! I'm <strong>ARIA</strong>, SCL Contracts' AI assistant 👋<br><br>Ask me about our <strong>services</strong>, <strong>offices</strong>, or <strong>contact details</strong>.", 'bot');
  });

  document.querySelectorAll('.quick-btn').forEach(btn => {
    btn.addEventListener('click', () => sendMessage(btn.textContent));
  });

  // Initial greeting (slight delay)
  setTimeout(()=>{
    addMsg("Hi! I'm <strong>ARIA</strong>, SCL Contracts' AI assistant 👋<br><br>Ask me about our <strong>services</strong>, <strong>offices</strong>, <strong>contact details</strong>, or our <strong>leadership team</strong>.", 'bot');
  }, 3500);
})();

/* ═══════════════════════════════════════════════════════════
   14. MISC FINAL FIXES
═══════════════════════════════════════════════════════════ */
// Footer year
const footerYear = document.getElementById('footer-year');
if (footerYear) footerYear.textContent = new Date().getFullYear();

// Prevent ALL <a href="#"> from jumping to top — catch any not handled by data-scroll
document.querySelectorAll('a[href="#"]').forEach(a => {
  a.addEventListener('click', e => e.preventDefault());
});

// Re-observe any static reveal elements that might have been missed
// (runs after all dynamic content has been injected)
setTimeout(() => observeReveal(), 200);
