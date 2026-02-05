/**
 * Lightweight X (Twitter) Feed Popup
 * Drop this into your website to show latest posts in a popup
 * 
 * Usage:
 * 1. Include this JS file: <script src="x-feed-popup.js"></script>
 * 2. Add the X icon button with class "x-feed-trigger"
 * 3. Set data-x-handle="yourusername" on the button
 */

(function() {
  'use strict';

  // Configuration
  const CONFIG = {
    popupWidth: 400,
    popupHeight: 500,
    theme: 'auto' // 'auto', 'light', or 'dark'
  };

  // Merge with global config if set
  if (window.XFeedPopupConfig) {
    Object.assign(CONFIG, window.XFeedPopupConfig);
  }

  // Inject required styles
  function injectStyles() {
    if (document.getElementById('x-feed-popup-styles')) return;
    
    const styles = `
      .x-feed-popup-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.6);
        backdrop-filter: blur(4px);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 9999;
        opacity: 0;
        visibility: hidden;
        transition: opacity 0.3s ease, visibility 0.3s ease;
      }
      
      .x-feed-popup-overlay.active {
        opacity: 1;
        visibility: visible;
      }
      
      .x-feed-popup {
        background: #fff;
        border-radius: 16px;
        width: 90%;
        max-width: ${CONFIG.popupWidth}px;
        max-height: 90vh;
        box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
        transform: scale(0.9) translateY(20px);
        transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
        overflow: hidden;
        display: flex;
        flex-direction: column;
      }
      
      .x-feed-popup-overlay.active .x-feed-popup {
        transform: scale(1) translateY(0);
      }
      
      .x-feed-popup-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 16px 20px;
        border-bottom: 1px solid #e5e7eb;
        background: #fff;
      }
      
      .x-feed-popup-header h3 {
        margin: 0;
        font-size: 16px;
        font-weight: 600;
        color: #0f1419;
        display: flex;
        align-items: center;
        gap: 8px;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      }
      
      .x-feed-popup-header .x-logo {
        width: 20px;
        height: 20px;
      }
      
      .x-feed-popup-close {
        background: none;
        border: none;
        cursor: pointer;
        padding: 8px;
        border-radius: 50%;
        transition: background 0.2s ease;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      
      .x-feed-popup-close:hover {
        background: #f3f4f6;
      }
      
      .x-feed-popup-close svg {
        width: 20px;
        height: 20px;
        stroke: #6b7280;
      }
      
      .x-feed-popup-content {
        flex: 1;
        overflow-y: auto;
        padding: 0;
        background: #f7f9f9;
        min-height: 300px;
      }
      
      .x-feed-popup-footer {
        padding: 12px 20px;
        border-top: 1px solid #e5e7eb;
        text-align: center;
        background: #fff;
      }
      
      .x-feed-popup-footer a {
        color: #1d9bf0;
        text-decoration: none;
        font-size: 14px;
        font-weight: 500;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      }
      
      .x-feed-popup-footer a:hover {
        text-decoration: underline;
      }
      
      /* Profile Preview Card */
      .x-feed-profile {
        padding: 32px 24px;
        text-align: center;
        background: linear-gradient(135deg, #1da1f2 0%, #0d8bd9 100%);
        color: white;
        position: relative;
        overflow: hidden;
      }
      
      .x-feed-profile::before {
        content: '';
        position: absolute;
        top: -50%;
        left: -50%;
        width: 200%;
        height: 200%;
        background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 60%);
        pointer-events: none;
      }
      
      .x-feed-profile-avatar {
        width: 80px;
        height: 80px;
        border-radius: 50%;
        background: rgba(255,255,255,0.2);
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 0 auto 16px;
        border: 3px solid rgba(255,255,255,0.3);
        position: relative;
        z-index: 1;
      }
      
      .x-feed-profile-avatar svg {
        width: 40px;
        height: 40px;
        fill: white;
      }
      
      .x-feed-profile h4 {
        font-size: 22px;
        margin: 0 0 4px;
        font-weight: 700;
        position: relative;
        z-index: 1;
      }
      
      .x-feed-profile p {
        font-size: 14px;
        opacity: 0.9;
        margin: 0 0 24px;
        position: relative;
        z-index: 1;
      }
      
      .x-feed-profile-btn {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        padding: 12px 28px;
        background: white;
        color: #1da1f2;
        border-radius: 50px;
        text-decoration: none;
        font-weight: 600;
        font-size: 14px;
        transition: all 0.2s ease;
        position: relative;
        z-index: 1;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
      }
      
      .x-feed-profile-btn:hover {
        transform: translateY(-2px);
        box-shadow: 0 8px 20px rgba(0,0,0,0.2);
      }
      
      .x-feed-profile-btn svg {
        width: 16px;
        height: 16px;
        fill: currentColor;
      }
      
      /* Quick Stats */
      .x-feed-stats {
        display: flex;
        justify-content: center;
        gap: 32px;
        padding: 20px 24px;
        background: #fff;
        border-bottom: 1px solid #e5e7eb;
      }
      
      .x-feed-stat {
        text-align: center;
      }
      
      .x-feed-stat-value {
        font-size: 18px;
        font-weight: 700;
        color: #0f1419;
        display: block;
      }
      
      .x-feed-stat-label {
        font-size: 12px;
        color: #536471;
        text-transform: uppercase;
        letter-spacing: 0.5px;
      }
      
      /* Recent Posts Preview */
      .x-feed-posts {
        padding: 16px;
        background: #f7f9f9;
      }
      
      .x-feed-posts-title {
        font-size: 13px;
        font-weight: 600;
        color: #536471;
        text-transform: uppercase;
        letter-spacing: 0.5px;
        margin: 0 0 12px 8px;
      }
      
      .x-feed-post-item {
        background: #fff;
        border-radius: 12px;
        padding: 16px;
        margin-bottom: 12px;
        border: 1px solid #e5e7eb;
        transition: all 0.2s ease;
      }
      
      .x-feed-post-item:hover {
        border-color: #1d9bf0;
        box-shadow: 0 2px 8px rgba(29, 155, 240, 0.1);
      }
      
      .x-feed-post-item:last-child {
        margin-bottom: 0;
      }
      
      .x-feed-post-header {
        display: flex;
        align-items: center;
        gap: 10px;
        margin-bottom: 10px;
      }
      
      .x-feed-post-avatar {
        width: 36px;
        height: 36px;
        border-radius: 50%;
        background: #000;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      
      .x-feed-post-avatar svg {
        width: 18px;
        height: 18px;
        fill: white;
      }
      
      .x-feed-post-meta {
        flex: 1;
      }
      
      .x-feed-post-name {
        font-size: 14px;
        font-weight: 700;
        color: #0f1419;
        display: block;
        line-height: 1.3;
      }
      
      .x-feed-post-handle {
        font-size: 13px;
        color: #536471;
      }
      
      .x-feed-post-text {
        font-size: 14px;
        color: #0f1419;
        line-height: 1.5;
        margin: 0;
      }
      
      .x-feed-post-link {
        text-decoration: none;
        color: inherit;
        display: block;
      }
      
      /* Dark theme */
      .x-feed-popup.dark {
        background: #15202b;
      }
      
      .x-feed-popup.dark .x-feed-popup-header {
        background: #15202b;
        border-color: #38444d;
      }
      
      .x-feed-popup.dark .x-feed-popup-header h3 {
        color: #e7e9ea;
      }
      
      .x-feed-popup.dark .x-feed-popup-close:hover {
        background: #1e2732;
      }
      
      .x-feed-popup.dark .x-feed-popup-content {
        background: #0f1419;
      }
      
      .x-feed-popup.dark .x-feed-popup-footer {
        background: #15202b;
        border-color: #38444d;
      }
      
      .x-feed-popup.dark .x-feed-stats {
        background: #15202b;
        border-color: #38444d;
      }
      
      .x-feed-popup.dark .x-feed-stat-value {
        color: #e7e9ea;
      }
      
      .x-feed-popup.dark .x-feed-stat-label {
        color: #8899a6;
      }
      
      .x-feed-popup.dark .x-feed-posts {
        background: #0f1419;
      }
      
      .x-feed-popup.dark .x-feed-posts-title {
        color: #8899a6;
      }
      
      .x-feed-popup.dark .x-feed-post-item {
        background: #15202b;
        border-color: #38444d;
      }
      
      .x-feed-popup.dark .x-feed-post-item:hover {
        border-color: #1d9bf0;
      }
      
      .x-feed-popup.dark .x-feed-post-name {
        color: #e7e9ea;
      }
      
      .x-feed-popup.dark .x-feed-post-handle {
        color: #8899a6;
      }
      
      .x-feed-popup.dark .x-feed-post-text {
        color: #e7e9ea;
      }
      
      /* Auto dark mode based on system preference */
      @media (prefers-color-scheme: dark) {
        .x-feed-popup:not(.light) {
          background: #15202b;
        }
        
        .x-feed-popup:not(.light) .x-feed-popup-header {
          background: #15202b;
          border-color: #38444d;
        }
        
        .x-feed-popup:not(.light) .x-feed-popup-header h3 {
          color: #e7e9ea;
        }
        
        .x-feed-popup:not(.light) .x-feed-popup-close:hover {
          background: #1e2732;
        }
        
        .x-feed-popup:not(.light) .x-feed-popup-content {
          background: #0f1419;
        }
        
        .x-feed-popup:not(.light) .x-feed-popup-footer {
          background: #15202b;
          border-color: #38444d;
        }
        
        .x-feed-popup:not(.light) .x-feed-stats {
          background: #15202b;
          border-color: #38444d;
        }
        
        .x-feed-popup:not(.light) .x-feed-stat-value {
          color: #e7e9ea;
        }
        
        .x-feed-popup:not(.light) .x-feed-stat-label {
          color: #8899a6;
        }
        
        .x-feed-popup:not(.light) .x-feed-posts {
          background: #0f1419;
        }
        
        .x-feed-popup:not(.light) .x-feed-posts-title {
          color: #8899a6;
        }
        
        .x-feed-popup:not(.light) .x-feed-post-item {
          background: #15202b;
          border-color: #38444d;
        }
        
        .x-feed-popup:not(.light) .x-feed-post-item:hover {
          border-color: #1d9bf0;
        }
        
        .x-feed-popup:not(.light) .x-feed-post-name {
          color: #e7e9ea;
        }
        
        .x-feed-popup:not(.light) .x-feed-post-handle {
          color: #8899a6;
        }
        
        .x-feed-popup:not(.light) .x-feed-post-text {
          color: #e7e9ea;
        }
      }
      
      /* Trigger button styles (optional) */
      .x-feed-trigger {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 48px;
        height: 48px;
        border-radius: 50%;
        background: #000;
        border: none;
        cursor: pointer;
        transition: transform 0.2s ease, box-shadow 0.2s ease;
      }
      
      .x-feed-trigger:hover {
        transform: translateY(-2px);
        box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
      }
      
      .x-feed-trigger svg {
        width: 24px;
        height: 24px;
        fill: #fff;
      }
    `;
    
    const styleEl = document.createElement('style');
    styleEl.id = 'x-feed-popup-styles';
    styleEl.textContent = styles;
    document.head.appendChild(styleEl);
  }

  // Get theme based on config
  function getTheme() {
    if (CONFIG.theme === 'auto') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return CONFIG.theme;
  }

  // Create popup HTML
  function createPopup(handle) {
    const theme = getTheme();
    const overlay = document.createElement('div');
    overlay.className = 'x-feed-popup-overlay';
    overlay.innerHTML = `
      <div class="x-feed-popup ${theme}" role="dialog" aria-modal="true" aria-label="X Posts from @${handle}">
        <div class="x-feed-popup-header">
          <h3>
            <svg class="x-logo" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
            </svg>
            @${handle}
          </h3>
          <button class="x-feed-popup-close" aria-label="Close popup">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M18 6L6 18M6 6l12 12"/>
            </svg>
          </button>
        </div>
        <div class="x-feed-popup-content">
          <!-- Content will be injected here -->
        </div>
        <div class="x-feed-popup-footer">
          <a href="https://x.com/${handle}" target="_blank" rel="noopener noreferrer">
            View on X →
          </a>
        </div>
      </div>
    `;
    
    // Close on overlay click
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) closePopup(overlay);
    });
    
    // Close on button click
    overlay.querySelector('.x-feed-popup-close').addEventListener('click', () => {
      closePopup(overlay);
    });
    
    // Close on Escape key
    const escapeHandler = (e) => {
      if (e.key === 'Escape') {
        closePopup(overlay);
        document.removeEventListener('keydown', escapeHandler);
      }
    };
    document.addEventListener('keydown', escapeHandler);
    
    return overlay;
  }

  // Close popup
  function closePopup(overlay) {
    overlay.classList.remove('active');
    setTimeout(() => overlay.remove(), 300);
  }

  // Render profile preview
  function renderProfile(handle, container) {
    const content = container.querySelector('.x-feed-popup-content');
    
    content.innerHTML = `
      <div class="x-feed-profile">
        <div class="x-feed-profile-avatar">
          <svg viewBox="0 0 24 24">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
          </svg>
        </div>
        <h4>@${handle}</h4>
        <p>View the latest posts on X</p>
        <a href="https://x.com/${handle}" target="_blank" rel="noopener noreferrer" class="x-feed-profile-btn">
          <svg viewBox="0 0 24 24">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
          </svg>
          View Profile
        </a>
      </div>
      
      <div class="x-feed-stats">
        <div class="x-feed-stat">
          <span class="x-feed-stat-value">Posts</span>
          <span class="x-feed-stat-label">Latest</span>
        </div>
        <div class="x-feed-stat">
          <span class="x-feed-stat-value">X</span>
          <span class="x-feed-stat-label">Platform</span>
        </div>
        <div class="x-feed-stat">
          <span class="x-feed-stat-value">Live</span>
          <span class="x-feed-stat-label">Updates</span>
        </div>
      </div>
      
      <div class="x-feed-posts">
        <div class="x-feed-posts-title">Recent Activity</div>
        
        <a href="https://x.com/${handle}" target="_blank" rel="noopener noreferrer" class="x-feed-post-link">
          <div class="x-feed-post-item">
            <div class="x-feed-post-header">
              <div class="x-feed-post-avatar">
                <svg viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </div>
              <div class="x-feed-post-meta">
                <span class="x-feed-post-name">@${handle}</span>
                <span class="x-feed-post-handle">Click to view on X</span>
              </div>
            </div>
            <p class="x-feed-post-text">View the latest posts, updates, and announcements from @${handle} on X.</p>
          </div>
        </a>
        
        <a href="https://x.com/${handle}/with_replies" target="_blank" rel="noopener noreferrer" class="x-feed-post-link">
          <div class="x-feed-post-item">
            <div class="x-feed-post-header">
              <div class="x-feed-post-avatar">
                <svg viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </div>
              <div class="x-feed-post-meta">
                <span class="x-feed-post-name">Replies & Interactions</span>
                <span class="x-feed-post-handle">See conversations</span>
              </div>
            </div>
            <p class="x-feed-post-text">Check out replies, mentions, and interactions from @${handle}.</p>
          </div>
        </a>
        
        <a href="https://x.com/${handle}/media" target="_blank" rel="noopener noreferrer" class="x-feed-post-link">
          <div class="x-feed-post-item">
            <div class="x-feed-post-header">
              <div class="x-feed-post-avatar">
                <svg viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </div>
              <div class="x-feed-post-meta">
                <span class="x-feed-post-name">Media & Photos</span>
                <span class="x-feed-post-handle">View media content</span>
              </div>
            </div>
            <p class="x-feed-post-text">Browse photos, videos, and media shared by @${handle}.</p>
          </div>
        </a>
      </div>
    `;
  }

  // Open popup for a handle
  function openPopup(handle) {
    // Remove existing popup if any
    const existing = document.querySelector('.x-feed-popup-overlay');
    if (existing) existing.remove();
    
    const popup = createPopup(handle);
    document.body.appendChild(popup);
    
    // Render profile content
    renderProfile(handle, popup);
    
    // Trigger animation
    requestAnimationFrame(() => {
      popup.classList.add('active');
    });
  }

  // Initialize
  function init() {
    injectStyles();
    
    // Find all trigger buttons and attach click handlers
    document.querySelectorAll('.x-feed-trigger').forEach(trigger => {
      trigger.addEventListener('click', (e) => {
        e.preventDefault();
        const handle = trigger.dataset.xHandle;
        if (handle) {
          openPopup(handle);
        } else {
          console.error('x-feed-trigger missing data-x-handle attribute');
        }
      });
    });
  }

  // Auto-initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
  
  // Expose API globally
  window.XFeedPopup = {
    open: openPopup,
    config: (options) => {
      Object.assign(CONFIG, options);
      const existingStyles = document.getElementById('x-feed-popup-styles');
      if (existingStyles) existingStyles.remove();
      injectStyles();
    }
  };
})();
