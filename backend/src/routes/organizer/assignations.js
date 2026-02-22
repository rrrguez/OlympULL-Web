import express from "express";
import exerciseAssignationsController from "../../controllers/organizer/exerciseAssignationsController.js";

const router = express.Router();

router.get("/:organizer", exerciseAssignationsController.getAllForOrganizer);
router.get("/itineraries/:organizer", exerciseAssignationsController.getItinerariesForOrganizer);
router.post("/", exerciseAssignationsController.create);
router.delete("/:exercise/:olympiad/:itinerary", exerciseAssignationsController.remove);

// router.get("/olympiads/:exercise", exerciseAssignationsController.getOlympiads);

export default router;
