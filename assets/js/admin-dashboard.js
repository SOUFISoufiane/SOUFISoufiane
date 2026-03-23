/**
 * Admin dashboard — tab management & content editor.
 */
(function () {
  'use strict';

  /* ===== Tab switching ===== */
  document.addEventListener('DOMContentLoaded', function () {
    var tabs = document.querySelectorAll('.admin-tab');
    var panels = document.querySelectorAll('.tab-panel');

    tabs.forEach(function (tab) {
      tab.addEventListener('click', function () {
        tabs.forEach(function (t) { t.classList.remove('active'); });
        panels.forEach(function (p) { p.classList.remove('active'); });
        tab.classList.add('active');
        var target = document.getElementById('tab-' + tab.dataset.tab);
        if (target) target.classList.add('active');
      });
    });

    /* ===== Content editor ===== */
    var langSelect = document.getElementById('content-lang-select');
    var fieldsContainer = document.getElementById('content-editor-fields');
    var exportBtn = document.getElementById('content-export');

    if (!langSelect || !fieldsContainer || typeof translations === 'undefined') return;

    // Editable sections (skip nav, titles, footer — focus on page content)
    var editableSections = ['home', 'competences', 'projets', 'contact', 'minesweeper', 'gallery'];

    function buildEditor(lang) {
      fieldsContainer.innerHTML = '';

      editableSections.forEach(function (section) {
        if (!translations[section] || !translations[section][lang]) return;

        var group = document.createElement('div');
        group.className = 'content-editor-group';

        var title = document.createElement('h3');
        title.textContent = section.charAt(0).toUpperCase() + section.slice(1);
        group.appendChild(title);

        var keys = translations[section][lang];
        Object.keys(keys).forEach(function (key) {
          var field = document.createElement('div');
          field.className = 'content-field';

          var label = document.createElement('label');
          label.textContent = section + '.' + key;
          field.appendChild(label);

          var val = keys[key];
          if (val.length > 100 || val.includes('<')) {
            var textarea = document.createElement('textarea');
            textarea.value = val;
            textarea.dataset.section = section;
            textarea.dataset.key = key;
            textarea.dataset.lang = lang;
            field.appendChild(textarea);
          } else {
            var input = document.createElement('input');
            input.type = 'text';
            input.value = val;
            input.dataset.section = section;
            input.dataset.key = key;
            input.dataset.lang = lang;
            field.appendChild(input);
          }

          group.appendChild(field);
        });

        fieldsContainer.appendChild(group);
      });
    }

    // Initial build
    buildEditor(langSelect.value);
    langSelect.addEventListener('change', function () {
      buildEditor(this.value);
    });

    // Collect edits back into translations object
    function collectEdits() {
      var inputs = fieldsContainer.querySelectorAll('input[data-section], textarea[data-section]');
      inputs.forEach(function (el) {
        var s = el.dataset.section;
        var k = el.dataset.key;
        var l = el.dataset.lang;
        if (translations[s] && translations[s][l]) {
          translations[s][l][k] = el.value;
        }
      });
    }

    // Export i18n.js
    if (exportBtn) {
      exportBtn.addEventListener('click', function () {
        collectEdits();

        var output = '/* eslint-disable quotes */\nconst translations = ';
        output += JSON.stringify(translations, null, 2);
        output += ';\n';

        var blob = new Blob([output], { type: 'application/javascript' });
        var url = URL.createObjectURL(blob);
        var a = document.createElement('a');
        a.href = url;
        a.download = 'i18n.js';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      });
    }
  });
})();
