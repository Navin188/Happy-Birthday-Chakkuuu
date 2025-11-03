// script.js - minimal vanilla implementation
const birthdayMessage = `Wish you a very Happy Birthday to the most favorite person in my life!
I really miss your drama, your kalesh, and all those little moments that made every day special.
It honestly feels like something’s incomplete without all of that around.
I miss those days when we were together all the time.

Here’s a small surprise for you — it’s very small, but I truly hope you like it. 💫
Once again, Happy Birthday! Enjoy your day to the fullest and take care always ❤️`;

let soundEnabled = true;

// Typewriter effect (configurable)
function typeWriter(text, el, speed=18){
  if(!el) return;
  el.textContent = '';
  el.classList.remove('typing-complete');
  let i = 0;
  function step(){
    if(i < text.length){
      el.textContent += text.charAt(i);
      i++;
      setTimeout(step, speed);
    } else {
      el.classList.add('typing-complete');
    }
  }
  step();
}

// Confetti (small vanilla)
function startConfetti(duration = 4200){
  const canvas = document.getElementById('confetti-canvas');
  if(!canvas) return;
  const ctx = canvas.getContext('2d');
  let w = canvas.width = window.innerWidth;
  let h = canvas.height = window.innerHeight;
  const colors = ['#FF6B6B','#FF8DAA','#FFD93D','#6BCB77','#4D96FF'];
  const pieces = [];
  const count = Math.min(180, Math.floor(w/6));
  for(let i=0;i<count;i++){
    pieces.push({
      x: Math.random()*w,
      y: Math.random()*-h,
      s: Math.random()*8+4,
      vx: Math.random()*2-1,
      vy: Math.random()*3+2,
      c: colors[Math.floor(Math.random()*colors.length)],
      r: Math.random()*360,
      vr: Math.random()*6-3
    });
  }
  let raf;
  function frame(){
    ctx.clearRect(0,0,w,h);
    for(const p of pieces){
      p.x += p.vx; p.y += p.vy; p.r += p.vr;
      if(p.y > h + 20){ p.y = -10; p.x = Math.random()*w; }
      ctx.save();
      ctx.translate(p.x,p.y);
      ctx.rotate(p.r * Math.PI / 180);
      ctx.fillStyle = p.c;
      ctx.fillRect(-p.s/2, -p.s/2, p.s, p.s*0.6);
      ctx.restore();
    }
    raf = requestAnimationFrame(frame);
  }
  frame();
  setTimeout(()=>{ cancelAnimationFrame(raf); ctx.clearRect(0,0,w,h); }, duration);
  window.addEventListener('resize', ()=>{ w = canvas.width = window.innerWidth; h = canvas.height = window.innerHeight; });
}

// short celebration sound (simple melody)
function playCelebrationSound(){
  if(!soundEnabled) return;
  try{
    const ac = new (window.AudioContext || window.webkitAudioContext)();
    const notes = [523.25, 659.25, 783.99, 880.00];
    let t = ac.currentTime;
    notes.forEach(freq=>{
      const o = ac.createOscillator();
      const g = ac.createGain();
      o.connect(g); g.connect(ac.destination);
      o.type = 'sine'; o.frequency.value = freq;
      g.gain.setValueAtTime(0.25, t); g.gain.exponentialRampToValueAtTime(0.001, t+0.35);
      o.start(t); o.stop(t+0.35);
      t += 0.12;
    });
  } catch(e){
    console.warn('Audio blocked or not supported', e);
  }
}

// floating particles on surprise page
function createParticles(){
  const container = document.getElementById('particles');
  if(!container) return;
  const colors = ['#FF6B6B','#FF8DAA','#FFD93D','#6BCB77'];
  for(let i=0;i<14;i++){
    const d = document.createElement('div');
    d.className = 'particle';
    d.style.left = Math.random()*100 + '%';
    d.style.top = Math.random()*100 + '%';
    d.style.background = colors[Math.floor(Math.random()*colors.length)];
    d.style.animationDelay = Math.random()*6 + 's';
    d.style.animationDuration = (Math.random()*4+4) + 's';
    container.appendChild(d);
  }
}

