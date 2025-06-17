const express = require("express");
const cors = require("cors");
const app = express();

// CORS config
const allowedOrigins = [
  "https://blog-frontend-xxfv.vercel.app",
  "http://localhost:3000"
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("CORS not allowed for: " + origin));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));

// Explicitly handle preflight OPTIONS requests
app.options("*", cors());

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static image uploads
app.use("/uploads", express.static("uploads"));

// Routes
const blogRoutes = require("./routes/blogRoutes");
const authRoutes = require("./routes/authRoutes");
app.use("/api/blogs", blogRoutes);
app.use("/api/auth", authRoutes);

module.exports = app;
