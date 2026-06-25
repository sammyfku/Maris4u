// Minimal client-side API helpers
async function apiGet(path, token) {
  const headers = {};
  if (token) headers['Authorization'] = 'Bearer ' + token;
  const res = await fetch('/api' + path, { credentials: 'same-origin', headers });
  return res.json();
}

async function apiPost(path, body, token) {
  const headers = { 'Content-Type': 'application/json' };
  if (token) headers['Authorization'] = 'Bearer ' + token;
  const res = await fetch('/api' + path, {
    method: 'POST',
    headers,
    body: JSON.stringify(body)
  });
  return res.json();
}
