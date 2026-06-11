import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import { connect } from "mongoose";
import connectDB from "./Utils/db.js";
import userRoute from "./Router/user.route.js";
import companyRoute from "./Router/company.route.js";
import jobRoute from "./Router/job.route.js";
import applicationRoute from "./Router/application.route.js";

dotenv.config({});

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const corsOptions = {
  origin: true,
  credentials: true,
};

app.use(cors(corsOptions));

const PORT = process.env.PORT || 3000;

app.use("/api/v1/user", userRoute);
app.use("/api/v1/company", companyRoute);
app.use("/api/v1/job", jobRoute);
app.use("/api/v1/application", applicationRoute);

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    project: "CareerConnect",
    message: "Backend API Running 🚀",
    frontend: "https://job-portal-rose-pi.vercel.app",
    version: "1.0.0",
  });
});

app.listen(PORT, () => {
  connectDB();
  console.log(`Server is running on port ${PORT}`);
});
