/**
 * Admin blog editor — drafts, template generation, publish (download HTML).
 */
(function () {
  'use strict';

  var DRAFTS_KEY = 'admin_blog_drafts';

  function getDrafts() {
    try { return JSON.parse(localStorage.getItem(DRAFTS_KEY)) || []; }
    catch (e) { return []; }
  }

  function saveDrafts(drafts) {
    localStorage.setItem(DRAFTS_KEY, JSON.stringify(drafts));
  }

  /* Simple markdown-to-HTML converter (headings, bold, italic, links, paragraphs) */
  function mdToHtml(md) {
    var lines = md.split('\n');
    var html = '';
    var inParagraph = false;

    lines.forEach(function (line) {
      var trimmed = line.trim();

      // Headings
      if (trimmed.startsWith('### ')) {
        if (inParagraph) { html += '</p>'; inParagraph = false; }
        html += '<h3>' + escapeHtml(trimmed.slice(4)) + '</h3>\n';
        return;
      }
      if (trimmed.startsWith('## ')) {
        if (inParagraph) { html += '</p>'; inParagraph = false; }
        html += '<h2>' + escapeHtml(trimmed.slice(3)) + '</h2>\n';
        return;
      }
      if (trimmed.startsWith('# ')) {
        if (inParagraph) { html += '</p>'; inParagraph = false; }
        html += '<h1>' + escapeHtml(trimmed.slice(2)) + '</h1>\n';
        return;
      }

      // Blank line
      if (trimmed === '') {
        if (inParagraph) { html += '</p>\n'; inParagraph = false; }
        return;
      }

      // Regular text
      if (!inParagraph) { html += '<p>'; inParagraph = true; }
      else { html += '<br>'; }
      html += inlineFormat(escapeHtml(trimmed));
    });

    if (inParagraph) html += '</p>\n';
    return html;
  }

  function escapeHtml(str) {
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  function inlineFormat(str) {
    // Bold **text**
    str = str.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
    // Italic *text*
    str = str.replace(/\*(.+?)\*/g, '<em>$1</em>');
    // Links [text](url)
    str = str.replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>');
    return str;
  }

  /* Generate complete blog post HTML from template */
  function generatePostHtml(title, date, tags, content) {
    var tagsArray = tags.split(',').map(function (t) { return t.trim(); }).filter(Boolean);
    var tagsHtml = tagsArray.map(function (t) {
      return '<span class="blog-tag">' + escapeHtml(t) + '</span>';
    }).join(' ');

    var slug = title.toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .substring(0, 60);

    return '<!DOCTYPE html>\n' +
      '<html lang="fr">\n' +
      '<head>\n' +
      '  <meta charset="UTF-8">\n' +
      '  <meta name="viewport" content="width=device-width, initial-scale=1.0">\n' +
      '  <title>' + escapeHtml(title) + ' | Soufi Soufiane</title>\n' +
      '  <link rel="icon" type="image/png" href="../../assets/logo_ss.png">\n' +
      '  <link rel="stylesheet" href="../../assets/css/style.css">\n' +
      '  <style>\n' +
      '    body { opacity: 0; transition: opacity 0.15s ease; }\n' +
      '    .blog-post { max-width: 760px; margin: 2rem auto; padding: 0 1.5rem; }\n' +
      '    .blog-post h1 { margin-bottom: 0.3rem; }\n' +
      '    .blog-meta { color: #888; font-size: 0.9rem; margin-bottom: 1.5rem; }\n' +
      '    .blog-tag { display: inline-block; padding: 0.2rem 0.6rem; background: var(--bg-alt);\n' +
      '      border-radius: 999px; font-size: 0.75rem; margin-right: 0.3rem; }\n' +
      '    .blog-content { line-height: 1.8; }\n' +
      '    .blog-content h2 { margin-top: 2rem; }\n' +
      '    .blog-content p { margin-bottom: 1rem; }\n' +
      '    .blog-back { display: inline-block; margin-top: 2rem; color: var(--primary); }\n' +
      '  </style>\n' +
      '</head>\n' +
      '<body data-page="blog">\n' +
      '  <header>\n' +
      '    <div class="header-inner">\n' +
      '      <a href="../../"><img src="../../assets/logo_ss.png" alt="SS Logo"></a>\n' +
      '      <h1>Blog</h1>\n' +
      '    </div>\n' +
      '  </header>\n\n' +
      '  <nav>\n' +
      '    <ul>\n' +
      '      <li><a href="../../" data-i18n="nav.home">Accueil</a></li>\n' +
      '      <li><a href="../../competences/" data-i18n="nav.skills">Comp&eacute;tences</a></li>\n' +
      '      <li><a href="../../projets/" data-i18n="nav.projects">Projets</a></li>\n' +
      '      <li><a href="../../gallery/" data-i18n="nav.gallery">Galerie</a></li>\n' +
      '      <li><a href="../../contact/" data-i18n="nav.contact">Contact</a></li>\n' +
      '      <li><a href="../../blog/" class="active" data-i18n="nav.blog">Blog</a></li>\n' +
      '      <li><a href="../../admin/" data-i18n="nav.admin">Admin</a></li>\n' +
      '      <li class="lang-switcher">\n' +
      '        <select id="lang-select" onchange="applyLang(this.value)">\n' +
      '          <option value="fr">FR Fran&ccedil;ais</option>\n' +
      '          <option value="en">EN English</option>\n' +
      '        </select>\n' +
      '      </li>\n' +
      '    </ul>\n' +
      '  </nav>\n\n' +
      '  <article class="blog-post">\n' +
      '    <h1>' + escapeHtml(title) + '</h1>\n' +
      '    <div class="blog-meta">' + escapeHtml(date) + (tagsHtml ? ' &mdash; ' + tagsHtml : '') + '</div>\n' +
      '    <div class="blog-content">\n' +
      '      ' + mdToHtml(content) + '\n' +
      '    </div>\n' +
      '    <a href="../" class="blog-back">&larr; Retour au blog</a>\n' +
      '  </article>\n\n' +
      '  <footer>\n' +
      '    <span data-i18n="footer">Soufi Soufiane &mdash; &Eacute;tudiant en BUT GEII.</span>\n' +
      '  </footer>\n\n' +
      '  <script src="../../assets/js/i18n.js"><\/script>\n' +
      '  <script src="../../assets/js/lang-switcher.js"><\/script>\n' +
      '</body>\n' +
      '</html>';
  }

  /* Render drafts list */
  function renderDrafts() {
    var container = document.getElementById('drafts-list');
    if (!container) return;

    var drafts = getDrafts();
    if (drafts.length === 0) {
      var lang = document.documentElement.lang;
      container.innerHTML = '<p style="color:var(--text-muted);font-size:0.9rem;">' +
        (lang === 'fr' ? 'Aucun brouillon.' : 'No drafts.') + '</p>';
      return;
    }

    container.innerHTML = '';
    drafts.forEach(function (draft, i) {
      var item = document.createElement('div');
      item.className = 'draft-item';
      item.innerHTML =
        '<span><strong>' + escapeHtml(draft.title || 'Sans titre') + '</strong> &mdash; ' +
        escapeHtml(draft.date || '') + '</span>' +
        '<div class="draft-actions">' +
        '<button class="btn-secondary" data-action="edit" data-index="' + i + '">&#9998;</button>' +
        '<button class="btn-danger" data-action="delete" data-index="' + i + '">&times;</button>' +
        '</div>';
      container.appendChild(item);
    });

    // Event delegation for draft actions
    container.onclick = function (e) {
      var btn = e.target.closest('button');
      if (!btn) return;
      var idx = parseInt(btn.dataset.index);
      var action = btn.dataset.action;

      if (action === 'delete') {
        var d = getDrafts();
        d.splice(idx, 1);
        saveDrafts(d);
        renderDrafts();
      } else if (action === 'edit') {
        var d2 = getDrafts();
        var draft = d2[idx];
        document.getElementById('blog-title').value = draft.title || '';
        document.getElementById('blog-date').value = draft.date || '';
        document.getElementById('blog-tags').value = draft.tags || '';
        document.getElementById('blog-content').value = draft.content || '';
        // Remove from drafts (will be re-saved when user saves)
        d2.splice(idx, 1);
        saveDrafts(d2);
        renderDrafts();
      }
    };
  }

  /* Get form data */
  function getFormData() {
    return {
      title: (document.getElementById('blog-title').value || '').trim(),
      date: (document.getElementById('blog-date').value || ''),
      tags: (document.getElementById('blog-tags').value || '').trim(),
      content: (document.getElementById('blog-content').value || '').trim()
    };
  }

  function clearForm() {
    document.getElementById('blog-title').value = '';
    document.getElementById('blog-date').value = '';
    document.getElementById('blog-tags').value = '';
    document.getElementById('blog-content').value = '';
  }

  document.addEventListener('DOMContentLoaded', function () {
    // Set default date to today
    var dateInput = document.getElementById('blog-date');
    if (dateInput && !dateInput.value) {
      dateInput.value = new Date().toISOString().split('T')[0];
    }

    renderDrafts();

    // Save draft
    var saveDraftBtn = document.getElementById('blog-save-draft');
    if (saveDraftBtn) {
      saveDraftBtn.addEventListener('click', function () {
        var data = getFormData();
        if (!data.title && !data.content) return;
        var drafts = getDrafts();
        drafts.unshift(data);
        saveDrafts(drafts);
        clearForm();
        renderDrafts();
      });
    }

    // Publish (download HTML)
    var publishBtn = document.getElementById('blog-publish');
    if (publishBtn) {
      publishBtn.addEventListener('click', function () {
        var data = getFormData();
        if (!data.title) {
          alert(document.documentElement.lang === 'fr'
            ? 'Veuillez saisir un titre.'
            : 'Please enter a title.');
          return;
        }

        var html = generatePostHtml(data.title, data.date, data.tags, data.content);
        var slug = data.title.toLowerCase()
          .replace(/[^a-z0-9\s-]/g, '')
          .replace(/\s+/g, '-')
          .substring(0, 60);
        var filename = slug + '.html';

        var blob = new Blob([html], { type: 'text/html' });
        var url = URL.createObjectURL(blob);
        var a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      });
    }
  });
})();
