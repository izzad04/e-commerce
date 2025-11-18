// login.js
const USER_KEY = 'sm_user_v1';

function doLogin() {
  const id = document.getElementById('loginId').value.trim();
  const pass = document.getElementById('loginPassword').value;

  const stored = JSON.parse(localStorage.getItem(USER_KEY) || 'null');

  const valid = stored
    ? (stored.id === id && stored.password === pass)
    : (id === 'student' && pass === 'password123'); // fallback

  if (!valid) {
    const errorBox = document.getElementById('loginError');
    errorBox.style.display = 'block';
    errorBox.textContent = 'Invalid ID or password';
    return;
  }

  sessionStorage.setItem('sm_logged_in', id);
  window.location.href = 'dashboard.html';
}
