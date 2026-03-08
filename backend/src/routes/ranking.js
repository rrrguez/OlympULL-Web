import express from "express";
import { getPluggedInRanking } from "../controllers/rankingController.js";
import { getUnpluggedRanking } from "../controllers/rankingController.js";
import { checkExercises } from "../controllers/rankingController.js";
import { getAll as getOlympiads } from "../controllers/admin/olympiadsController.js";
import { getByOlympiad as getItineraries } from "../controllers/admin/itinerariesController.js";
import { retrieveDataFromCms } from "../controllers/cmsController.js";

const router = express.Router();

// ENCHUFADOS
router.get("/plugged-in/:itinerary", getPluggedInRanking);
router.get("/unplugged/:itinerary", getUnpluggedRanking);

router.get("/olympiads", getOlympiads);
router.get("/itineraries/:olympiadId", getItineraries);

router.get("/types/:itineraryId", checkExercises);

router.get("/retrieve-plugged-in/:itinerary", retrieveDataFromCms)

export default router;
