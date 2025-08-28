import { MENU_ITEMS, CATEGORIES } from './data.js';
import { addToCart, getCart, updateQty, removeFromCart, clearCart, calculateSummary } from './cart.js';
import { getCurrentUser, login, signup, logout } from './auth.js';

const views = ['home', 'menu', 'cart', 'about', 'contact'];

function formatCurrency(amount) {
  return `₹${amount.toLocaleString('en-IN')}`;
}

function setActiveView(id) {
  for (const view of views) {
    const el = document.getElementById(view);
    if (!el) continue;
    el.classList.toggle('active', view === id);
  }
  document.getElementById(id)?.focus({ preventScroll: true });
  // update active nav link
  document.querySelectorAll('.nav-link').forEach(a => {
    const to = a.getAttribute('href')?.replace('#','');
    a.classList.toggle('active', to === id);
  });
}

export function initRouter() {
  function handleHash() {
    const hash = location.hash.replace('#', '') || 'home';
    if (!views.includes(hash)) {
      setActiveView('home');
      return;
    }
    setActiveView(hash);
    if (hash === 'menu') renderMenu();
    if (hash === 'cart') renderCart();
  }
  window.addEventListener('hashchange', handleHash);
  handleHash();
}

export function initHeader() {
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  const hamburger = document.getElementById('hamburgerBtn');
  const navLinks = document.getElementById('navLinks');
  hamburger?.addEventListener('click', () => {
    const expanded = hamburger.getAttribute('aria-expanded') === 'true';
    hamburger.setAttribute('aria-expanded', String(!expanded));
    navLinks?.classList.toggle('show');
  });

  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => navLinks?.classList.remove('show'));
  });
}

export function initAuth() {
  const authBtn = document.getElementById('authBtn');
  const modal = document.getElementById('authModal');
  const close = document.getElementById('closeAuth');
  const tabs = modal.querySelectorAll('.tab');
  const loginForm = document.getElementById('loginForm');
  const signupForm = document.getElementById('signupForm');

  function refreshAuthUi() {
    const user = getCurrentUser();
    const isLoggedIn = !!user;
    const label = isLoggedIn ? `Hi, ${user.name.split(' ')[0]}` : 'Login / Signup';
    authBtn.textContent = label;
    authBtn.classList.toggle('btn-ghost', !isLoggedIn);
    authBtn.classList.toggle('btn-outline', isLoggedIn);
  }

  function openModal() { modal.classList.add('show'); }
  function closeModal() { modal.classList.remove('show'); }

  authBtn?.addEventListener('click', () => {
    const user = getCurrentUser();
    if (user) {
      // Logged-in state: clicking toggles logout confirm
      const confirmLogout = confirm('Logout from ChickenNest?');
      if (confirmLogout) { logout(); refreshAuthUi(); }
      return;
    }
    openModal();
  });
  close?.addEventListener('click', closeModal);
  modal?.querySelector('.modal-backdrop')?.addEventListener('click', closeModal);

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const target = tab.getAttribute('data-tab');
      if (target === 'login') { loginForm.classList.remove('hidden'); signupForm.classList.add('hidden'); }
      else { signupForm.classList.remove('hidden'); loginForm.classList.add('hidden'); }
    });
  });

  loginForm?.addEventListener('submit', e => {
    e.preventDefault();
    const formData = new FormData(loginForm);
    try {
      login(formData.get('email'), formData.get('password'));
      closeModal();
      refreshAuthUi();
      alert('Welcome back!');
    } catch (err) {
      alert(err.message);
    }
  });

  signupForm?.addEventListener('submit', e => {
    e.preventDefault();
    const formData = new FormData(signupForm);
    try {
      signup(formData.get('name'), formData.get('email'), formData.get('password'));
      closeModal();
      refreshAuthUi();
      alert('Account created!');
    } catch (err) {
      alert(err.message);
    }
  });

  refreshAuthUi();
}

export function renderFeatured() {
  const container = document.getElementById('featuredRow');
  if (!container) return;
  const items = [...MENU_ITEMS].sort((a,b) => b.rating - a.rating).slice(0, 4);
  container.innerHTML = items.map(renderCard).join('');
  bindCardButtons(container);
}

function renderCard(item) {
  return `
    <article class="card reveal" data-id="${item.id}">
      <div class="card-media">
        <img src="${item.image}" alt="${item.name}" loading="lazy" />
        <span class="badge">${item.badge}</span>
      </div>
      <div class="card-body">
        <div class="card-title">${item.name}</div>
        <div class="card-meta">
          <span>⭐ ${item.rating}</span>
          <span>${item.spice}</span>
        </div>
        <div class="add-row">
          <span class="price">${formatCurrency(item.price)}</span>
          <button class="btn btn-primary add-btn">Add to Cart</button>
        </div>
      </div>
    </article>
  `;
}

