import express from "express";
import controller from "../../controllers/monitor/controller.js";

const router = express.Router();

router.get("/exercises/:monitor", controller.getAllExercises);
router.get("/teams/:itinerary", controller.getAllTeams);
router.get("/rubric/:exercise", controller.getRubric);
router.get("/punctuations/:monitor", controller.getAllPunctuations);

export default router;
