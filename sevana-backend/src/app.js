const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");

const authRoutes = require("./routes/auth.routes");
const reportRoutes = require("./routes/report.routes");
const vetRoutes = require("./routes/vet.routes");
const lostFoundRoutes = require("./routes/lost-found.routes");
const raiseHandRoutes = require("./routes/raise-hand.routes");
const uploadRoutes = require("./routes/upload.routes");
const userRoutes = require("./routes/user.routes");

const errorHandler = require("./middleware/error.middleware");
const { success, fail } = require("./shared/response");
const ngoRoutes = require('./routes/ngo.routes');
const donationRoutes = require("./routes/donation.routes");
const { apiRateLimiter, authRateLimiter } = require("./middleware/rate-limit.middleware");
const ApiError = require("./errors/api.error");
const app = express();

const allowedOrigins = (process.env.CORS_ORIGIN || "http://localhost:3000,http://localhost:5173")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

const corsOptions = {
  origin(origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) return callback(null, true);
    return callback(new ApiError({ statusCode: 403, message: "Origin not allowed by CORS." }));
  },
  methods: ["GET", "POST", "PATCH", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Authorization", "Content-Type"],
  credentials: true,
  maxAge: 86400,
};

/* ============================================================
   Global Middlewares
============================================================ */
app.use(helmet());
app.use(cors(corsOptions));
app.use(morgan("dev"));
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true, limit: "1mb" }));
app.use("/api", apiRateLimiter);

/* ============================================================
   Health Check
============================================================ */

app.get("/health", (req, res) => {
  return success(res, {
    message: "Service is healthy.",
    data: { status: "ok", module: "Sevana Backend" },
  });
});

/* ============================================================
   API Routes
============================================================ */

app.use("/api/v1/auth", authRateLimiter, authRoutes);
app.use("/api/v1/reports", reportRoutes);
app.use("/api/v1/vets", vetRoutes);
app.use("/api/v1/ngos", ngoRoutes);
app.use("/api/v1/donations", donationRoutes);
app.use("/api/v1/lost-found", lostFoundRoutes);
app.use("/api/v1/raise-hand", raiseHandRoutes);
app.use("/api/v1/uploads", uploadRoutes);
app.use("/api/v1/users", userRoutes);

/* ============================================================
   404 Route
============================================================ */

app.use((req, res) => {
  return fail(res, { statusCode: 404, message: "Route not found." });
});

/* ============================================================
   Global Error Handler (MUST BE LAST)
============================================================ */

app.use(errorHandler);

module.exports = app;
