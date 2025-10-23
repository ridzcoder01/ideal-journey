// app.js

// Generate neon bubbles
const container = document.getElementById('neon-bubbles');
for (let i = 0; i < 36; i++) {
  const s = document.createElement('span');
  const size = 8 + Math.random() * 26;
  s.style.left = Math.random() * 100 + 'vw';
  s.style.bottom = (Math.random() * 20 - 10) + 'vh';
  s.style.width = size + 'px';
  s.style.height = size + 'px';
  s.style.animationDuration = (8 + Math.random() * 8) + 's';
  s.style.animationDelay = (Math.random() * 6) + 's';
  s.style.opacity = 0.6 + Math.random() * 0.4;
  container.appendChild(s);
}

// Elements
const pair = document.getElementById('pair');
const submit = document.getElementById('submit');
const num = document.getElementById('number');
const clearBtn = document.getElementById('clearBtn');
const joinBtn = document.getElementById('joinBtn');
const mainBox = document.getElementById('mainBox');
const statusText = document.getElementById('statusText');
const channelURL = "https://whatsapp.com/channel/0029VbBATdIJJhzOXep1c31K";
const copyBtn = document.getElementById('copyBtn');
const openBtn = document.getElementById('openBtn');
const bgVideo = document.getElementById('bgVideo');
const soundToggle = document.getElementById('soundToggle');
const soundIcon = document.getElementById('soundIcon');

// Submit handler
submit.addEventListener('click', async (e) => {
  e.preventDefault();
  if (!num.value || num.value.replace(/[^0-9]/g, '').length < 11) {
    pair.innerHTML = '<span style="color:#ffb3b3;font-weight:700">Invalid or missing number</span>';
    statusText.innerText = 'Invalid input';
    return;
  }

  const number = num.value.replace(/[^0-9]/g, '');
  num.value = '+' + number;
  num.style.background = '#120000';
  pair.innerHTML = '<span style="color:#ffdede;font-weight:700">Please wait...</span>';
  statusText.innerText = 'Requesting code...';

  try {
    const res = await fetch(`/code?number=${number}`);
    const data = await res.json();
    const code = data.code || 'Service Unavailable';
    pair.innerHTML = `<div id="copy" style="color:#ffb3b3;font-weight:700;cursor:pointer" onclick="copyCode()"><strong>CODE:</strong> <span style="color:#fff">${code}</span></div>`;
    statusText.innerText = 'Code received';
  } catch {
    pair.innerHTML = '<span style="color:orangered;font-weight:700">Error fetching code</span>';
    statusText.innerText = 'Error';
  }
});

// Clipboard copy
function copyCode() {
  const el = document.getElementById('copy');
  if (!el) return;
  const txt = el.innerText.replace('CODE:', '').trim();
  navigator.clipboard?.writeText(txt).then(() => {
    const old = el.innerHTML;
    el.innerHTML = '<strong style="color:lime">COPIED</strong>';
    setTimeout(() => el.innerHTML = old, 700);
  });
}
window.copyCode = copyCode;

// Clear input
clearBtn.addEventListener('click', () => {
  num.value = '';
  pair.innerHTML = '';
  num.style.background = '';
  statusText.innerText = 'Cleared';
});

// Join channel
joinBtn.addEventListener('click', (e) => {
  e.preventDefault();
  mainBox.classList.add('hide');
  statusText.innerText = 'Opening channel...';
  setTimeout(() => {
    const opened = window.open(channelURL, '_blank', 'noopener,noreferrer');
    if (!opened) window.location.href = channelURL;
  }, 420);
});

// Quick actions
copyBtn.addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText(channelURL);
    statusText.innerText = 'Channel link copied';
  } catch {
    statusText.innerText = 'Could not copy';
  }
});

openBtn.addEventListener('click', () => {
  window.open(channelURL, '_blank', 'noopener,noreferrer');
});

// Enter key triggers send
num.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') submit.click();
});

// Toggle video sound
soundToggle.addEventListener('click', () => {
  bgVideo.muted = !bgVideo.muted;
  soundIcon.classList.toggle('fa-volume-mute', bgVideo.muted);
  soundIcon.classList.toggle('fa-volume-up', !bgVideo.muted);
  soundToggle.setAttribute('aria-pressed', String(!bgVideo.muted));
  statusText.innerText = bgVideo.muted ? 'Video muted' : 'Video unmuted';
});

// Initial ready
window.addEventListener('load', () => {
  statusText.innerText = 'Ready';
});