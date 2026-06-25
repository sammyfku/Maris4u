const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcryptjs');

function usersPath() { return path.join(__dirname, '..', 'data', 'users.json'); }
function loadUsers() { try { return JSON.parse(fs.readFileSync(usersPath(), 'utf8') || '[]'); } catch(e){return []} }
function saveUsers(users) { fs.writeFileSync(usersPath(), JSON.stringify(users, null, 2)); }

router.post('/register', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ error: 'Missing email or password' });
  const users = loadUsers();
  if (users.find(u => u.email === email)) return res.status(400).json({ error: 'Email taken' });
  const hash = await bcrypt.hash(password, 10);
  const user = { id: uuidv4(), email, passwordHash: hash, isAdmin: false };
  users.push(user);
  saveUsers(users);
  // simple token = user id (demo only)
  res.json({ token: user.id, email: user.email });
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const users = loadUsers();
  const user = users.find(u => u.email === email);
  if (!user) return res.status(400).json({ error: 'Invalid credentials' });
  const ok = await bcrypt.compare(password, user.passwordHash);
  if (!ok) return res.status(400).json({ error: 'Invalid credentials' });
  res.json({ token: user.id, email: user.email });
});

module.exports = router;
