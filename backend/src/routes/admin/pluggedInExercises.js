import express from "express";
import exercisesController from "../../controllers/admin/exercisesController.js";
import upload from "../../middlewares/uploadCsv.js";
import { uploadExerciseFiles } from "../../middlewares/uploadExerciseFiles.js";

const router = express.Router();

// ENCHUFADOS
router.get("/", exercisesController.getAllPluggedIn);
router.get("/export", exercisesController.exportPluggedInCsv);
router.get("/:id", exercisesController.getOnePluggedIn);
router.post("/", uploadExerciseFiles, exercisesController.createPluggedIn);
router.put("/:id", uploadExerciseFiles, exercisesController.updatePluggedIn);
router.delete("/:id", exercisesController.removePluggedIn);
router.post("/import", upload.single("file"), exercisesController.importPluggedInCsv);

export default router;
