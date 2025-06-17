const express = require("express");
const app = express();
const path = require("path");

const allowedOrigins = [
  "https://blog-frontend-xxfv.vercel.app",
  "http://localhost:3000"
];

app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.setHeader("Access-Control-Allow-Credentials", "true");

  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }

  next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve uploaded files
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes
const blogRoutes = require("./routes/blogRoutes");
const authRoutes = require("./routes/authRoutes");
app.use("/api/blogs", blogRoutes);
app.use("/api/auth", authRoutes);

module.exports = app;
