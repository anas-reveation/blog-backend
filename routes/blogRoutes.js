const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const {
  createBlog,
  getBlogs,
  getBlog,
  updateBlog,
  deleteBlog
} = require("../controllers/blogController");
const authMiddleware = require("../middlewares/authMiddleware");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 } // ✅ 5 MB max size
});

router.get("/", getBlogs);
router.get("/:id", getBlog);

router.post("/", authMiddleware, upload.single("coverImage"), createBlog);
router.put("/:id", authMiddleware, upload.single("coverImage"), updateBlog);
router.delete("/:id", authMiddleware, deleteBlog);

module.exports = router;
