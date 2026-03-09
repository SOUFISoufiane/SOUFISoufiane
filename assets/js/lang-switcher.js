/**
 * Language switcher engine.
 * Reads data-i18n attributes from the DOM and replaces content
 * from the translations object defined in i18n.js.
 *
 * Each translatable element should have:
 *   data-i18n="section.key"   e.g. "home.heroTitle" or "nav.home"
 *
 * The <body> should have:
 *   data-page="home|competences|projets|gallery|contact"
 */

(function () {
  'use strict';

  function getLang() {
    var saved = localStorage.getItem('lang');
    if (saved) return saved;
    var nav = navigator.language || navigator.userLanguage || 'fr';
    return nav.startsWith('en') ? 'en' : 'fr';
  }

  function resolve(obj, path, lang) {
    var keys = path.split('.');
    var section = keys[0];
    var key = keys[1];

    if (!translations[section]) return undefined;

    // Single-level key (e.g. "footer") — structure is { fr: "...", en: "..." }
    if (!key) {
      return translations[section][lang];
    }

    // Two-level key (e.g. "home.heroTitle") — structure is { fr: { heroTitle: "..." }, en: { ... } }
    if (translations[section][lang] && translations[section][lang][key] !== undefined) {
      return translations[section][lang][key];
    }
    return undefined;
  }

  function applyLang(lang) {
    localStorage.setItem('lang', lang);
    document.documentElement.lang = lang;

    // Translate all data-i18n elements
    var els = document.querySelectorAll('[data-i18n]');
    for (var i = 0; i < els.length; i++) {
      var val = resolve(translations, els[i].dataset.i18n, lang);
      if (val !== undefined) {
        els[i].innerHTML = val;
      }
    }

    // Update page title
    var page = document.body.dataset.page;
    if (translations.titles && translations.titles[lang] && translations.titles[lang][page]) {
      document.title = translations.titles[lang][page];
    }

    // Update dropdown
    var select = document.getElementById('lang-select');
    if (select) select.value = lang;

    // Reveal body (prevents content flash)
    document.body.style.opacity = '1';
  }

  // Expose globally so the <select onchange> can call it
  window.applyLang = applyLang;

  // Apply on load
  document.addEventListener('DOMContentLoaded', function () {
    applyLang(getLang());
  });
})();
