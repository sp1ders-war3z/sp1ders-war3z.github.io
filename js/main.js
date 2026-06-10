(function () {
  'use strict';

  const bootLines = [
    '[ OK ] Initializing SP1DER kernel...',
    '[ OK ] Bypassing firewall ruleset...',
    '[ OK ] Mounting /dev/shadow_nodes...',
    '[ OK ] Trace route: NULL — you\'re clear.',
    '>>> ACCESS NODE READY <<<'
  ];

  const bootLog = document.getElementById('bootLog');
  const nodeCards = document.querySelectorAll('.node-card');
  const panels = document.querySelectorAll('.panel');

  function runBootSequence() {
    if (!bootLog) return;

    bootLog.classList.add('visible');
    let delay = 0;

    bootLines.forEach(function (line, i) {
      setTimeout(function () {
        const el = document.createElement('span');
        el.className = 'line';
        el.textContent = line;
        bootLog.appendChild(el);

        if (i === bootLines.length - 1) {
          setTimeout(function () {
            bootLog.style.opacity = '0.4';
          }, 2000);
        }
      }, delay);
      delay += 400;
    });
  }

  function openPanel(id) {
    const panel = document.getElementById('panel-' + id);
    if (panel && typeof panel.showModal === 'function') {
      panel.showModal();
    }
  }

  function closePanel(panel) {
    if (panel && typeof panel.close === 'function') {
      panel.close();
    }
  }

  nodeCards.forEach(function (card) {
    card.addEventListener('click', function () {
      const panelId = card.getAttribute('data-panel');
      if (panelId) openPanel(panelId);
    });
  });

  panels.forEach(function (panel) {
    const closeBtn = panel.querySelector('.panel-close');
    if (closeBtn) {
      closeBtn.addEventListener('click', function () {
        closePanel(panel);
      });
    }

    panel.addEventListener('click', function (e) {
      if (e.target === panel) closePanel(panel);
    });

    panel.addEventListener('cancel', function (e) {
      e.preventDefault();
      closePanel(panel);
    });
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      panels.forEach(function (panel) {
        if (panel.open) closePanel(panel);
      });
    }
  });

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', runBootSequence);
  } else {
    runBootSequence();
  }
})();
