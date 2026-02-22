import express from "express";
import exerciseAssignationsController from "../../controllers/exerciseAssignationsController.js";
import upload from "../../middlewares/uploadCsv.js";

const router = express.Router();

router.get("/", exerciseAssignationsController.getAll);
router.get("/export", exerciseAssignationsController.exportCsv);
router.get("/olympiads/:exercise", exerciseAssignationsController.getOlympiads);
router.get("/itineraries/:exercise/:olympiad", exerciseAssignationsController.getItineraries);
router.post("/", exerciseAssignationsController.create);
router.delete("/:exercise/:olympiad/:itinerary", exerciseAssignationsController.remove);
router.post("/import", upload.single("file"), exerciseAssignationsController.importCsv);

export default router;
