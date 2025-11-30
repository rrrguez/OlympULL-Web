// src/routes/olympiadsRoutes.js
import express from "express";
import olympController from "../../controllers/admin/olympiadsController.js";

const router = express.Router();

router.get("/", olympController.getAll);
router.get("/:id", olympController.getOne);
router.post("/", olympController.create);
router.put("/:id", olympController.update);
router.delete("/:id", olympController.remove);

export default router;
