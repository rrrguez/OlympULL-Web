import express from "express";
import itineraryController from "../../controllers/admin/itinerariesController.js";

const router = express.Router();

router.get("/", itineraryController.getAll);
router.get("/:id", itineraryController.getOne);
router.post("/", itineraryController.create);
router.put("/:id", itineraryController.update);
router.delete("/:id", itineraryController.remove);

export default router;
