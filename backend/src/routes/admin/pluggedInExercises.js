import express from "express";
import exercisesController from "../../controllers/admin/exercisesController.js";

const router = express.Router();

// ENCHUFADOS
router.get("/", exercisesController.getAllPluggedIn);
router.get("/:id", exercisesController.getOnePluggedIn);
router.post("/", exercisesController.createPluggedIn);
router.put("/:id", exercisesController.updatePluggedIn);
router.delete("/:id", exercisesController.removePluggedIn);

export default router;
