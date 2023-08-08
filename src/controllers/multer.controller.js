// multer.controller.js

const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: "./upload/images",
  filename: (req, file, cb) => {
    return cb(
      null,
      `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1000000000,
  },
});

const uploadProfileImage = (req, res) => {
  upload.single("profile")(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      return res.json({
        success: 0,
        message: err.message,
      });
    } else if (err) {
      return res.json({
        success: 0,
        message: "File upload failed",
      });
    }

    // File uploaded successfully
    return res.json({
      success: 1,
      profile_url: `http://localhost:5000/profile/${req.file.filename}`,
    });
  });
};

module.exports = { uploadProfileImage };
