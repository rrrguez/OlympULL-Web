import express from "express";
import participantsController from "../../controllers/admin/participantsController.js";
import upload from "../../middlewares/uploadCsv.js";

const router = express.Router();

router.get("/", participantsController.getAll);
router.get("/export", participantsController.exportCsv);
router.get("/:id", participantsController.getById);
router.post("/", participantsController.create);
router.put("/:id", participantsController.update);
router.delete("/:id/:school/:itinerary", participantsController.remove);
router.post("/import", upload.single("file"), participantsController.importCsv);

export default router;
