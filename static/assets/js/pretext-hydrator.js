// static/js/pretext-hydrator.js
export async function hydratePretextAll(opts = {}) {
  const mod = await import('/assets/js/pretext.js'); // dist/layout.js copié en /js/pretext.js
  const { prepareWithSegments, layoutWithLines } = mod;
  const lineHeight = opts.lineHeight || 20;

  function hydrateEl(el) {
    const original = el.getAttribute('data-original-text') || el.textContent || '';
    const font = {
      family: getComputedStyle(el).fontFamily,
      size: parseFloat(getComputedStyle(el).fontSize) || 16,
    };
    const maxWidth = el.clientWidth || document.documentElement.clientWidth * 0.9;
    return prepareWithSegments(original, font, { whiteSpace: 'normal' })
      .then(prepared => {
        const result = layoutWithLines(prepared, Math.floor(maxWidth), lineHeight);
        // replace content with line blocks (simple rendering)
        el.innerHTML = '';
        result.lines.forEach(l => {
          const d = document.createElement('div');
          d.className = 'pt-line';
          d.textContent = l.text;
          el.appendChild(d);
        });
      })
      .catch(e => console.error('pretext hydrate fail', e));
  }

  const els = Array.from(document.querySelectorAll('.pretext-hydrate'));
  await Promise.all(els.map(el => hydrateEl(el)));
}
