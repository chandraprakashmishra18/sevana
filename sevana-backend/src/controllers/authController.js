const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { z } = require('zod');
const pool = require('../config/db');

const registerSchema = z.object({
  name: z.string().min(2).max(120),
  phone: z.string().min(8).max(20).optional(),
  email: z.string().email().optional(),
  password: z.string().min(6),
  area: z.string().optional(),
  lat: z.number().optional(),
  lng: z.number().optional(),
}).refine((d) => d.phone || d.email, {
  message: 'Either phone or email is required',
});

function signToken(user) {
  return jwt.sign({ sub: user.id, role: user.role }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
  });
}

async function register(req, res) {
  const parsed = registerSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: parsed.error.flatten() });
  }
  const { name, phone, email, password, area, lat, lng } = parsed.data;

  const existing = await pool.query(
    `SELECT id FROM users WHERE (phone = $1 AND $1 IS NOT NULL) OR (email = $2 AND $2 IS NOT NULL)`,
    [phone || null, email || null]
  );
  if (existing.rows.length) {
    return res.status(409).json({ error: 'Account already exists with this phone/email' });
  }

  const passwordHash = await bcrypt.hash(password, 10);

  const { rows } = await pool.query(
    `INSERT INTO users (name, phone, email, password_hash, area, lat, lng)
     VALUES ($1,$2,$3,$4,$5,$6,$7)
     RETURNING id, name, phone, email, area, xp, streak_days, role`,
    [name, phone || null, email || null, passwordHash, area || null, lat || null, lng || null]
  );

  const user = rows[0];
  res.status(201).json({ user, token: signToken(user) });
}

const loginSchema = z.object({
  identifier: z.string(), // phone or email
  password: z.string(),
});

async function login(req, res) {
  const parsed = loginSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: parsed.error.flatten() });
  }
  const { identifier, password } = parsed.data;

  const { rows } = await pool.query(
    `SELECT * FROM users WHERE phone = $1 OR email = $1`,
    [identifier]
  );
  const user = rows[0];
  if (!user) return res.status(401).json({ error: 'Invalid credentials' });

  const valid = await bcrypt.compare(password, user.password_hash);
  if (!valid) return res.status(401).json({ error: 'Invalid credentials' });

  delete user.password_hash;
  res.json({ user, token: signToken(user) });
}

async function me(req, res) {
  const { rows } = await pool.query(
    `SELECT id, name, phone, email, area, xp, streak_days, role, created_at
     FROM users WHERE id = $1`,
    [req.user.id]
  );
  if (!rows.length) return res.status(404).json({ error: 'User not found' });
  res.json({ user: rows[0] });
}

module.exports = { register, login, me };
