/**
 * Bifröst Network S.A.S. - Linktree Controller
 * Handles theme switching (Light / Dark mode), SVG logo swapping,
 * and native web share / clipboard interactions.
 */

(function () {
  'use strict';

  // DOM Elements
  const themeToggleBtn = document.getElementById('theme-toggle-btn');
  const brandLogoImg = document.getElementById('brand-logo-img');
  const shareBtn = document.getElementById('share-btn');
  const toastNotice = document.getElementById('toast-notice');

  // SVG Paths corresponding to Brand Manual
  // sector1: Vertical logo with dark text (Light mode)
  // sector21: Vertical logo with white text (Dark mode)
  const LOGO_LIGHT = 'assets/images/svg/sector1.svg';
  const LOGO_DARK = 'assets/images/svg/sector21.svg';

  const STORAGE_KEY = 'bifrost_theme_preference';

  /**
   * Determine preferred initial theme:
   * 1. Stored preference in localStorage
   * 2. OS preference via prefers-color-scheme
   * 3. Default to 'dark' (high-tech fiber aesthetic)
   */
  function getPreferredTheme() {
    const storedTheme = localStorage.getItem(STORAGE_KEY);
    if (storedTheme === 'light' || storedTheme === 'dark') {
      return storedTheme;
    }
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
      return 'light';
    }
    return 'dark';
  }

  /**
   * Apply theme to the document and swap assets
   * @param {'light'|'dark'} theme
   */
  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);

    // Swap brand logo SVG
    if (brandLogoImg) {
      const targetSrc = theme === 'light' ? LOGO_LIGHT : LOGO_DARK;
      if (brandLogoImg.getAttribute('src') !== targetSrc) {
        brandLogoImg.style.opacity = '0';
        brandLogoImg.style.transform = 'scale(0.96)';
        setTimeout(() => {
          brandLogoImg.setAttribute('src', targetSrc);
          brandLogoImg.style.opacity = '1';
          brandLogoImg.style.transform = 'scale(1)';
        }, 120);
      }
    }

    // Update toggle button icon and aria-label
    if (themeToggleBtn) {
      const isDark = theme === 'dark';
      themeToggleBtn.setAttribute('aria-label', isDark ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro');
      themeToggleBtn.setAttribute('title', isDark ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro');

      // Update inner icon: Sun for dark mode (to switch to light), Moon for light mode (to switch to dark)
      themeToggleBtn.innerHTML = isDark
        ? `<!-- Sun Icon -->
           <svg viewBox="0 0 24 24" aria-hidden="true">
             <circle cx="12" cy="12" r="5"></circle>
             <line x1="12" y1="1" x2="12" y2="3"></line>
             <line x1="12" y1="21" x2="12" y2="23"></line>
             <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
             <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
             <line x1="1" y1="12" x2="3" y2="12"></line>
             <line x1="21" y1="12" x2="23" y2="12"></line>
             <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
             <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
           </svg>`
        : `<!-- Moon Icon -->
           <svg viewBox="0 0 24 24" aria-hidden="true">
             <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
           </svg>`;
    }
  }

  // Toggle Theme Handler
  function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
    const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
    localStorage.setItem(STORAGE_KEY, nextTheme);
    applyTheme(nextTheme);
  }

  // Show Toast Notification
  let toastTimer = null;
  function showToast(message) {
    if (!toastNotice) return;
    toastNotice.querySelector('.toast-text').textContent = message;
    toastNotice.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toastNotice.classList.remove('show');
    }, 2800);
  }

  // Handle Share / Copy Link
  async function handleShare() {
    const shareData = {
      title: 'Bifröst Network S.A.S. - Enlaces Oficiales',
      text: 'Conéctate con Bifröst Network: Internet 100% fibra óptica de alta velocidad.',
      url: window.location.href,
    };

    if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        if (err.name !== 'AbortError') {
          copyToClipboard();
        }
      }
    } else {
      copyToClipboard();
    }
  }

  function copyToClipboard() {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(window.location.href).then(() => {
        showToast('¡Enlace copiado al portapapeles!');
      }).catch(() => {
        fallbackCopy();
      });
    } else {
      fallbackCopy();
    }
  }

  function fallbackCopy() {
    const tempInput = document.createElement('input');
    tempInput.value = window.location.href;
    document.body.appendChild(tempInput);
    tempInput.select();
    try {
      document.execCommand('copy');
      showToast('¡Enlace copiado al portapapeles!');
    } catch (e) {
      showToast('Copia la URL desde el navegador');
    }
    document.body.removeChild(tempInput);
  }

  // Initialization
  const initialTheme = getPreferredTheme();
  applyTheme(initialTheme);

  // Event Listeners
  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', toggleTheme);
  }

  if (shareBtn) {
    shareBtn.addEventListener('click', handleShare);
  }

  // Listen to OS theme changes if user hasn't explicitly set preference
  if (window.matchMedia) {
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      const userHasCustomPreference = localStorage.getItem(STORAGE_KEY);
      if (!userHasCustomPreference) {
        applyTheme(e.matches ? 'dark' : 'light');
      }
    });
  }
})();
