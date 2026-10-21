import {
  WebGLRenderer, Scene, PerspectiveCamera, Group, Mesh, Points,
  LatheGeometry, CylinderGeometry, PlaneGeometry, BoxGeometry, TorusGeometry, SphereGeometry, BufferGeometry, BufferAttribute,
  MeshStandardMaterial, ShaderMaterial, PointsMaterial, CanvasTexture,
  AmbientLight, PointLight, DirectionalLight, Vector2, Color,
  AdditiveBlending, DoubleSide, SRGBColorSpace, MathUtils
} from 'three';

const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const lerp = MathUtils.lerp;
const clamp01 = (x) => Math.min(1, Math.max(0, x));
const smooth = (a, b, x) => { const t = clamp01((x - a) / (b - a)); return t * t * (3 - 2 * t); };
function rand(seed) { let s = seed; return () => (s = (s * 16807) % 2147483647) / 2147483647; }

function makeRenderer(canvas) {
  const r = new WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: 'high-performance' });
  r.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75));
  r.outputColorSpace = SRGBColorSpace;
  return r;
}

function fitRenderer(renderer, camera, canvas) {
  const w = canvas.clientWidth, h = canvas.clientHeight;
  if (!w || !h) return;
  const size = renderer.getSize(new Vector2());
  if (size.x !== w || size.y !== h) {
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  }
}

/* Render only while the canvas is on screen */
function visibleLoop(canvas, frame) {
  let on = false, raf = 0, last = performance.now();
  const tick = (now) => {
    const dt = Math.min(0.05, (now - last) / 1000); last = now;
    frame(dt, now / 1000);
    if (on) raf = requestAnimationFrame(tick);
  };
  new IntersectionObserver((es) => {
    const v = es[0].isIntersecting;
    if (v && !on) { on = true; last = performance.now(); raf = requestAnimationFrame(tick); }
    if (!v) { on = false; cancelAnimationFrame(raf); }
  }, { rootMargin: '100px' }).observe(canvas);
}

/* ---------- textures drawn in canvas ---------- */

function meatTexture() {
  const c = document.createElement('canvas'); c.width = 512; c.height = 1024;
  const g = c.getContext('2d'), R = rand(11);
  g.fillStyle = '#7a3d1c'; g.fillRect(0, 0, 512, 1024);
  // stacked layers of meat
  for (let y = 0; y < 1024; y += 6 + R() * 10) {
    const h = 4 + R() * 9;
    const tone = [ '#8f4a22', '#a35a2b', '#6e3418', '#b8703a', '#5c2a12' ][Math.floor(R() * 5)];
    g.fillStyle = tone; g.globalAlpha = 0.85;
    g.beginPath(); g.moveTo(0, y);
    for (let x = 0; x <= 512; x += 32) g.lineTo(x, y + Math.sin(x * 0.03 + y) * 3);
    g.lineTo(512, y + h); g.lineTo(0, y + h); g.fill();
  }
  // crispy charred streaks
  g.globalAlpha = 1;
  for (let i = 0; i < 1400; i++) {
    const x = R() * 512, y = R() * 1024, l = 6 + R() * 26;
    g.strokeStyle = R() > 0.5 ? 'rgba(40,16,6,.55)' : 'rgba(214,140,70,.5)';
    g.lineWidth = 1 + R() * 2.5;
    g.beginPath(); g.moveTo(x, y); g.lineTo(x + (R() - 0.5) * 4, y + l); g.stroke();
  }
  // fat glints
  for (let i = 0; i < 500; i++) {
    g.fillStyle = 'rgba(255,214,150,' + (0.15 + R() * 0.35) + ')';
    g.beginPath(); g.arc(R() * 512, R() * 1024, 0.8 + R() * 2.2, 0, Math.PI * 2); g.fill();
  }
  const t = new CanvasTexture(c); t.colorSpace = SRGBColorSpace; t.anisotropy = 4;
  return t;
}

function heaterTexture() {
  const c = document.createElement('canvas'); c.width = 256; c.height = 512;
  const g = c.getContext('2d');
  g.fillStyle = '#140805'; g.fillRect(0, 0, 256, 512);
  for (let y = 18; y < 512; y += 36) {
    g.fillStyle = '#ff6a1a'; g.fillRect(16, y, 224, 10);
    g.fillStyle = '#ffd27a'; g.fillRect(16, y + 3, 224, 3);
  }
  const t = new CanvasTexture(c); t.colorSpace = SRGBColorSpace;
  return t;
}

