// src/routes/olympiadsRoutes.js
import express from "express";
import { default as olympController, default as olympiadsController } from "../../controllers/olympiadsController.js";
import upload from "../../middlewares/uploadCsv.js";

const router = express.Router();

router.get("/", olympController.getAll);
router.get("/export", olympiadsController.exportCsv);
router.get("/:id", olympController.getOne);
router.post("/", olympController.create);
router.put("/:id", olympController.update);
router.delete("/:id", olympController.remove);
router.post("/import", upload.single("file"), olympiadsController.importCsv);

export default router;
