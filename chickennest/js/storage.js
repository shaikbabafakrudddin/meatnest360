const CART_KEY = 'cn_cart_v1';
const USER_KEY = 'cn_user_v1';

export function getCart(){
  try { return JSON.parse(localStorage.getItem(CART_KEY)) || []; } catch { return []; }
}
export function setCart(items){
  localStorage.setItem(CART_KEY, JSON.stringify(items));
  window.dispatchEvent(new CustomEvent('cart:updated'));
}
export function addToCart(item){
  const cart = getCart();
  const existing = cart.find(i => i.id === item.id);
  if(existing){ existing.qty = (existing.qty || 1) + 1; }
  else { cart.push({ ...item, qty: 1 }); }
  setCart(cart);
}
export function updateQuantity(id, qty){
  const cart = getCart().map(i => i.id === id ? { ...i, qty: Math.max(1, qty) } : i);
  setCart(cart);
}
export function removeFromCart(id){
  const cart = getCart().filter(i => i.id !== id);
  setCart(cart);
}
export function cartCount(){
  return getCart().reduce((sum, i) => sum + (i.qty || 1), 0);
}

export function getUser(){
  try { return JSON.parse(localStorage.getItem(USER_KEY)); } catch { return null; }
}
export function setUser(user){
  localStorage.setItem(USER_KEY, JSON.stringify(user));
  window.dispatchEvent(new CustomEvent('auth:changed'));
}
export function logout(){
  localStorage.removeItem(USER_KEY);
  window.dispatchEvent(new CustomEvent('auth:changed'));
}