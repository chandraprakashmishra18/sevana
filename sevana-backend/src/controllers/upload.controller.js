const { uploadBufferToCloudinary } = require('../middleware/upload.middleware');

// POST /api/uploads  (multipart/form-data, field name "photo")
async function uploadPhoto(req, res) {
  if (!req.file) return res.status(400).json({ error: 'No file uploaded (field name must be "photo")' });

  const result = await uploadBufferToCloudinary(req.file.buffer);
  res.status(201).json({ url: result.secure_url, publicId: result.public_id });
}

module.exports = { uploadPhoto };
