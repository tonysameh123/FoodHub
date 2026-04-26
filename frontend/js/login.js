function switchTab(tab) {
    document.getElementById('login-tab').classList.toggle('active', tab === 'login');
    document.getElementById('register-tab').classList.toggle('active', tab === 'register');
    document.getElementById('login-form').style.display = tab === 'login' ? 'flex' : 'none';
    document.getElementById('register-form').style.display = tab === 'register' ? 'flex' : 'none';
  }
  
  // Login
  document.getElementById('login-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
  
    try {
      const data = await apiLogin(email, password);
      saveUser(data);
      showToast('✅ Logged in!');
      setTimeout(() => window.location.href = 'index.html', 500);
    } catch (error) {
      alert(error.message);
    }
  });
  
  // Register
  document.getElementById('register-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = document.getElementById('reg-name').value;
    const email = document.getElementById('reg-email').value;
    const phone = document.getElementById('reg-phone').value;
    const password = document.getElementById('reg-password').value;
    const confirm = document.getElementById('reg-confirm').value;
  
    if (password !== confirm) {
      alert("Passwords don't match!");
      return;
    }
  
    try {
      const data = await apiRegister(name, email, password, phone);
      saveUser(data);
      showToast('✅ Account created!');
      setTimeout(() => window.location.href = 'index.html', 500);
    } catch (error) {
      alert(error.message);
    }
  });