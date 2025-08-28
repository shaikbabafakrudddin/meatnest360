const CART_KEY = 'cn_cart_v1';

export function getCart() {
  try {
    const raw = localStorage.getItem(CART_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveCart(items) {
  localStorage.setItem(CART_KEY, JSON.stringify(items));
}

export function addToCart(itemId, quantity = 1) {
  const cart = getCart();
  const existing = cart.find(it => it.id === itemId);
  if (existing) {
    existing.qty += quantity;
  } else {
    cart.push({ id: itemId, qty: quantity });
  }
  saveCart(cart);
  return cart;
}

export function updateQty(itemId, quantity) {
  const cart = getCart();
  const idx = cart.findIndex(it => it.id === itemId);
  if (idx >= 0) {
    if (quantity <= 0) cart.splice(idx, 1);
    else cart[idx].qty = quantity;
  }
  saveCart(cart);
  return cart;
}

export function removeFromCart(itemId) {
  const cart = getCart().filter(it => it.id !== itemId);
  saveCart(cart);
  return cart;
}

export function clearCart() {
  saveCart([]);
}

export function calculateSummary(menuItems) {
  const cart = getCart();
  let subtotal = 0;
  for (const entry of cart) {
    const menu = menuItems.find(m => m.id === entry.id);
    if (menu) subtotal += menu.price * entry.qty;
  }
  const delivery = cart.length > 0 ? 30 : 0;
  const total = subtotal + delivery;
  return { subtotal, delivery, total };
}

