const { z } = require('zod');
const pool = require('../config/db');
const { awardXP } = require('../utils/xp');

const createPostSchema = z.object({
  post_type: z.enum(['lost', 'found']),
  animal_desc: z.string().max(500).optional(),
  photo_url: z.string().url().optional(),
  contact_info: z.string().max(160).optional(),
  lat: z.number().optional(),
  lng: z.number().optional(),
});

async function createPost(req, res) {
  const parsed = createPostSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: parsed.error.flatten() });
  const { post_type, animal_desc, photo_url, contact_info, lat, lng } = parsed.data;

  const { rows } = await pool.query(
    `INSERT INTO lost_found_posts (user_id, post_type, animal_desc, photo_url, contact_info, lat, lng)
     VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING *`,
    [req.user.id, post_type, animal_desc || null, photo_url || null, contact_info || null, lat || null, lng || null]
  );
  res.status(201).json({ post: rows[0] });
}

async function listPosts(req, res) {
  const { post_type, status } = req.query;
  const params = [];
  const conditions = [];

  if (post_type && ['lost', 'found'].includes(post_type)) {
    params.push(post_type);
    conditions.push(`post_type = $${params.length}`);
  }
  params.push(status || 'open');
  conditions.push(`status = $${params.length}`);

  const { rows } = await pool.query(
    `SELECT * FROM lost_found_posts WHERE ${conditions.join(' AND ')} ORDER BY created_at DESC LIMIT 100`,
    params
  );
  res.json({ posts: rows });
}

// PATCH /api/lost-found/:id/resolve
async function resolvePost(req, res) {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    const { rows } = await client.query(
      `UPDATE lost_found_posts SET status = 'resolved' WHERE id = $1 AND user_id = $2 RETURNING *`,
      [req.params.id, req.user.id]
    );
    if (!rows.length) {
      await client.query('ROLLBACK');
      return res.status(404).json({ error: 'Post not found or not yours' });
    }
    const xp = await awardXP(client, {
      userId: req.user.id,
      reason: 'lost_found_resolved',
      refTable: 'lost_found_posts',
      refId: req.params.id,
    });
    await client.query('COMMIT');
    res.json({ post: rows[0], xpAwarded: xp });
  } catch (err) {
    await client.query('ROLLBACK');
    throw err;
  } finally {
    client.release();
  }
}

module.exports = { createPost, listPosts, resolvePost };
