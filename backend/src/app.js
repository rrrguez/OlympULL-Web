import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

// Login
import authRoutes from "./routes/auth.js";

// Admin routes
import adminOlympiadsRoutes from "./routes/admin/olympiads.js";
import adminItinerariesRoutes from "./routes/admin/itineraries.js";
import adminExercisesRoutes from "./routes/admin/exercises.js";

import { isAdmin, isOrganizer } from "./middlewares/auth.js";

const app = express();

app.use(express.json());
app.use(cors({ origin: "http://localhost:5173" })); // Puerto React

app.use("/api/auth", authRoutes);
app.use("/api/admin/olympiads", isAdmin, adminOlympiadsRoutes);
app.use("/api/admin/itineraries", isAdmin, adminItinerariesRoutes);
app.use("/api/admin/exercises", isAdmin, adminExercisesRoutes);

export default app;
