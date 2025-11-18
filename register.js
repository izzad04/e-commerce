// register.js
const USER_KEY = 'sm_user_v1';

function doRegister() {
  const name = document.getElementById('regName').value.trim();
  const id = document.getElementById('regId').value.trim();
  const pass = document.getElementById('regPassword').value;

  localStorage.setItem(USER_KEY, JSON.stringify({
    name,
    id,
    password: pass
  }));

  sessionStorage.setItem('sm_logged_in', id);
  window.location.href = 'dashboard.html';
}
