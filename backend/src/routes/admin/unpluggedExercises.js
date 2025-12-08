import express from "express";
import exercisesController from "../../controllers/admin/exercisesController.js";

const router = express.Router();

// DESENCHUFADOS
router.get("/", exercisesController.getAllUnplugged);
router.get("/:id", exercisesController.getOneUnplugged);
router.post("/", exercisesController.createUnplugged);
router.put("/:id", exercisesController.updateUnplugged);
router.delete("/:id", exercisesController.removeUnplugged);

export default router;
