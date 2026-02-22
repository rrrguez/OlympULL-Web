import express from "express";
import exercisesController from "../../controllers/organizer/exercisesController.js";

const router = express.Router();

// DESENCHUFADOS
router.get("/unplugged", exercisesController.getAllUnplugged);

// ENCHUFADOS
router.get("/plugged-in", exercisesController.getAllPluggedIn);

export default router
