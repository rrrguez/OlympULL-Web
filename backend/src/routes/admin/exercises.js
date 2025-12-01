import express from "express";
import { unpluggedExercisesController, pluggedInExercisesController } from "../../controllers/admin/exercisesController.js";

const router = express.Router();

// DESENCHUFADOS
router.get("/", unpluggedExercisesController.getAll);
router.get("/:id", unpluggedExercisesController.getOne);
router.post("/", unpluggedExercisesController.create);
router.put("/:id", unpluggedExercisesController.update);
router.delete("/:id", unpluggedExercisesController.remove);

// ENCHUFADOS
router.get("/", pluggedInExercisesController.getAll);
router.get("/:id", pluggedInExercisesController.getOne);
router.post("/", pluggedInExercisesController.create);
router.put("/:id", pluggedInExercisesController.update);
router.delete("/:id", pluggedInExercisesController.remove);

export default router;
