const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const comparisonRoutes = require("./routes/comparisonRoutes");

const connectDB = require("./config/db");

const resumeRoutes = require("./routes/resumeroutes");
const aiRoutes = require("./routes/ai_routes");
const authRoutes = require("./routes/authroutes");
const interviewRoutes = require("./routes/interviewRoutes");

dotenv.config();

connectDB();

const app = express();

const allowedOrigins = [
  "http://localhost:5173",
  process.env.CLIENT_URL,
];

console.log("CLIENT_URL:", process.env.CLIENT_URL);
console.log("Allowed Origins:", allowedOrigins);

app.use(
  cors({
    origin: (origin, callback) => {
      console.log("Incoming Origin:", origin);

      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        console.log("Origin Allowed");
        return callback(null, true);
      }

      console.log("Origin Blocked:", origin);

      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  })
);
app.use(express.json());

app.use("/api/resume", resumeRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/comparison", comparisonRoutes);
app.use("/api/interview", interviewRoutes);

app.get("/", (req, res) => {
    res.send("AI Resume Analyzer Backend Running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});