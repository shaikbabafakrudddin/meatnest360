const USER_KEY = 'cn_user';
const USERS_KEY = 'cn_users';

function readUsers() {
  try {
    const raw = localStorage.getItem(USERS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function writeUsers(users) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

export function getCurrentUser() {
  try {
    const raw = localStorage.getItem(USER_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function login(email, password) {
  const users = readUsers();
  const found = users.find(u => u.email === email);
  if (!found) {
    throw new Error('User not found. Please signup first.');
  }
  if (found.password !== password) {
    throw new Error('Incorrect password.');
  }
  localStorage.setItem(USER_KEY, JSON.stringify({ name: found.name, email: found.email }));
  return { name: found.name, email: found.email };
}

export function signup(name, email, password) {
  const users = readUsers();
  if (users.some(u => u.email === email)) {
    throw new Error('Email already registered. Please login.');
  }
  const user = { name, email, password };
  users.push(user);
  writeUsers(users);
  localStorage.setItem(USER_KEY, JSON.stringify({ name, email }));
  return { name, email };
}

export function logout() {
  localStorage.removeItem(USER_KEY);
}

