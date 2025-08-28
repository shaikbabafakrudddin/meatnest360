import { qs, qsa } from './utils.js';
import { cartCount, getUser, logout } from './storage.js';

function renderHeader(){
  const header = qs('#site-header');
  const user = getUser();
  header.innerHTML = `
    <nav class="navbar">
      <div class="nav-inner container">
        <a class="brand" href="./index.html" aria-label="ChickenNest home">
          <span class="logo">🍗</span>
          <span class="name">ChickenNest</span>
        </a>
        <button class="menu-toggle" aria-label="Toggle menu">☰</button>
        <div class="nav-links" role="menubar">
          <a href="./index.html" role="menuitem">Home</a>
          <a href="./menu.html" role="menuitem">Menu</a>
          <a href="./about.html" role="menuitem">About</a>
          <a href="./contact.html" role="menuitem">Contact</a>
        </div>
        <div class="nav-right">
          ${user ? `<span class="muted">Hi, ${user.name || user.email}</span> <a class="btn btn-ghost" id="logout-btn" href="#">Logout</a>` : `<a class="btn btn-ghost" href="./login.html">Login</a><a class="btn btn-primary" href="./signup.html">Sign up</a>`}
          <a class="btn btn-ghost cart-btn" href="./cart.html" aria-label="Cart">
            🛒<span id="cart-badge" class="cart-badge">${cartCount()}</span>
          </a>
        </div>
      </div>
    </nav>`;

  const toggle = qs('.menu-toggle', header);
  const links = qs('.nav-links', header);
  toggle?.addEventListener('click', () => links.classList.toggle('open'));
  qs('#logout-btn', header)?.addEventListener('click', (e) => { e.preventDefault(); logout(); location.href = './index.html'; });
}

function renderFooter(){
  const footer = qs('#site-footer');
  footer.innerHTML = `
    <div class="container">
      <div class="cols">
        <div>
          <div class="brand" style="margin-bottom:8px"><span class="logo">🍗</span><span class="name">ChickenNest</span></div>
          <p class="muted">Premium chicken and meat dishes delivered fast. Built with passion.</p>
        </div>
        <div>
          <strong>Company</strong>
          <div><a class="link" href="./about.html">About</a></div>
          <div><a class="link" href="./contact.html">Contact</a></div>
        </div>
        <div>
          <strong>Product</strong>
          <div><a class="link" href="./menu.html">Menu</a></div>
          <div><a class="link" href="./cart.html">Cart</a></div>
        </div>
      </div>
      <p class="muted" style="margin-top:14px">© <span id="year"></span> ChickenNest. All rights reserved.</p>
    </div>`;
  const year = new Date().getFullYear();
  qs('#year', footer).textContent = year;
}

function updateCartBadge(){
  const badge = qs('#cart-badge');
  if(badge){ badge.textContent = String(cartCount()); }
}

function init(){
  renderHeader();
  renderFooter();
  updateCartBadge();
  window.addEventListener('cart:updated', updateCartBadge);
  window.addEventListener('auth:changed', renderHeader);
}

if(document.readyState === 'loading'){
  document.addEventListener('DOMContentLoaded', init);
} else { init(); }