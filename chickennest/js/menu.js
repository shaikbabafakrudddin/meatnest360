import { qs, debounce } from './utils.js';
import { MENU_ITEMS } from './data.js';
import { addToCart } from './storage.js';
import { formatCurrencyINR } from './utils.js';

let state = { query:'', tag:'all' };

function filterItems(){
  const q = state.query.trim().toLowerCase();
  return MENU_ITEMS.filter(i => {
    const matchesQuery = !q || i.name.toLowerCase().includes(q);
    const matchesTag = state.tag === 'all' || i.tags.includes(state.tag);
    return matchesQuery && matchesTag;
  });
}

function renderGrid(){
  const grid = qs('#menu-grid');
  if(!grid) return;
  const items = filterItems();
  if(items.length === 0){
    grid.innerHTML = `<div class="empty">No dishes found. Try a different search.</div>`;
    return;
  }
  grid.innerHTML = items.map(item => `
    <article class="card">
      <div class="card-media" style="background-image:url('${item.img}')"></div>
      <div class="card-body">
        <h3 class="card-title">${item.name}</h3>
        <div class="card-meta"><span>${formatCurrencyINR(item.price)}</span><span>${item.tags.join(', ')}</span></div>
        <div class="card-actions">
          <button class="btn btn-primary" data-add="${item.id}">Add to Cart</button>
        </div>
      </div>
    </article>
  `).join('');
}

function bindControls(){
  const search = qs('#menu-search');
  const filter = qs('#menu-filter');
  if(search){ search.addEventListener('input', debounce(() => { state.query = search.value; renderGrid(); }, 200)); }
  if(filter){ filter.addEventListener('change', () => { state.tag = filter.value; renderGrid(); }); }
}

function bindAddToCart(){
  const grid = qs('#menu-grid');
  grid?.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-add]');
    if(!btn) return;
    const id = btn.getAttribute('data-add');
    const item = MENU_ITEMS.find(i => i.id === id);
    if(item) addToCart(item);
  });
}

function init(){
  bindControls();
  bindAddToCart();
  renderGrid();
}

document.addEventListener('DOMContentLoaded', init);