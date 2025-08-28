import { qs } from './utils.js';
import { MENU_ITEMS } from './data.js';
import { addToCart } from './storage.js';
import { formatCurrencyINR } from './utils.js';

function renderFeatured(){
  const grid = qs('#featured-grid');
  if(!grid) return;
  const items = MENU_ITEMS.slice(0, 6);
  grid.innerHTML = items.map(item => `
    <article class="card">
      <div class="card-media" style="background-image:url('${item.img}')"></div>
      <div class="card-body">
        <h3 class="card-title">${item.name}</h3>
        <div class="card-meta"><span>${formatCurrencyINR(item.price)}</span><span>${item.tags.join(', ')}</span></div>
        <div class="card-actions">
          <button class="btn btn-primary" data-add="${item.id}">Add to Cart</button>
          <a class="btn btn-ghost" href="./menu.html">Details</a>
        </div>
      </div>
    </article>
  `).join('');

  grid.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-add]');
    if(!btn) return;
    const id = btn.getAttribute('data-add');
    const item = MENU_ITEMS.find(i => i.id === id);
    if(item) addToCart(item);
  });
}

function init(){
  renderFeatured();
}

document.addEventListener('DOMContentLoaded', init);