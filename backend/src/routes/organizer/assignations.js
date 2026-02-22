import express from "express";
import exerciseAssignationsController from "../../controllers/exerciseAssignationsController.js";

const router = express.Router();

router.get("/:organizer", exerciseAssignationsController.getAllForOrganizer);
router.post("/", exerciseAssignationsController.create);
router.delete("/:exercise/:olympiad/:itinerary", exerciseAssignationsController.remove);

// router.get("/olympiads/:exercise", exerciseAssignationsController.getOlympiads);
// router.get("/itineraries/:exercise/:olympiad", exerciseAssignationsController.getItineraries);

export default router;
