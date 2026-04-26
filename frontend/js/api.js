const API_URL = 'http://localhost:5000/api';

// ==================== Products ====================

async function fetchProducts(category = '', search = '', sort = '') {
  try {
    let url = `${API_URL}/products?`;
    if (category && category !== 'All') url += `category=${category}&`;
    if (search) url += `search=${search}&`;
    if (sort) url += `sort=${sort}&`;
    
    const res = await fetch(url);
    const data = await res.json();
    return data;
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
}

async function fetchProductById(id) {
  try {
    const res = await fetch(`${API_URL}/products/${id}`);
    const data = await res.json();
    return data;
  } catch (error) {
    console.error('Error fetching product:', error);
    return null;
  }
}

// ==================== Auth ====================

async function apiRegister(name, email, password, phone) {
  try {
    const res = await fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password, phone })
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message);
    return data;
  } catch (error) {
    throw error;
  }
}

async function apiLogin(email, password) {
  try {
    const res = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message);
    return data;
  } catch (error) {
    throw error;
  }
}

async function apiGetProfile() {
  try {
    const token = getToken();
    const res = await fetch(`${API_URL}/auth/profile`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    return await res.json();
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
}

// ==================== Orders ====================

async function apiCreateOrder(orderData) {
  try {
    const token = getToken();
    const res = await fetch(`${API_URL}/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(orderData)
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message);
    return data;
  } catch (error) {
    throw error;
  }
}

async function apiGetMyOrders() {
  try {
    const token = getToken();
    const res = await fetch(`${API_URL}/orders/my`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    return await res.json();
  } catch (error) {
    console.error('Error:', error);
    return [];
  }
}

// ==================== Token Helpers ====================

function saveUser(userData) {
  localStorage.setItem('user', JSON.stringify(userData));
  localStorage.setItem('token', userData.token);
}

function getToken() {
  return localStorage.getItem('token');
}

function getUser() {
  return JSON.parse(localStorage.getItem('user'));
}

function isLoggedIn() {
  return !!getToken();
}

function logoutUser() {
  localStorage.removeItem('user');
  localStorage.removeItem('token');
  window.location.href = 'login.html';
}