// Download card (basic canvas render)
function downloadCardImage(){
  const img = document.getElementById('birthday-photo');
  const poem = document.getElementById('poem-text');
  if(!poem) return;
  const canvas = document.createElement('canvas');
  const w = 1200, h = 800;
  canvas.width = w; canvas.height = h;
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = '#fff'; ctx.fillRect(0,0,w,h);
  // draw image if loaded
  if(img && img.complete){
    try{ ctx.drawImage(img, 60, 120, 420, 560); } catch(e){}
  }
  // draw poem box
  ctx.fillStyle = '#fff'; ctx.strokeStyle = '#eee'; ctx.lineWidth = 2;
  ctx.fillRect(520,120,620,560); ctx.strokeRect(520,120,620,560);
  ctx.fillStyle = '#333'; ctx.font = '22px Georgia';
  const lines = poem.textContent.trim().split('\n');
  let y = 160;
  for(const line of lines){
    ctx.fillText(line.trim(), 540, y);
    y += 34;
  }
  const link = document.createElement('a');
  link.download = 'birthday-card.png';
  link.href = canvas.toDataURL('image/png');
  link.click();
}

// copy current page link
async function copyCurrentLink(btn){
  try{
    await navigator.clipboard.writeText(window.location.href);
    const orig = btn.innerHTML;
    btn.innerHTML = 'Copied!';
    setTimeout(()=> btn.innerHTML = orig, 1600);
  } catch(e){
    const input = document.createElement('input');
    input.value = window.location.href;
    document.body.appendChild(input);
    input.select(); document.execCommand('copy'); document.body.removeChild(input);
    const orig = btn.innerHTML;
    btn.innerHTML = 'Copied!';
    setTimeout(()=> btn.innerHTML = orig, 1600);
  }
}

// Page init
document.addEventListener('DOMContentLoaded', ()=>{
  // landing page behavior
  if(document.body.classList.contains('landing-page')){
    const el = document.getElementById('typed-message');
    const cta = document.getElementById('cta-button');
    const soundBtn = document.getElementById('sound-toggle');
    if(el) setTimeout(()=> typeWriter(birthdayMessage, el, 18), 300);
    if(cta){
      cta.addEventListener('click', ()=>{
        cta.classList.add('clicked');
        playCelebrationSound();
        startConfetti();
        // micro-interaction: scale + glow
        cta.style.transform = 'scale(1.05)';
        setTimeout(()=> cta.style.transform = '', 300);
        setTimeout(()=> window.location.href = 'surprise.html', 1100);
      });
      cta.addEventListener('keydown', (e)=>{ if(e.key==='Enter' || e.key===' ') { e.preventDefault(); cta.click(); }});
    }
    if(soundBtn){
      soundBtn.addEventListener('click', ()=>{
        soundEnabled = !soundEnabled;
        soundBtn.setAttribute('aria-pressed', String(!soundEnabled));
        soundBtn.classList.toggle('muted', !soundEnabled);
      });
    }
  }

  // surprise page behavior
  if(document.body.classList.contains('surprise-page')){
    createParticles();
    const share = document.getElementById('share-whatsapp');
    const copyBtn = document.getElementById('copy-link');
    const downloadBtn = document.getElementById('download-card');
    if(share) share.addEventListener('click', ()=>{
      const msg = encodeURIComponent('Check out this beautiful birthday surprise! 🎉');
      const url = encodeURIComponent(window.location.href);
      window.open(`https://wa.me/?text=${msg}%20${url}`, '_blank');
    });
    if(copyBtn) copyBtn.addEventListener('click', ()=> copyCurrentLink(copyBtn));
    if(downloadBtn) downloadBtn.addEventListener('click', ()=> downloadCardImage());
    // gentle animations
    const wb = document.querySelector('.whiteboard');
    const photo = document.querySelector('.photo-frame');
    const cat = document.querySelector('.cat-holder');
    if(photo) photo.style.transform = 'scale(0.98) translateY(10px)'; setTimeout(()=>{ if(photo) photo.style.transition='transform .6s ease-out'; if(photo) photo.style.transform='scale(1) translateY(0)'; }, 120);
    if(wb) { wb.style.opacity = '0'; wb.style.transform = 'translateY(10px)'; setTimeout(()=>{ wb.style.transition='all .6s ease-out'; wb.style.opacity='1'; wb.style.transform='translateY(0)'; }, 200); }
    if(cat) { cat.style.transform='translateY(-20px) scale(.8)'; cat.style.opacity='0'; setTimeout(()=>{ cat.style.transition='all .6s cubic-bezier(.2,.9,.3,1)'; cat.style.opacity='1'; cat.style.transform='translateY(0) scale(1)'; }, 350); }
  }
});
