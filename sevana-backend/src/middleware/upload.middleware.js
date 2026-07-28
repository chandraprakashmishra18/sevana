const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const ApiError = require("../errors/api.error");
require('dotenv').config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Hold the file in memory, then stream it to Cloudinary - avoids
// writing temp files to disk on a small/free-tier server.
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 8 * 1024 * 1024 }, // 8MB cap
  fileFilter: (req, file, callback) => {
    const allowedTypes = new Set(["image/jpeg", "image/png", "image/webp"]);
    if (!allowedTypes.has(file.mimetype)) {
      return callback(new ApiError({
        statusCode: 400,
        message: "Only JPEG, PNG, and WebP images are allowed.",
      }));
    }
    return callback(null, true);
  },
});

function hasValidImageSignature(buffer) {
  const isJpeg = buffer.length >= 3
    && buffer[0] === 0xff && buffer[1] === 0xd8 && buffer[2] === 0xff;
  const isPng = buffer.length >= 8
    && buffer.subarray(0, 8).equals(Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]));
  const isWebp = buffer.length >= 12
    && buffer.subarray(0, 4).toString("ascii") === "RIFF"
    && buffer.subarray(8, 12).toString("ascii") === "WEBP";
  return isJpeg || isPng || isWebp;
}

function uploadBufferToCloudinary(buffer, folder = 'sevana/animal-reports') {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder },
      (error, result) => (error ? reject(error) : resolve(result))
    );
    stream.end(buffer);
  });
}

module.exports = { upload, uploadBufferToCloudinary, hasValidImageSignature };
