// register.js
const USER_KEY = 'sm_user_v1';

function doRegister() {
  const name = document.getElementById('regName').value.trim();
  const id = document.getElementById('regId').value.trim();
  const pass = document.getElementById('regPassword').value;

  // Save user using ID (not email)
  localStorage.setItem(USER_KEY, JSON.stringify({
    name: name,
    id: id,
    password: pass
  }));

  // Log user in immediately
  sessionStorage.setItem('sm_logged_in', id);

  window.location.href = 'dashboard.html';
}
