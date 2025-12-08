// src/routes/olympiadsRoutes.js
import express from "express";
import rubricsController from "../../controllers/admin/rubricsController.js";

const router = express.Router();

router.get("/", rubricsController.getAll);
router.get("/:id", rubricsController.getOne);
router.post("/", rubricsController.create);
router.put("/:id", rubricsController.update);
router.delete("/:id", rubricsController.remove);

export default router;