function pitaTexture() {
  const c = document.createElement('canvas'); c.width = 1024; c.height = 1024;
  const g = c.getContext('2d'), R = rand(5);
  g.clearRect(0, 0, 1024, 1024);
  g.save(); g.beginPath(); g.arc(512, 512, 500, 0, Math.PI * 2); g.clip();
  g.fillStyle = '#e8bf7a'; g.fillRect(0, 0, 1024, 1024);
  for (let i = 0; i < 900; i++) {
    const x = R() * 1024, y = R() * 1024, r = 4 + R() * 26;
    g.fillStyle = R() > 0.7 ? 'rgba(160,96,40,.35)' : 'rgba(250,222,170,.35)';
    g.beginPath(); g.arc(x, y, r, 0, Math.PI * 2); g.fill();
  }
  // grill marks
  g.strokeStyle = 'rgba(92,48,18,.55)'; g.lineWidth = 16; g.lineCap = 'round';
  for (let i = -6; i <= 6; i++) { g.beginPath(); g.moveTo(140 + i * 70, 120); g.lineTo(-60 + i * 70 + 400, 940); g.stroke(); }
  for (let i = 0; i < 260; i++) {
    g.fillStyle = 'rgba(70,34,12,' + (0.2 + R() * 0.5) + ')';
    g.beginPath(); g.arc(R() * 1024, R() * 1024, 2 + R() * 9, 0, Math.PI * 2); g.fill();
  }
  // toasted rim
  g.lineWidth = 46; g.strokeStyle = 'rgba(170,104,46,.55)';
  g.beginPath(); g.arc(512, 512, 488, 0, Math.PI * 2); g.stroke();
  g.restore();
  const t = new CanvasTexture(c); t.colorSpace = SRGBColorSpace; t.anisotropy = 4;
  return t;
}

function paperTexture() {
  const c = document.createElement('canvas'); c.width = 1024; c.height = 512;
  const g = c.getContext('2d');
  g.fillStyle = '#f4f1ec'; g.fillRect(0, 0, 1024, 512);
  g.fillStyle = '#95191e'; g.fillRect(0, 300, 1024, 110);
  g.fillStyle = '#f4f1ec';
  g.font = '800 74px Archivo, "Arial Narrow", Arial, sans-serif';
  g.textBaseline = 'middle';
  for (let x = 20; x < 1024; x += 360) g.fillText('ISIMIKE', x, 357);
  const t = new CanvasTexture(c); t.colorSpace = SRGBColorSpace;
  return t;
}

/* ---------- flame shader ---------- */

const flameVert = `varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }`;
const flameFrag = `
  uniform float uTime; uniform float uSeed; varying vec2 vUv;
  float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1,311.7))) * 43758.5453); }
  float noise(vec2 p){ vec2 i=floor(p), f=fract(p); vec2 u=f*f*(3.0-2.0*f);
    return mix(mix(hash(i),hash(i+vec2(1,0)),u.x), mix(hash(i+vec2(0,1)),hash(i+vec2(1,1)),u.x), u.y); }
  float fbm(vec2 p){ float v=0.0, a=0.5; for(int i=0;i<5;i++){ v+=a*noise(p); p*=2.0; a*=0.5; } return v; }
  void main(){
    vec2 uv = vUv;
    float t = uTime * 1.6 + uSeed * 10.0;
    float n = fbm(vec2(uv.x * 3.0, uv.y * 2.2 - t));
    float body = smoothstep(0.5, 0.0, abs(uv.x - 0.5 + (n - 0.5) * 0.35 * uv.y)) ;
    float h = body * (1.0 - uv.y) * 1.6 - n * 0.55 * uv.y;
    h = clamp(h, 0.0, 1.0);
    vec3 col = mix(vec3(0.85,0.12,0.02), vec3(1.0,0.55,0.08), smoothstep(0.15,0.55,h));
    col = mix(col, vec3(1.0,0.86,0.5), smoothstep(0.8,1.0,h));
    col *= 0.85;
    float a = smoothstep(0.05, 0.35, h);
    a *= smoothstep(0.0, 0.18, uv.x) * smoothstep(1.0, 0.82, uv.x) * smoothstep(0.0, 0.12, uv.y) * smoothstep(1.0, 0.75, uv.y);
    gl_FragColor = vec4(col * a, a);
  }`;

function flame(seed) {
  return new Mesh(new PlaneGeometry(1, 1.6), new ShaderMaterial({
    uniforms: { uTime: { value: 0 }, uSeed: { value: seed } },
    vertexShader: flameVert, fragmentShader: flameFrag,
    transparent: true, depthWrite: false, blending: AdditiveBlending, side: DoubleSide
  }));
}

