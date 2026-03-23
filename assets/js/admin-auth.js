/**
 * Admin authentication module.
 * Uses SHA-256 hashing with Web Crypto API.
 * Session persists in sessionStorage (cleared on tab close).
 */
(function () {
  'use strict';

  // SHA-256 hash of the admin password (default: "admin123")
  var PASSWORD_HASH = '240be518fabd2724ddb6f04eeb1da5967448d7e831c08c8fa822809f74c720a9';

  function bufToHex(buf) {
    return Array.from(new Uint8Array(buf))
      .map(function (b) { return b.toString(16).padStart(2, '0'); })
      .join('');
  }

  async function hashPassword(password) {
    var encoded = new TextEncoder().encode(password);
    var hash = await crypto.subtle.digest('SHA-256', encoded);
    return bufToHex(hash);
  }

  function isAuthenticated() {
    return sessionStorage.getItem('admin_auth') === 'true';
  }

  function showDashboard() {
    var login = document.getElementById('admin-login');
    var dashboard = document.getElementById('admin-dashboard');
    if (login) login.style.display = 'none';
    if (dashboard) dashboard.style.display = 'block';
  }

  function showLogin() {
    var login = document.getElementById('admin-login');
    var dashboard = document.getElementById('admin-dashboard');
    if (login) login.style.display = 'flex';
    if (dashboard) dashboard.style.display = 'none';
  }

  async function login(password) {
    var hashed = await hashPassword(password);
    if (hashed === PASSWORD_HASH) {
      sessionStorage.setItem('admin_auth', 'true');
      showDashboard();
      return true;
    }
    return false;
  }

  function logout() {
    sessionStorage.removeItem('admin_auth');
    showLogin();
  }

  // Init on DOM ready
  document.addEventListener('DOMContentLoaded', function () {
    if (isAuthenticated()) {
      showDashboard();
    } else {
      showLogin();
    }

    // Login form handler
    var form = document.getElementById('login-form');
    if (form) {
      form.addEventListener('submit', async function (e) {
        e.preventDefault();
        var pw = document.getElementById('login-password').value;
        var err = document.getElementById('login-error');
        var success = await login(pw);
        if (!success && err) {
          err.textContent = document.documentElement.lang === 'fr'
            ? 'Mot de passe incorrect.'
            : 'Incorrect password.';
          err.style.display = 'block';
        }
      });
    }

    // Logout button
    var logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
      logoutBtn.addEventListener('click', function () {
        logout();
      });
    }
  });

  window.adminAuth = { login: login, logout: logout, isAuthenticated: isAuthenticated };
})();
