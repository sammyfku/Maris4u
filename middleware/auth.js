// Simple auth middleware that reads an Authorization: Bearer <userId> header for demo purposes.
// In a real app use JWTs or sessions.

const fs = require('fs');
const path = require('path');

function loadUsers() {
  const p = path.join(__dirname, '..', 'data', 'users.json');
  try {
    const raw = fs.readFileSync(p, 'utf8');
    return JSON.parse(raw || '[]');
  } catch (e) { return []; }
}

module.exports = function requireAuth(req, res, next) {
  const auth = req.get('Authorization') || '';
  const token = auth.startsWith('Bearer ') ? auth.slice(7) : null;
  if (!token) return res.status(401).json({ error: 'Missing token' });

  const users = loadUsers();
  const user = users.find(u => u.id === token);
  if (!user) return res.status(401).json({ error: 'Invalid token' });

  req.user = { id: user.id, email: user.email, isAdmin: !!user.isAdmin };
  next();
};
