document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('login-form');
  const registerForm = document.getElementById('register-form');

  if (loginForm) loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    const r = await apiPost('/auth/login', { email, password });
    if (r.token) {
      localStorage.setItem('token', r.token);
      window.location = '/';
    } else alert(r.error || 'Login failed');
  });

  if (registerForm) registerForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    const r = await apiPost('/auth/register', { email, password });
    if (r.token) {
      localStorage.setItem('token', r.token);
      window.location = '/';
    } else alert(r.error || 'Register failed');
  });
});
