import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
dotenv.config();

// Login
import authRoutes from "./routes/auth.js";

// App routes
import adminOlympiadsRoutes from "./routes/admin/olympiads.js";
import adminItinerariesRoutes from "./routes/admin/itineraries.js";
import adminPluggedInExercisesRoutes from "./routes/admin/pluggedInExercises.js";
import adminUnpluggedExercisesRoutes from "./routes/admin/unpluggedExercises.js";
import adminRubricsRoutes from "./routes/admin/rubrics.js";
import adminSchoolsRoutes from "./routes/admin/schools.js";
import adminTeamsRoutes from "./routes/admin/teams.js";
import adminAssignationsRoutes from "./routes/admin/assignations.js";
import adminUsersRoutes from "./routes/admin/users.js";
import adminMonitorsRoutes from "./routes/admin/monitors.js";
import adminOrganizersRoutes from "./routes/admin/organizers.js";
import adminParticipantsRoutes from "./routes/admin/participants.js"

import organizerAssignationsRoutes from "./routes/organizer/assignations.js"
import organizerExercisesRoutes from "./routes/organizer/exercises.js"

import monitorRoutes from "./routes/monitor/routes.js"

import { authenticateToken } from "./middlewares/auth.js";
import { authorize } from "./middlewares/authorize.js";

const app = express();

app.use(express.json());
app.use(cors({ origin: "http://localhost:5173", credentials: true})); // Puerto React
app.use("/uploads/wordings", express.static(path.join(process.cwd(), "uploads/wordings")));
app.use("/uploads/inputs", express.static(path.join(process.cwd(), "uploads/inputs")));
app.use("/uploads/outputs", express.static(path.join(process.cwd(), "uploads/outputs")));

app.use("/api/auth", authRoutes);
app.use("/api/admin/olympiads", authenticateToken, authorize("ADMIN"), adminOlympiadsRoutes);
app.use("/api/admin/itineraries", authenticateToken, authorize("ADMIN"), adminItinerariesRoutes);
app.use("/api/admin/plugged-in-exercises", authenticateToken, authorize("ADMIN"), adminPluggedInExercisesRoutes);
app.use("/api/admin/unplugged-exercises", authenticateToken, authorize("ADMIN"), adminUnpluggedExercisesRoutes);
app.use("/api/admin/rubrics", authenticateToken, authorize("ADMIN"), adminRubricsRoutes);
app.use("/api/admin/schools", authenticateToken, authorize("ADMIN"), adminSchoolsRoutes);
app.use("/api/admin/teams", authenticateToken, authorize("ADMIN"), adminTeamsRoutes);
app.use("/api/admin/assignations", authenticateToken, authorize("ADMIN"), adminAssignationsRoutes);
app.use("/api/admin/users", authenticateToken, authorize("ADMIN"), adminUsersRoutes);
app.use("/api/admin/monitors", authenticateToken, authorize("ADMIN"), adminMonitorsRoutes);
app.use("/api/admin/organizers", authenticateToken, authorize("ADMIN"), adminOrganizersRoutes);
app.use("/api/admin/participants", authenticateToken, authorize("ADMIN"), adminParticipantsRoutes);

app.use("/api/organizer/assignations", authenticateToken, authorize("ORGANIZER"), organizerAssignationsRoutes);
app.use("/api/organizer/exercises", authenticateToken, authorize("ORGANIZER"), organizerExercisesRoutes);

app.use("/api/monitor", authenticateToken, authorize("MONITOR"), monitorRoutes);

export default app;
