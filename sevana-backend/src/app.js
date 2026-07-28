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
const app = express();

/* ============================================================
   Global Middlewares
============================================================ */
app.use(helmet());
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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

app.use("/api/v1/auth", authRoutes);
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
