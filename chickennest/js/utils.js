export const qs = (sel, el=document) => el.querySelector(sel);
export const qsa = (sel, el=document) => Array.from(el.querySelectorAll(sel));
export const on = (el, event, handler, opts) => el.addEventListener(event, handler, opts);
export const formatCurrencyINR = (amount) => new Intl.NumberFormat('en-IN', { style:'currency', currency:'INR', maximumFractionDigits:0 }).format(amount);
export const clamp = (value, min, max) => Math.max(min, Math.min(max, value));
export const debounce = (fn, wait=200) => {
  let t; return (...args) => { clearTimeout(t); t = setTimeout(() => fn(...args), wait); };
};