function bindCardButtons(scope) {
  scope.querySelectorAll('.add-btn').forEach(btn => {
    btn.addEventListener('click', e => {
      const card = e.currentTarget.closest('.card');
      const id = card.getAttribute('data-id');
      addToCart(id, 1);
      updateCartBadge();
      // micro animation
      btn.classList.add('pulse');
      setTimeout(() => btn.classList.remove('pulse'), 250);
    });
  });
}

export function renderMenu() {
  const filterWrap = document.getElementById('menuFilters');
  const grid = document.getElementById('menuGrid');
  if (!filterWrap || !grid) return;

  filterWrap.innerHTML = CATEGORIES.map(cat => `<button class="filter-chip" data-cat="${cat}">${cat}</button>`).join('');
  const chips = filterWrap.querySelectorAll('.filter-chip');
  function applyFilter(active) {
    chips.forEach(c => c.classList.toggle('active', c.getAttribute('data-cat') === active));
    const list = active === 'All' ? MENU_ITEMS : MENU_ITEMS.filter(i => i.category === active);
    grid.innerHTML = list.map(renderCard).join('');
    bindCardButtons(grid);
    revealInView();
  }
  chips.forEach(c => c.addEventListener('click', () => applyFilter(c.getAttribute('data-cat'))));
  applyFilter('All');
}

export function renderCart() {
  const itemsWrap = document.getElementById('cartItems');
  const subtotalEl = document.getElementById('summarySubtotal');
  const totalEl = document.getElementById('summaryTotal');
  const clearBtn = document.getElementById('clearCartBtn');
  const checkoutBtn = document.getElementById('checkoutBtn');
  if (!itemsWrap) return;

  const cart = getCart();
  if (cart.length === 0) {
    itemsWrap.innerHTML = `<p class="muted">Your cart is empty. Explore our <a class="link" href="#menu">menu</a>.</p>`;
  } else {
    itemsWrap.innerHTML = cart.map(entry => {
      const item = MENU_ITEMS.find(m => m.id === entry.id);
      return `
        <div class="cart-item" data-id="${entry.id}">
          <img src="${item.image}" alt="${item.name}" />
          <div>
            <h4>${item.name}</h4>
            <div class="meta">${item.badge} • ⭐ ${item.rating}</div>
            <div class="qty">
              <button class="dec">-</button>
              <input class="q" type="number" min="1" value="${entry.qty}" />
              <button class="inc">+</button>
            </div>
          </div>
          <div>
            <div class="price">${formatCurrency(item.price * entry.qty)}</div>
            <button class="btn btn-ghost remove">Remove</button>
          </div>
        </div>
      `;
    }).join('');
  }

  itemsWrap.querySelectorAll('.cart-item').forEach(row => {
    const id = row.getAttribute('data-id');
    row.querySelector('.inc').addEventListener('click', () => {
      const q = row.querySelector('.q');
      const newQty = Number(q.value) + 1;
      q.value = String(newQty);
      updateQty(id, newQty);
      renderCart();
      updateCartBadge();
    });
    row.querySelector('.dec').addEventListener('click', () => {
      const q = row.querySelector('.q');
      const newQty = Math.max(1, Number(q.value) - 1);
      q.value = String(newQty);
      updateQty(id, newQty);
      renderCart();
      updateCartBadge();
    });
    row.querySelector('.q').addEventListener('change', (e) => {
      const val = Math.max(1, Number(e.currentTarget.value || 1));
      updateQty(id, val);
      renderCart();
      updateCartBadge();
    });
    row.querySelector('.remove').addEventListener('click', () => {
      removeFromCart(id);
      renderCart();
      updateCartBadge();
    });
  });

  const { subtotal, total } = calculateSummary(MENU_ITEMS);
  subtotalEl.textContent = formatCurrency(subtotal);
  totalEl.textContent = formatCurrency(total);

  clearBtn?.addEventListener('click', () => { clearCart(); renderCart(); updateCartBadge(); });
  checkoutBtn?.addEventListener('click', () => alert('This is a demo checkout. Thank you for trying ChickenNest!'));
}

export function updateCartBadge() {
  const badge = document.getElementById('cartCount');
  const cart = getCart();
  const count = cart.reduce((sum, it) => sum + it.qty, 0);
  badge.textContent = String(count);
}

export function revealInView() {
  const els = document.querySelectorAll('.reveal');
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); } });
  }, { threshold: 0.12 });
  els.forEach(el => obs.observe(el));
}

// Contact form handler (demo only)
export function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = new FormData(form);
    const name = data.get('name');
    alert(`Thanks, ${name}! We will get back to you shortly.`);
    form.reset();
  });
}

