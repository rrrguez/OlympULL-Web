import express from "express";
import exercisesController from "../../controllers/admin/exercisesController.js";

const router = express.Router();

// ENCHUFADOS
router.get("/", exercisesController.getAllPluggedIn);
router.get("/export", exercisesController.exportCsv);
router.get("/:id", exercisesController.getOnePluggedIn);
router.post("/", exercisesController.createPluggedIn);
router.put("/:id", exercisesController.updatePluggedIn);
router.delete("/:id", exercisesController.removePluggedIn);
router.post("/import", upload.single("file"), exercisesController.importCsv);

export default router;
