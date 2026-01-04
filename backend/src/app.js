import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

// Login
import authRoutes from "./routes/auth.js";

// Admin routes
import adminOlympiadsRoutes from "./routes/admin/olympiads.js";
import adminItinerariesRoutes from "./routes/admin/itineraries.js";
import adminPluggedInExercisesRoutes from "./routes/admin/pluggedInExercises.js";
import adminUnpluggedExercisesRoutes from "./routes/admin/unpluggedExercises.js";
import adminRubricsRoutes from "./routes/admin/rubrics.js";
import adminAssignationsRoutes from "./routes/admin/assignations.js";
import adminUsersRoutes from "./routes/admin/users.js";

import { isAdmin, isOrganizer, authenticateToken } from "./middlewares/auth.js";

const app = express();

app.use(express.json());
app.use(cors({ origin: "http://localhost:5173", credentials: true})); // Puerto React

app.use("/api/auth", authRoutes);
app.use("/api/admin/olympiads", authenticateToken, isAdmin, adminOlympiadsRoutes);
app.use("/api/admin/itineraries", authenticateToken, isAdmin, adminItinerariesRoutes);
app.use("/api/admin/plugged-in-exercises", authenticateToken, isAdmin, adminPluggedInExercisesRoutes);
app.use("/api/admin/unplugged-exercises", authenticateToken, isAdmin, adminUnpluggedExercisesRoutes);
app.use("/api/admin/rubrics", authenticateToken, isAdmin, adminRubricsRoutes);
app.use("/api/admin/assignations", authenticateToken, isAdmin, adminAssignationsRoutes);
app.use("/api/admin/users", authenticateToken, isAdmin, adminUsersRoutes);

export default app;
