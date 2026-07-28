const { uploadBufferToCloudinary } = require('../middleware/upload.middleware');
const { created, fail } = require("../shared/response");

// POST /api/uploads  (multipart/form-data, field name "photo")
async function uploadPhoto(req, res) {
  if (!req.file) return fail(res, { statusCode: 400, message: "No file uploaded (field name must be \"photo\")." });

  const result = await uploadBufferToCloudinary(req.file.buffer);
  return created(res, {
    message: "Photo uploaded successfully.",
    data: { url: result.secure_url, publicId: result.public_id },
  });
}

module.exports = { uploadPhoto };
