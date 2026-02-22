import express from "express";
import monitorsController from "../../controllers/monitorsController.js";
import upload from "../../middlewares/uploadCsv.js";

const router = express.Router();

router.get("/", monitorsController.getAll);
router.get("/export", monitorsController.exportCsv);
router.get("/:id", monitorsController.getById);
router.post("/", monitorsController.create);
router.put("/:id", monitorsController.update);
router.delete("/:id/:exercise/:olympiad/:itinerary", monitorsController.remove);
router.post("/import", upload.single("file"), monitorsController.importCsv);

export default router;
