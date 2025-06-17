const express = require("express");
const cors = require("cors");
const app = express();
const blogRoutes = require("./routes/blogRoutes");
const authRoutes = require("./routes/authRoutes");

const allowedOrigins = [
  "https://blog-frontend-xxfv.vercel.app/blogs",
  "http://localhost:3000",
];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
  allowedHeaders: "Origin,X-Requested-With,Content-Type,Accept,Authorization",
};

app.use((req, res, next) => {
  console.log("Origin:", req.headers.origin);
  console.log("Method:", req.method);
  next();
});

// ✅ Apply CORS for all requests
app.use(cors(corsOptions));

// ✅ Enable preflight for all routes
app.options("*", cors(corsOptions));

// ✅ Middleware
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

// ✅ Static file serving
app.use("/uploads", express.static("uploads"));

// ✅ API routes
app.use("/api/blogs", blogRoutes);
app.use("/api/auth", authRoutes);

module.exports = app;
