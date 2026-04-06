// Blog image lightbox — zoom, drag, navigation, thumbnails

export function initLightbox(signal: AbortSignal) {
  const lightbox = document.getElementById('lightbox');
  const lbImg = document.getElementById('lightbox-img') as HTMLImageElement;
  const thumbsEl = document.getElementById('lightbox-thumbs');
  if (!lightbox || !lbImg) return;

  const images = Array.from(document.querySelectorAll<HTMLImageElement>('.article-body img'));
  if (!images.length) return;

  let idx = 0;
  let scale = 1, tx = 0, ty = 0;
  let dragging = false, hasDragged = false;
  let dragStartX = 0, dragStartY = 0, startTx = 0, startTy = 0;

  // ── Thumbnails ──
  if (thumbsEl) {
    thumbsEl.innerHTML = '';
    if (images.length > 1) {
      images.forEach((img, i) => {
        const thumb = document.createElement('img');
        thumb.src = img.src;
        thumb.alt = '';
        thumb.className = 'lb-thumb';
        thumb.addEventListener('click', (e) => { e.stopPropagation(); showImage(i); }, { signal });
        thumbsEl.appendChild(thumb);
      });
    }
  }

  function updateThumbs() {
    if (!thumbsEl) return;
    thumbsEl.querySelectorAll('.lb-thumb').forEach((t, i) => {
      t.classList.toggle('active', i === idx);
    });
    const active = thumbsEl.children[idx] as HTMLElement;
    if (active) active.scrollIntoView({ inline: 'center', block: 'nearest', behavior: 'smooth' });
  }

  // ── Transform ──
  function apply() {
    lbImg.style.transform = `translate(${tx}px,${ty}px) scale(${scale})`;
  }
  function reset() {
    scale = 1; tx = 0; ty = 0;
    lbImg.style.transform = '';
    lbImg.style.cursor = 'zoom-in';
  }
  const isZoomed = () => scale > 1.05;

  // ── Navigation ──
  function showImage(i: number) {
    idx = i;
    lbImg.src = images[i].src;
    lbImg.alt = images[i].alt;
    reset();
    updateThumbs();
    const counter = document.getElementById('lightbox-counter');
    if (counter) {
      if (images.length > 1) {
        counter.textContent = `${idx + 1} / ${images.length}`;
        counter.style.display = '';
      } else {
        counter.style.display = 'none';
      }
    }
    // Show/hide nav arrows
    const prev = document.getElementById('lightbox-prev');
    const next = document.getElementById('lightbox-next');
    if (prev) prev.style.display = images.length > 1 ? '' : 'none';
    if (next) next.style.display = images.length > 1 ? '' : 'none';
  }

  function open(i: number) {
    showImage(i);
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function close() {
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
  }

  function goPrev() { if (idx > 0) showImage(idx - 1); }
  function goNext() { if (idx < images.length - 1) showImage(idx + 1); }

  // ── Wheel zoom ──
  lightbox.addEventListener('wheel', (e) => {
    if (!lightbox.classList.contains('open')) return;
    e.preventDefault();
    const factor = e.deltaY > 0 ? 0.9 : 1.1;
    scale = Math.min(Math.max(scale * factor, 0.5), 8);
    const rect = lbImg.getBoundingClientRect();
    tx += (e.clientX - rect.left - rect.width / 2) * (1 - factor);
    ty += (e.clientY - rect.top - rect.height / 2) * (1 - factor);
    if (!isZoomed()) { tx = 0; ty = 0; scale = 1; }
    lbImg.style.cursor = isZoomed() ? 'grab' : 'zoom-in';
    apply();
  }, { passive: false, signal });

  // ── Drag pan ──
  lbImg.addEventListener('pointerdown', (e) => {
    if (!isZoomed()) return;
    e.preventDefault();
    dragging = true; hasDragged = false;
    dragStartX = e.clientX; dragStartY = e.clientY;
    startTx = tx; startTy = ty;
    lbImg.style.cursor = 'grabbing';
    lbImg.setPointerCapture(e.pointerId);
  }, { signal });

  window.addEventListener('pointermove', (e) => {
    if (!dragging) return;
    const dx = e.clientX - dragStartX, dy = e.clientY - dragStartY;
    if (Math.abs(dx) > 3 || Math.abs(dy) > 3) hasDragged = true;
    tx = startTx + dx; ty = startTy + dy;
    apply();
  }, { signal });

  window.addEventListener('pointerup', () => {
    if (!dragging) return;
    dragging = false;
    lbImg.style.cursor = isZoomed() ? 'grab' : 'zoom-in';
  }, { signal });

  // ── Bind article images ──
  images.forEach((img, i) => {
    img.style.cursor = 'zoom-in';
    img.addEventListener('click', () => open(i), { signal });
  });

  // ── Prev / Next buttons ──
  document.getElementById('lightbox-prev')?.addEventListener('click', (e) => { e.stopPropagation(); goPrev(); }, { signal });
  document.getElementById('lightbox-next')?.addEventListener('click', (e) => { e.stopPropagation(); goNext(); }, { signal });

  // ── Backdrop click ──
  lightbox.addEventListener('click', (e) => {
    if (hasDragged) { hasDragged = false; return; }
    const target = e.target as HTMLElement;
    // Close if clicking backdrop, image (when not zoomed), or counter
    if (target === lightbox || target.classList.contains('lightbox-main') || (target === lbImg && !isZoomed())) close();
  }, { signal });

  document.getElementById('lightbox-close')?.addEventListener('click', close, { signal });

  // ── Keyboard ──
  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('open')) return;
    if (e.key === 'Escape') close();
    if (e.key === 'ArrowLeft') goPrev();
    if (e.key === 'ArrowRight') goNext();
    if (e.key === '0') { reset(); apply(); }
  }, { signal });
}