function embers(count, spread) {
  const geo = new BufferGeometry(), R = rand(3);
  const pos = new Float32Array(count * 3), spd = new Float32Array(count);
  for (let i = 0; i < count; i++) {
    pos[i * 3] = (R() - 0.5) * spread; pos[i * 3 + 1] = R() * 3 - 1.5; pos[i * 3 + 2] = (R() - 0.5) * 0.6;
    spd[i] = 0.3 + R() * 0.8;
  }
  geo.setAttribute('position', new BufferAttribute(pos, 3));
  const pts = new Points(geo, new PointsMaterial({ color: 0xffa040, size: 0.035, transparent: true, opacity: 0.9, blending: AdditiveBlending, depthWrite: false }));
  pts.userData.update = (dt) => {
    for (let i = 0; i < count; i++) {
      pos[i * 3 + 1] += spd[i] * dt;
      pos[i * 3] += Math.sin(pos[i * 3 + 1] * 3 + i) * dt * 0.08;
      if (pos[i * 3 + 1] > 1.8) { pos[i * 3 + 1] = -1.4; pos[i * 3] = (R() - 0.5) * spread; }
    }
    geo.attributes.position.needsUpdate = true;
  };
  return pts;
}

/* ---------- scene 1: the gyros spit turning in front of the fire ---------- */

export function spitScene(canvas) {
  const renderer = makeRenderer(canvas);
  const scene = new Scene();
  const camera = new PerspectiveCamera(32, 1, 0.1, 50);
  camera.position.set(0, 0.15, 8.2);

  const spit = new Group();
  // the cone of meat: wider at the top, ridged like stacked slices
  const pts = [];
  for (let i = 0; i <= 60; i++) {
    const t = i / 60, y = lerp(-1.25, 1.2, t);
    const r = lerp(0.52, 0.86, Math.pow(t, 0.9)) + Math.sin(t * 90) * 0.012 + Math.sin(t * 13) * 0.02;
    pts.push(new Vector2(r, y));
  }
  pts.unshift(new Vector2(0.05, -1.25)); pts.push(new Vector2(0.05, 1.2));
  const meatMap = meatTexture();
  const meat = new Mesh(new LatheGeometry(pts, 96), new MeshStandardMaterial({
    map: meatMap, bumpMap: meatMap, bumpScale: 0.04, roughness: 0.55, metalness: 0.0,
    emissive: new Color(0x2a0d02), emissiveIntensity: 0.6
  }));
  spit.add(meat);
  const steel = new MeshStandardMaterial({ color: 0xb8b8b8, metalness: 0.9, roughness: 0.25 });
  spit.add(new Mesh(new CylinderGeometry(0.035, 0.035, 3.6, 16), steel));
  const capTop = new Mesh(new CylinderGeometry(0.42, 0.42, 0.05, 32), steel); capTop.position.y = 1.24; spit.add(capTop);
  const plate = new Mesh(new CylinderGeometry(0.7, 0.7, 0.05, 48), steel); plate.position.y = -1.3; spit.add(plate);
  scene.add(spit);

  // heater panel with flames behind the spit
  const heater = new Mesh(new PlaneGeometry(2.2, 3.1), new MeshStandardMaterial({ map: heaterTexture(), emissiveMap: heaterTexture(), emissive: new Color(0xff7a2a), emissiveIntensity: 1.1 }));
  heater.position.set(0.15, -0.05, -1.25);
  scene.add(heater);
  const flames = [];
  for (let i = 0; i < 11; i++) {
    const f = flame(i * 0.37);
    const s = 0.8 + (i % 3) * 0.3;
    f.scale.set(s, s * 1.25, 1);
    f.userData = { ox: -1.0 + i * 0.2, oy: -1.0 + (i % 2) * 0.25 + s * 0.7, oz: -0.95 + (i % 2) * 0.1 };
    scene.add(f); flames.push(f);
  }
  const sparks = embers(140, 2.2); sparks.position.z = -0.6; scene.add(sparks);

  scene.add(new AmbientLight(0xffffff, 0.35));
  const key = new DirectionalLight(0xfff1e0, 1.6); key.position.set(-3, 2, 4); scene.add(key);
  const fire = new PointLight(0xff6a1a, 18, 8, 1.6); fire.position.set(0.2, 0, -0.6); scene.add(fire);
  const rim = new PointLight(0xffa860, 10, 8, 1.8); rim.position.set(1.8, 1.2, -0.4); scene.add(rim);

  let mx = 0, my = 0;
  window.addEventListener('pointermove', (e) => { mx = e.clientX / innerWidth - 0.5; my = e.clientY / innerHeight - 0.5; }, { passive: true });

  const layout = () => {
    // keep the spit in the upper right on wide screens, centred on phones
    const wide = canvas.clientWidth > 760;
    spit.position.set(wide ? 2.6 : 0, wide ? 1.05 : 0.75, 0);
    heater.position.x = spit.position.x + 0.15; heater.position.y = spit.position.y - 0.05;
    flames.forEach((f) => { const o = f.userData; f.position.set(spit.position.x + o.ox, spit.position.y + o.oy, o.oz); });
    sparks.position.x = spit.position.x; sparks.position.y = spit.position.y;
    fire.position.x = spit.position.x + 0.2; rim.position.x = spit.position.x + 1.8;
    const s = wide ? 0.66 : 0.64; spit.scale.setScalar(s); heater.scale.setScalar(s);
  };

  const frame = (dt, t) => {
    fitRenderer(renderer, camera, canvas); layout();
    if (!reduced) {
      spit.rotation.y += dt * 0.7;
      flames.forEach((f) => { f.material.uniforms.uTime.value = t; });
      sparks.userData.update(dt);
      fire.intensity = 16 + Math.sin(t * 11) * 2.5 + Math.sin(t * 23) * 1.5;
      camera.position.x += (mx * 0.5 - camera.position.x) * 0.04;
      camera.position.y += (0.15 - my * 0.3 - camera.position.y) * 0.04;
    }
    camera.lookAt(0, 0.1, 0);
    renderer.render(scene, camera);
  };
  if (reduced) { frame(0, 1); window.addEventListener('resize', () => frame(0, 1)); }
  else visibleLoop(canvas, frame);
}

