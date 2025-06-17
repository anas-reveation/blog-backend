const express = require("express");
const cors = require("cors");
const app = express();
const blogRoutes = require("./routes/blogRoutes");
const authRoutes = require("./routes/authRoutes");

app.use(cors({
  origin: (origin, callback) => {
    const allowedOrigins = [
      "https://blog-frontend-xxfv.vercel.app",
      "http://localhost:3000"
    ];
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS: " + origin));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
}));

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

app.use("/uploads", express.static("uploads"));

app.use("/api/blogs", blogRoutes);
app.use("/api/auth", authRoutes);

module.exports = app;
