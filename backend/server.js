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

app.use(
  cors({
    origin: process.env.CLIENT_URL,
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