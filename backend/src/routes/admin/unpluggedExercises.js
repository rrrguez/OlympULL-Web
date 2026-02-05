import express from "express";
import exercisesController from "../../controllers/admin/exercisesController.js";

const router = express.Router();

// DESENCHUFADOS
router.get("/", exercisesController.getAllUnplugged);
router.get("/export", exercisesController.exportCsv);
router.get("/:id", exercisesController.getOneUnplugged);
router.post("/", exercisesController.createUnplugged);
router.put("/:id", exercisesController.updateUnplugged);
router.delete("/:id", exercisesController.removeUnplugged);
router.post("/import", upload.single("file"), exercisesController.importCsv);

export default router;
