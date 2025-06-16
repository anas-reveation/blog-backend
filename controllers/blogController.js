const Blog = require("../models/Blog");

// ✅ Create Blog - Only Admin
const createBlog = async (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: "Access denied: Admins only" });
  }

  const { title, content, tags } = req.body;
  const coverImage = req.file.filename;

  const blog = await Blog.create({
    title,
    content,
    tags: tags.split(','),
    coverImage,
  });

  res.status(201).json(blog);
};

const getBlogs = async (req, res) => {
  const blogs = await Blog.find().sort({ createdAt: -1 });
  res.json(blogs);
};

const getBlog = async (req, res) => {
  const blog = await Blog.findById(req.params.id);
  res.json(blog);
};

// ✅ Update Blog - Only Admin
const updateBlog = async (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: "Access denied: Admins only" });
  }

  const updateData = { ...req.body };

  if (req.file) {
    updateData.coverImage = req.file.filename;
  }

  if (updateData.tags && typeof updateData.tags === 'string') {
    updateData.tags = updateData.tags.split(',');
  }

  const updated = await Blog.findByIdAndUpdate(req.params.id, updateData, { new: true });
  res.json(updated);
};

// ✅ Delete Blog - Only Admin
const deleteBlog = async (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: "Access denied: Admins only" });
  }

  await Blog.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
};

module.exports = {
  createBlog,
  getBlogs,
  getBlog,
  updateBlog,
  deleteBlog,
};
