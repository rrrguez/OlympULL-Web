import express from "express";
import exercisesController from "../controllers/exercisesController.js";
import upload from "../middlewares/uploadCsv.js";
import { uploadWording } from "../middlewares/uploadWording.js";

const router = express.Router();

// ENCHUFADOS
router.get("/", exercisesController.getAllPluggedIn);
router.get("/export", exercisesController.exportPluggedInCsv);
router.get("/:id", exercisesController.getOnePluggedIn);
router.post("/", uploadWording.single("wording_file"), exercisesController.createPluggedIn);
router.put("/:id", uploadWording.single("wording_file"), exercisesController.updatePluggedIn);
router.delete("/:id", exercisesController.removePluggedIn);
router.post("/import", upload.single("file"), exercisesController.importPluggedInCsv);

export default router;
