import { qs } from './utils.js';
import { getCart, updateQuantity, removeFromCart } from './storage.js';
import { formatCurrencyINR } from './utils.js';

const DELIVERY_FEE = 29;

function render(){
  const items = getCart();
  const empty = qs('#cart-empty');
  const wrap = qs('#cart-wrapper');
  const list = qs('#cart-items');
  const subEl = qs('#sum-subtotal');
  const delEl = qs('#sum-delivery');
  const totEl = qs('#sum-total');

  if(items.length === 0){
    empty?.classList.remove('hidden');
    wrap?.classList.add('hidden');
    return;
  }
  empty?.classList.add('hidden');
  wrap?.classList.remove('hidden');

  list.innerHTML = items.map(i => `
    <div class="cart-item" data-id="${i.id}">
      <div class="thumb" style="background-image:url('${i.img}')"></div>
      <div>
        <h3 class="item-title">${i.name}</h3>
        <div class="muted">${formatCurrencyINR(i.price)}</div>
        <div class="qty" style="margin-top:8px">
          <button data-dec>-</button>
          <span data-qty>${i.qty || 1}</span>
          <button data-inc>+</button>
        </div>
      </div>
      <div style="display:flex;flex-direction:column;align-items:flex-end;gap:8px">
        <strong>${formatCurrencyINR((i.qty || 1) * i.price)}</strong>
        <button class="btn btn-ghost" data-remove>Remove</button>
      </div>
    </div>
  `).join('');

  const subtotal = items.reduce((sum, i) => sum + (i.qty || 1) * i.price, 0);
  subEl.textContent = formatCurrencyINR(subtotal);
  delEl.textContent = formatCurrencyINR(DELIVERY_FEE);
  totEl.textContent = formatCurrencyINR(subtotal + DELIVERY_FEE);
}

function bind(){
  const list = qs('#cart-items');
  list?.addEventListener('click', (e) => {
    const itemEl = e.target.closest('.cart-item');
    if(!itemEl) return;
    const id = itemEl.getAttribute('data-id');

    if(e.target.matches('[data-inc]')){
      const qtyEl = itemEl.querySelector('[data-qty]');
      const next = Number(qtyEl.textContent) + 1;
      updateQuantity(id, next);
      render();
    }
    if(e.target.matches('[data-dec]')){
      const qtyEl = itemEl.querySelector('[data-qty]');
      const next = Math.max(1, Number(qtyEl.textContent) - 1);
      updateQuantity(id, next);
      render();
    }
    if(e.target.matches('[data-remove]')){
      removeFromCart(id);
      render();
    }
  });

  qs('#checkout-btn')?.addEventListener('click', () => {
    alert('Checkout is coming soon!');
  });

  window.addEventListener('cart:updated', render);
}

function init(){
  render();
  bind();
}

document.addEventListener('DOMContentLoaded', init);