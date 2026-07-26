const pool = require('../db/db');

// GET /api/v1/donations
async function listDonations(req, res) {
  const { rows } = await pool.query(
    `
    SELECT *
    FROM donations
    ORDER BY donated_at DESC
    `
  );

  res.json({
    donations: rows,
  });
}

// GET /api/v1/donations/:id
async function getDonation(req, res) {
  const { rows } = await pool.query(
    `
    SELECT *
    FROM donations
    WHERE id = $1
    `,
    [req.params.id]
  );

  if (!rows.length) {
    return res.status(404).json({
      error: 'Donation not found',
    });
  }

  res.json({
    donation: rows[0],
  });
}

// POST /api/v1/donations
async function createDonation(req, res) {
  const {
    donor_id,
    report_id,
    ngo_id,
    amount,
    currency,
    payment_method,
    payment_status,
    transaction_reference,
    purpose,
    notes,
  } = req.body;

  const { rows } = await pool.query(
    `
    INSERT INTO donations (
      donor_id,
      report_id,
      ngo_id,
      amount,
      currency,
      payment_method,
      payment_status,
      transaction_reference,
      purpose,
      notes
    )
    VALUES (
      $1,$2,$3,$4,$5,$6,$7,$8,$9,$10
    )
    RETURNING *
    `,
    [
      donor_id,
      report_id,
      ngo_id,
      amount,
      currency || 'INR',
      payment_method,
      payment_status || 'pending',
      transaction_reference,
      purpose,
      notes,
    ]
  );

  res.status(201).json({
    donation: rows[0],
  });
}

module.exports = {
  listDonations,
  getDonation,
  createDonation,
};