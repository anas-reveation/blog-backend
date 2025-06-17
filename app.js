const express = require("express");
const cors = require("cors");
const app = express();
const blogRoutes = require("./routes/blogRoutes");
const authRoutes = require("./routes/authRoutes");

const allowedOrigins = [
  "https://blog-frontend-xxfv.vercel.app",
  "http://localhost:3000"
];

// ✅ CORS middleware
app.use(cors({
  origin: allowedOrigins,
  credentials: true,
}));

// ✅ Manually handle OPTIONS for all routes
app.options("*", cors({
  origin: allowedOrigins,
  credentials: true,
}));

// ✅ JSON middleware
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

// ✅ Static files
app.use("/uploads", express.static("uploads"));

// ✅ Routes
app.use("/api/blogs", blogRoutes);
app.use("/api/auth", authRoutes);

module.exports = app;
