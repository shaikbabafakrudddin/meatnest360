// Dummy menu data
const menuData = [
  { id: 1, name: "Peri-Peri Chicken", price: 249, img: "https://images.unsplash.com/photo-1600891964156-46d1808f74ee?auto=format&fit=crop&w=400&q=60" },
  { id: 2, name: "Butter Chicken", price: 299, img: "https://images.unsplash.com/photo-1642806835094-8e3ac58fb4ae?auto=format&fit=crop&w=400&q=60" },
  { id: 3, name: "Spicy Wings (6 pcs)", price: 199, img: "https://images.unsplash.com/photo-1625948212453-eee39ad6f952?auto=format&fit=crop&w=400&q=60" },
  { id: 4, name: "Grilled Chicken Salad", price: 179, img: "https://images.unsplash.com/photo-1589308078056-f534d9b5c359?auto=format&fit=crop&w=400&q=60" },
  { id: 5, name: "Chicken Biryani", price: 259, img: "https://images.unsplash.com/photo-1622033307491-34be5cf1e0b3?auto=format&fit=crop&w=400&q=60" },
  { id: 6, name: "Crispy Chicken Burger", price: 189, img: "https://images.unsplash.com/photo-1614707267535-7b3e0f4cfa12?auto=format&fit=crop&w=400&q=60" }
];

const menuGrid = document.getElementById("menuGrid");
const cartBtn = document.getElementById("cartBtn");
const cartSidebar = document.getElementById("cartSidebar");
const closeCart = document.getElementById("closeCart");
const cartItemsContainer = document.getElementById("cartItems");
const cartTotal = document.getElementById("cartTotal");
const cartCount = document.getElementById("cartCount");

const loginBtn = document.getElementById("loginBtn");
const authModal = document.getElementById("authModal");
const closeAuth = document.getElementById("closeAuth");
const loginTab = document.getElementById("loginTab");
const signupTab = document.getElementById("signupTab");
const loginForm = document.getElementById("loginForm");
const signupForm = document.getElementById("signupForm");

const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("navLinks");

let cart = [];

/* ============= Helper Functions ============= */
function renderMenu() {
  menuGrid.innerHTML = menuData
    .map(
      (item) => `
      <div class="card">
        <img src="${item.img}" alt="${item.name}">
        <div class="card-body">
          <h3>${item.name}</h3>
          <p>₹${item.price}</p>
          <button class="btn-primary" onclick="addToCart(${item.id})">Add to Cart</button>
        </div>
      </div>`
    )
    .join("");
}

function addToCart(id) {
  const item = menuData.find((food) => food.id === id);
  cart.push(item);
  renderCart();
}

function removeFromCart(index) {
  cart.splice(index, 1);
  renderCart();
}

function renderCart() {
  cartItemsContainer.innerHTML = cart
    .map(
      (item, idx) => `
        <div class="cart-item">
          <span>${item.name}</span>
          <span>₹${item.price}</span>
          <button class="close-btn" onclick="removeFromCart(${idx})"><i class="fa-solid fa-trash"></i></button>
        </div>`
    )
    .join("");
  const total = cart.reduce((acc, val) => acc + val.price, 0);
  cartTotal.textContent = total;
  cartCount.textContent = cart.length;
}

/* ============= Event Listeners ============= */
// Mobile nav toggle
hamburger.addEventListener("click", () => {
  navLinks.classList.toggle("open");
});

// Cart sidebar
cartBtn.addEventListener("click", () => {
  cartSidebar.classList.add("open");
});

closeCart.addEventListener("click", () => {
  cartSidebar.classList.remove("open");
});

// Auth modal
loginBtn.addEventListener("click", () => {
  authModal.classList.add("show");
});

closeAuth.addEventListener("click", () => {
  authModal.classList.remove("show");
});

authModal.addEventListener("click", (e) => {
  if (e.target === authModal) authModal.classList.remove("show");
});

// Tabs switch
loginTab.addEventListener("click", () => {
  loginTab.classList.add("active");
  signupTab.classList.remove("active");
  loginForm.classList.add("active");
  signupForm.classList.remove("active");
});

signupTab.addEventListener("click", () => {
  signupTab.classList.add("active");
  loginTab.classList.remove("active");
  signupForm.classList.add("active");
  loginForm.classList.remove("active");
});

// Dummy auth submit
[loginForm, signupForm].forEach((form) => {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    alert("This is a demo. Authentication is not implemented.");
    authModal.classList.remove("show");
  });
});

// Year in footer
document.getElementById("year").textContent = new Date().getFullYear();

// Initial Render
renderMenu();