/* ---------- scene 2: how we wrap the pita, driven by the scroll ---------- */

export function wrapScene(canvas, getProgress, onStep) {
  const renderer = makeRenderer(canvas);
  const scene = new Scene();
  const camera = new PerspectiveCamera(34, 1, 0.1, 50);

  const R = 1.15, SEG = 72;
  const pitaGeo = new PlaneGeometry(2 * R, 2 * R, SEG, SEG);
  const flat = pitaGeo.attributes.position.array.slice();
  const pita = new Mesh(pitaGeo, new MeshStandardMaterial({ map: pitaTexture(), alphaTest: 0.5, side: DoubleSide, roughness: 0.85 }));

  const wrap = new Group();
  wrap.add(pita);

  // toppings, each with a flat position on the pita and a final one inside the roll
  const R2 = rand(21);
  const toppings = [];
  const add = (mesh, stage, x, y) => {
    mesh.userData = { stage, x, y, rz: R2() * Math.PI, fall: 1.4 + R2() * 0.8 };
    wrap.add(mesh); toppings.push(mesh);
  };
  const meatMat = [0x8f4a22, 0xa35a2b, 0x6e3418].map((c) => new MeshStandardMaterial({ color: c, roughness: 0.6 }));
  for (let i = 0; i < 26; i++) add(new Mesh(new BoxGeometry(0.34, 0.07, 0.05), meatMat[i % 3]), 1, (R2() - 0.5) * 0.55, (R2() - 0.5) * 1.3);
  const tomato = new MeshStandardMaterial({ color: 0xc62f22, roughness: 0.4 });
  for (let i = 0; i < 18; i++) add(new Mesh(new BoxGeometry(0.1, 0.1, 0.08), tomato), 2, (R2() - 0.5) * 0.6, (R2() - 0.5) * 1.3);
  const onion = new MeshStandardMaterial({ color: 0xe8d6e6, roughness: 0.5 });
  for (let i = 0; i < 8; i++) add(new Mesh(new TorusGeometry(0.08, 0.018, 8, 20), onion), 2, (R2() - 0.5) * 0.6, (R2() - 0.5) * 1.2);
  const tzatziki = new MeshStandardMaterial({ color: 0xf6f3ea, roughness: 0.35 });
  for (let i = 0; i < 5; i++) { const m = new Mesh(new SphereGeometry(0.11, 20, 14), tzatziki); m.scale.set(1.3, 1, 0.35); add(m, 3, (R2() - 0.5) * 0.3, -0.5 + i * 0.25); }
  const fry = [0xf0c64a, 0xe0b03a].map((c) => new MeshStandardMaterial({ color: c, roughness: 0.55 }));
  for (let i = 0; i < 16; i++) add(new Mesh(new BoxGeometry(0.06, 0.62, 0.06), fry[i % 2]), 4, (R2() - 0.5) * 0.42, 0.25 + R2() * 0.5);

  // paper with the ISIMIKE band
  const paper = new Mesh(new CylinderGeometry(0.4, 0.17, 1.5, 48, 1, true), new MeshStandardMaterial({ map: paperTexture(), side: DoubleSide, roughness: 0.9 }));
  paper.position.y = -0.55;
  wrap.add(paper);

  scene.add(wrap);
  scene.add(new AmbientLight(0xffffff, 0.55));
  const key = new DirectionalLight(0xfff1e0, 2.2); key.position.set(-2, 4, 3); scene.add(key);
  const warm = new PointLight(0xff8a3a, 8, 10, 1.6); warm.position.set(2, 1, 2); scene.add(warm);

  const pos = pitaGeo.attributes.position;
  const rollPita = (k) => {
    // k = 0 flat disc, 1 rolled into a cone (narrow at the bottom)
    for (let i = 0; i < pos.count; i++) {
      const u = flat[i * 3], v = flat[i * 3 + 1];
      const tv = (v + R) / (2 * R);
      const rho = lerp(0.15, 0.34, tv);
      const phi = u / rho;
      const rr = rho + Math.abs(phi) * 0.008;
      const rx = rr * Math.sin(phi), rz = rr * Math.cos(phi);
      const ry = v * 0.95 - 0.1;
      pos.setXYZ(i, lerp(u, rx, k), lerp(v, ry, k), lerp(0, rz, k));
    }
    pos.needsUpdate = true;
    pitaGeo.computeVertexNormals();
  };

  const STEPS = [0.0, 0.14, 0.3, 0.44, 0.56, 0.7, 0.86];
  let lastStep = -1, shown = 0;

  const frame = (dt, t) => {
    fitRenderer(renderer, camera, canvas);
    const target = getProgress();
    shown += (target - shown) * (reduced ? 1 : Math.min(1, dt * 6));
    const p = shown;

    const step = STEPS.reduce((a, s, i) => (p >= s ? i : a), 0);
    if (step !== lastStep) { lastStep = step; onStep(step); }

    const roll = smooth(0.7, 0.84, p);
    rollPita(roll);
    // lying on the board, then standing up as it is rolled
    wrap.rotation.x = lerp(-Math.PI / 2 + 0.12, 0, smooth(0.66, 0.82, p));
    wrap.rotation.y = lerp(0, Math.PI * 2, smooth(0.86, 1, p)) + (reduced ? 0 : Math.sin(t * 0.5) * 0.08);
    wrap.position.y = lerp(-0.2, 0.15, smooth(0.66, 0.82, p));

    toppings.forEach((m) => {
      const d = m.userData;
      const start = [0, 0.16, 0.32, 0.46, 0.58][d.stage];
      const inP = smooth(start, start + 0.08, p);
      m.visible = inP > 0.001;
      // dropped onto the pita, then pulled into the middle of the roll
      const fx = d.x, fy = d.y, fz = 0.06 + d.stage * 0.025 + (1 - inP) * d.fall;
      const ix = d.x * 0.18, iy = d.y * 0.85 - 0.1 + (d.stage === 4 ? 0.6 : 0), iz = d.x * 0.1;
      m.position.set(lerp(fx, ix, roll), lerp(fy, iy, roll), lerp(fz, iz, roll));
      m.rotation.set(d.stage === 4 ? lerp(Math.PI / 2, 0, roll) : Math.PI / 2 * (1 - roll), 0, d.rz * (1 - roll));
      m.scale.setScalar(lerp(1, d.stage === 4 ? 0.85 : 0.5, roll));
    });

    const paperK = smooth(0.86, 0.96, p);
    paper.visible = paperK > 0.001;
    paper.scale.set(1, Math.max(0.001, paperK), 1);
    paper.position.y = -1.3 + paperK * 0.75;

    const wide = canvas.clientWidth > 760;
    const dist = lerp(4.4, 4.9, roll) * (wide ? 1 : 1.75);
    camera.position.set(wide ? -0.9 : 0, lerp(2.2, 0.6, smooth(0.66, 0.82, p)), dist);
    camera.lookAt(wide ? -0.9 : 0, wide ? 0.05 : 0.45, 0);
    renderer.render(scene, camera);
  };
  visibleLoop(canvas, frame);
}

window.ISIMIKE3D = { spitScene, wrapScene };
