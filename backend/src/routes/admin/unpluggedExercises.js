import express from "express";
import exercisesController from "../../controllers/admin/exercisesController.js";
import upload from "../../middlewares/uploadCsv.js";

const router = express.Router();

// DESENCHUFADOS
router.get("/", exercisesController.getAllUnplugged);
router.get("/export", exercisesController.exportUnpluggedCsv);
router.get("/:id", exercisesController.getOneUnplugged);
router.post("/", exercisesController.createUnplugged);
router.post("/:id/duplicate", exercisesController.duplicateUnpluggedExercise);
router.put("/:id", exercisesController.updateUnplugged);
router.delete("/:id", exercisesController.removeUnplugged);
router.post("/import", upload.single("file"), exercisesController.importUnpluggedCsv);

export default router;
