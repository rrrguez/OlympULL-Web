import express from "express";
import controller from "../../controllers/monitor/controller.js";

const router = express.Router();

router.get("/exercises/:monitor", controller.getAllExercises);
router.get("/teams/:itinerary", controller.getAllTeams);
router.get("/rubric/:exercise", controller.getRubric);
router.get("/punctuations/:monitor", controller.getAllPunctuations);
router.get("/punctuations/:team/:exercise/:itinerary", controller.getPunctuation);
router.post("/", controller.punctuateTeam);
router.put("/:team/:exercise/:itinerary", controller.editPunctuation);
router.delete("/:team/:exercise/:itinerary", controller.removePunctuation);

export default router;
