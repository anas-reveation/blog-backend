const express = require("express");
const cors = require("cors");
const app = express();
const blogRoutes = require("./routes/blogRoutes");
const authRoutes = require("./routes/authRoutes");

const allowedOrigins = [process.env.FRONTEND_URL_DEV];
app.use(cors({ origin: allowedOrigins }));
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

app.use("/uploads", express.static("uploads"));

app.use("/api/blogs", blogRoutes);
app.use("/api/auth", authRoutes);

module.exports = app;
