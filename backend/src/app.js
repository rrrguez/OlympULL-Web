import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

// Login
import authRoutes from "./routes/auth.js";

// App routes
import adminOlympiadsRoutes from "./routes/olympiads.js";
import adminItinerariesRoutes from "./routes/itineraries.js";
import adminPluggedInExercisesRoutes from "./routes/pluggedInExercises.js";
import adminUnpluggedExercisesRoutes from "./routes/unpluggedExercises.js";
import adminRubricsRoutes from "./routes/rubrics.js";
import adminSchoolsRoutes from "./routes/schools.js";
import adminTeamsRoutes from "./routes/teams.js";
import adminAssignationsRoutes from "./routes/assignations.js";
import adminUsersRoutes from "./routes/users.js";
import adminMonitorsRoutes from "./routes/monitors.js";
import adminOrganizersRoutes from "./routes/organizers.js";
import adminParticipantsRoutes from "./routes/participants.js"

import { authenticateToken } from "./middlewares/auth.js";
import { authorize } from "./middlewares/authorize.js";

const app = express();

app.use(express.json());
app.use(cors({ origin: "http://localhost:5173", credentials: true})); // Puerto React
app.use("/wordings", express.static("wordings"));

app.use("/api/auth", authRoutes);
app.use("/api/olympiads", authenticateToken, authorize("ADMIN"), adminOlympiadsRoutes);
app.use("/api/itineraries", authenticateToken, authorize("ADMIN"), adminItinerariesRoutes);
app.use("/api/plugged-in-exercises", authenticateToken, authorize("ADMIN"), adminPluggedInExercisesRoutes);
app.use("/api/unplugged-exercises", authenticateToken, authorize("ADMIN"), adminUnpluggedExercisesRoutes);
app.use("/api/rubrics", authenticateToken, authorize("ADMIN"), adminRubricsRoutes);
app.use("/api/schools", authenticateToken, authorize("ADMIN"), adminSchoolsRoutes);
app.use("/api/teams", authenticateToken, authorize("ADMIN"), adminTeamsRoutes);
app.use("/api/assignations", authenticateToken, authorize("ADMIN, ORGANIZER"), adminAssignationsRoutes);
app.use("/api/users", authenticateToken, authorize("ADMIN"), adminUsersRoutes);
app.use("/api/monitors", authenticateToken, authorize("ADMIN"), adminMonitorsRoutes);
app.use("/api/organizers", authenticateToken, authorize("ADMIN"), adminOrganizersRoutes);
app.use("/api/participants", authenticateToken, authorize("ADMIN"), adminParticipantsRoutes);

export default app;
