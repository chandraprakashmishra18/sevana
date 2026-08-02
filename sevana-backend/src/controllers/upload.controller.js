const {
  uploadBufferToCloudinary,
} = require("../middleware/upload.middleware");

const { created, fail } = require("../shared/response");

async function uploadPhoto(req, res) {
  try {
    if (!req.file) {
      return fail(res, {
        statusCode: 400,
        message: "No file uploaded.",
      });
    }

    console.log(req.file.originalname);
    console.log(req.file.mimetype);

    const result = await uploadBufferToCloudinary(req.file.buffer);

    console.log(result);

    return created(res, {
      message: "Uploaded",
      data: {
        url: result.secure_url,
        publicId: result.public_id,
      },
    });
  } catch (err) {
    console.error("UPLOAD ERROR:");
    console.error(err);

    return fail(res, {
      statusCode: 500,
      message: err.message,
    });
  }
}

module.exports = { uploadPhoto };
