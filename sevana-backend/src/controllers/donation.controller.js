const pool = require('../db/db');
const { success, created, fail } = require("../shared/response");

// GET /api/v1/donations
async function listDonations(req, res) {
  const { rows } = await pool.query(
    `
    SELECT *
    FROM donations
    ORDER BY donated_at DESC
    `
  );

  return success(res, { message: "Donations fetched successfully.", data: rows });
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
    return fail(res, { statusCode: 404, message: "Donation not found." });
  }

  return success(res, { message: "Donation fetched successfully.", data: rows[0] });
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
      currency ?? 'INR',
      payment_method,
      payment_status ?? 'pending',
      transaction_reference,
      purpose,
      notes,
    ]
  );

  return created(res, { message: "Donation created successfully.", data: rows[0] });
}

module.exports = {
  listDonations,
  getDonation,
  createDonation,
};
