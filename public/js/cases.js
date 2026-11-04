// Recent Matters: the side panel on the home page and "Related Matters" on every
// case. Panels and cards are put into the home page at build time
// (scripts/home-cases.mjs); this file only opens, closes and shuffles them.
(function () {
  var backdrop = document.getElementById('caseBackdrop');
  var page = document.querySelector('.xx-page');

  // Three other cases at random, every time a panel opens or a case page loads.
  function shuffleRelated(panel) {
    var cards = Array.prototype.slice.call(panel.querySelectorAll('.popup__related-card'));
    for (var i = cards.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var t = cards[i]; cards[i] = cards[j]; cards[j] = t;
    }
    cards.forEach(function (c, k) { c.hidden = k >= 3; if (k < 3) c.parentNode.appendChild(c); });
  }

  document.querySelectorAll('.popup--page').forEach(shuffleRelated);
  if (!backdrop) return; // a case page: related cards are plain links

  function panelFor(slug) { return document.getElementById('popup-' + slug); }

  function open(slug) {
    var panel = panelFor(slug);
    if (!panel) return false;
    close();
    shuffleRelated(panel);
    panel.classList.add('active');
    backdrop.classList.add('active');
    if (page) page.classList.add('dimmed');
    panel.scrollTop = 0;
    document.body.style.overflow = 'hidden';
    return true;
  }

  function close() {
    document.querySelectorAll('.popup.active').forEach(function (p) {
      p.classList.remove('active');
      p.style.transform = '';
      p.style.transition = '';
    });
    backdrop.classList.remove('active');
    if (page) page.classList.remove('dimmed');
    document.body.style.overflow = '';
  }

  document.addEventListener('click', function (e) {
    var link = e.target.closest('[data-case]');
    if (link && open(link.getAttribute('data-case'))) { e.preventDefault(); return; }
    if (e.target.closest('[data-case-close]') || e.target === backdrop) close();
  });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') close(); });

  // Swipe down to close the bottom sheet on phones (designer's behaviour, v5).
  var startY = 0, currentY = 0, dragging = false, active = null;
  function isMobile() { return window.innerWidth <= 920; }
  document.querySelectorAll('.popup').forEach(function (popup) {
    popup.addEventListener('touchstart', function (e) {
      if (!isMobile()) return;
      var touch = e.touches[0];
      if (e.target.closest('.popup__drag-handle') || (popup.scrollTop <= 5 && touch.clientY < 120)) {
        startY = currentY = touch.clientY;
        dragging = true; active = popup;
        popup.style.transition = 'none';
      }
    }, { passive: true });
    popup.addEventListener('touchmove', function (e) {
      if (!dragging || !active) return;
      currentY = e.touches[0].clientY;
      var dy = currentY - startY;
      if (dy > 0) {
        active.style.transform = 'translateY(' + dy + 'px)';
        backdrop.style.opacity = 1 - Math.min(dy / 300, 1) * 0.6;
      }
    }, { passive: true });
    popup.addEventListener('touchend', function () {
      if (!dragging || !active) return;
      var dy = currentY - startY, p = active;
      dragging = false; active = null;
      p.style.transition = 'transform 300ms cubic-bezier(.32,.72,.24,1)';
      if (dy > 120) {
        p.style.transform = 'translateY(100%)';
        backdrop.style.transition = 'opacity 300ms ease';
        backdrop.style.opacity = '0';
        setTimeout(function () { close(); backdrop.style.transition = ''; backdrop.style.opacity = ''; }, 310);
      } else {
        p.style.transform = 'translateY(0)';
        backdrop.style.transition = 'opacity 200ms ease';
        backdrop.style.opacity = '';
        setTimeout(function () { p.style.transition = ''; p.style.transform = ''; }, 310);
      }
    }, { passive: true });
  });
})();
