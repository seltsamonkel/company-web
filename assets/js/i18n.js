(function () {
  'use strict';

  var STORAGE_KEY = 'asssk.lang';
  var SUPPORTED = ['ja', 'en'];
  var DEFAULT = 'ja';

  function detectInitialLang() {
    try {
      var stored = localStorage.getItem(STORAGE_KEY);
      if (stored && SUPPORTED.indexOf(stored) !== -1) return stored;
    } catch (_) {}

    var params = new URLSearchParams(window.location.search);
    var qs = params.get('lang');
    if (qs && SUPPORTED.indexOf(qs) !== -1) return qs;

    var nav = (navigator.language || navigator.userLanguage || DEFAULT).toLowerCase();
    if (nav.indexOf('ja') === 0) return 'ja';
    if (nav.indexOf('en') === 0) return 'en';
    return DEFAULT;
  }

  function applyLang(lang) {
    if (SUPPORTED.indexOf(lang) === -1) lang = DEFAULT;

    document.documentElement.setAttribute('lang', lang);

    var nodes = document.querySelectorAll('[data-ja], [data-en]');
    for (var i = 0; i < nodes.length; i++) {
      var el = nodes[i];
      var val = el.getAttribute('data-' + lang);
      if (val !== null) el.textContent = val;
    }

    var placeholderNodes = document.querySelectorAll('[data-ja-placeholder], [data-en-placeholder]');
    for (var j = 0; j < placeholderNodes.length; j++) {
      var pEl = placeholderNodes[j];
      var pVal = pEl.getAttribute('data-' + lang + '-placeholder');
      if (pVal !== null) pEl.setAttribute('placeholder', pVal);
    }

    var buttons = document.querySelectorAll('.lang-switch button[data-lang]');
    for (var k = 0; k < buttons.length; k++) {
      var btn = buttons[k];
      btn.setAttribute('aria-pressed', btn.getAttribute('data-lang') === lang ? 'true' : 'false');
    }

    try { localStorage.setItem(STORAGE_KEY, lang); } catch (_) {}
  }

  function bindSwitch() {
    var buttons = document.querySelectorAll('.lang-switch button[data-lang]');
    for (var i = 0; i < buttons.length; i++) {
      buttons[i].addEventListener('click', function (e) {
        applyLang(e.currentTarget.getAttribute('data-lang'));
      });
    }
  }

  function setYear() {
    var el = document.getElementById('year');
    if (el) el.textContent = String(new Date().getFullYear());
  }

  document.addEventListener('DOMContentLoaded', function () {
    applyLang(detectInitialLang());
    bindSwitch();
    setYear();
  });
})();
