const pool = require('../config/db');

// Central XP rulebook for the Animal Rescue module.
// Keeping amounts here (not scattered in controllers) makes tuning easy
// and matches the reward table from the module spec (e.g. camp volunteering
// tiers in the Medical module use the same pattern).
const XP_RULES = {
  report_submitted: 50,
  rescue_confirmed: 150,
  raise_hand_responded: 30,
  bowl_photo_upload: 20,
  lost_found_resolved: 40,
};

/**
 * Awards XP to a user, logs the transaction, and returns the new total.
 * Always call this from a controller AFTER the underlying action succeeds -
 * never trust an XP amount sent from the client.
 */
async function awardXP(client, { userId, reason, refTable = null, refId = null }) {
  const amount = XP_RULES[reason];
  if (!amount) {
    throw new Error(`Unknown XP reason: ${reason}`);
  }

  const db = client || pool;

  await db.query(
    `INSERT INTO xp_transactions (user_id, amount, reason, ref_table, ref_id)
     VALUES ($1, $2, $3, $4, $5)`,
    [userId, amount, reason, refTable, refId]
  );

  const { rows } = await db.query(
    `UPDATE users SET xp = xp + $1 WHERE id = $2 RETURNING xp`,
    [amount, userId]
  );

  return { amount, newTotal: rows[0].xp };
}

module.exports = { awardXP, XP_RULES };
