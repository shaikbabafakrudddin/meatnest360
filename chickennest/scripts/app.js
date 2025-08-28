import { renderFeatured, initRouter, initHeader, initAuth, updateCartBadge, revealInView, initContactForm } from './ui.js';

window.addEventListener('DOMContentLoaded', () => {
  initHeader();
  initAuth();
  renderFeatured();
  updateCartBadge();
  revealInView();
  initContactForm();
  initRouter();
});

