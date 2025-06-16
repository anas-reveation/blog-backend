const express = require("express");
const cors = require("cors");
const app = express();
const blogRoutes = require("./routes/blogRoutes");
const authRoutes = require("./routes/authRoutes");

app.use(cors({
  origin: ["http://localhost:3000", ""], // include both dev & deployed frontend URLs
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

app.use("/uploads", express.static("uploads"));

app.use("/api/blogs", blogRoutes);
app.use("/api/auth", authRoutes);

module.exports = app;
