// src/routes/olympiadsRoutes.js
import express from "express";
import rubricsController from "../../controllers/rubricsController.js";
import upload from "../../middlewares/uploadCsv.js";

const router = express.Router();

router.get("/", rubricsController.getAll);
router.get("/export", rubricsController.exportCsv);
router.get("/:id", rubricsController.getOne);
router.post("/", rubricsController.create);
router.put("/:id", rubricsController.update);
router.delete("/:id", rubricsController.remove);
router.post("/import", upload.single("file"), rubricsController.importCsv);

export default router;
