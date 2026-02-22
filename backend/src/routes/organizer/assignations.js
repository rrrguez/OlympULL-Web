import express from "express";
import exerciseAssignationsController from "../../controllers/organizer/exerciseAssignationsController.js";

const router = express.Router();

router.get("/:organizer", exerciseAssignationsController.getAll);
router.get("/itineraries/:organizer", exerciseAssignationsController.getItineraries);
router.post("/", exerciseAssignationsController.create);
router.delete("/:exercise/:olympiad/:itinerary", exerciseAssignationsController.remove);

// router.get("/olympiads/:exercise", exerciseAssignationsController.getOlympiads);

export default router;
