
/* =============================== 
  ▼ ソースコード色付け ▼
================================ */
document.addEventListener("DOMContentLoaded", () => {
  hljs.highlightAll();
});

/* =============================== 
  ▼ 背景演出 ▼
================================ */
const canvas = document.getElementById("fx");
const ctx = canvas.getContext("2d");

let w, h;
let particles = [];

function resize() {
  w = canvas.width = window.innerWidth;
  h = canvas.height = window.innerHeight;
}
window.addEventListener("resize", resize);
resize();

//粒子生成.
for (let i = 0; i < 80; i++) {
  particles.push({
    x: Math.random() * w,
    y: Math.random() * h,
    r: Math.random() * 2 + 0.5,
    speed: Math.random() * 0.3 + 0.1,
    alpha: Math.random() * 0.5 + 0.2,
    drift: (Math.random() - 0.5) * 0.2 // ← 横揺れ追加
  });
}

function bgDraw() {
  ctx.clearRect(0, 0, w, h);

  /* =====================
    ▼ 粒子
  ===================== */
  particles.forEach(p => {
    p.y -= p.speed;
    p.x += p.drift;

    if (p.y < 0 || p.x < 0 || p.x > w) {
      p.y = h + Math.random() * 50;
      p.x = Math.random() * w;
    }

    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);

    ctx.fillStyle = `rgba(51,231,255,${p.alpha})`;
    ctx.shadowColor = "#33e7ff";
    ctx.shadowBlur = 10;

    ctx.fill();
  });

  requestAnimationFrame(bgDraw);
}
bgDraw();

/* =============================== 
  ▼ スムーススクロール ▼
  aタグをクリックした時のアニメーション
================================ */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const id = a.getAttribute('href');
    if (id.length > 1) {
      e.preventDefault();
      document.querySelector(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

/* =============================== 
  ▼ カーソルの発光(PC用) ▼
================================ */
document.addEventListener("DOMContentLoaded", () => {

  const cursorWrap = document.querySelector('.cursor');
  if (!cursorWrap) return;

  // クリック時だけ波紋
  window.addEventListener('click', (e) => {
    createRipple(e.clientX, e.clientY);
  });

  function createRipple(x, y) {
    const ripple = document.createElement('div');
    ripple.className = 'ripple';

    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';

    cursorWrap.appendChild(ripple);

    setTimeout(() => ripple.remove(), 800);
  }
});


  // ツリー開閉
document.querySelectorAll(".tree-header").forEach(header => {
  header.addEventListener("click", () => {
    const node = header.parentElement;

    // トグル
    node.classList.toggle("open");
  });
});