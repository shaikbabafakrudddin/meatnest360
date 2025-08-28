import { qs } from './utils.js';
import { setUser, getUser } from './storage.js';

function bindLogin(){
  const form = qs('#login-form');
  if(!form) return;
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = new FormData(form);
    const email = String(data.get('email')).trim();
    const password = String(data.get('password')).trim();
    if(!email || !password){ alert('Enter email and password'); return; }
    const existing = getUser();
    const name = existing?.name || email.split('@')[0];
    setUser({ email, name });
    location.href = './index.html';
  });
}

function bindSignup(){
  const form = qs('#signup-form');
  if(!form) return;
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = new FormData(form);
    const name = String(data.get('name')).trim();
    const email = String(data.get('email')).trim();
    const password = String(data.get('password')).trim();
    if(!name || !email || !password){ alert('Fill all fields'); return; }
    setUser({ name, email });
    location.href = './index.html';
  });
}

function init(){
  bindLogin();
  bindSignup();
}

document.addEventListener('DOMContentLoaded', init);