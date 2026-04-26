function updateAuthUI() {
    const authLink = document.getElementById('auth-link');
    if (!authLink) return;
  
    if (isLoggedIn()) {
      const user = getUser();
      authLink.innerHTML = `
        <span class="user-name">👤 ${user.name}</span>
        <a href="#" onclick="logoutUser()" class="logout-btn">Logout</a>
      `;
    } else {
      authLink.innerHTML = `<a href="login.html">Login</a>`;
    }
  }
  
  document.addEventListener('DOMContentLoaded', updateAuthUI);