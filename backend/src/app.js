import express from "express";
import cors from "cors";

import olympiadsRoutes from "./routes/olympiads.js";
import itinerariesRoutes from "./routes/itineraries.js";
import exercisesRoutes from "./routes/exercises.js";

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/olympiads", olympiadsRoutes);
app.use("/api/itineraries", itinerariesRoutes);
app.use("/api/exercises", exercisesRoutes);

export default app;
